import * as admin from 'firebase-admin';
import { combineLatest, from, of, throwError } from 'rxjs';
import { catchError, first, map, mergeMap, mergeMapTo, tap } from 'rxjs/operators';
import { today } from '../../utils';
import uuid = require('uuid');
import { TopicNotOwner, TopicNotFound } from './content.errors';

export const dbRef = (refPath: string) => admin.database().ref(refPath);

export const topicsRef = () => dbRef('/topics');

export const messagesRef = () => dbRef('/messages');

export const topicsVal$ = () => from(topicsRef().once('value')).pipe(
    first(),
    map(snapshot => (snapshot.val() as Topic[])),
);

export const messagesVal$ = () => from(messagesRef().once('value')).pipe(
    first(),
    map(snapshot => (snapshot.val() as Message[])),
)

export const topicsCreatedBy$ = (userId: string) => topicsVal$().pipe(
    map(topics => topics.filter(_topic => _topic.createdBy === userId)),
);

export const getTopic$ = (topicId: string) => topicsVal$().pipe(
    map(topics => topics.find(_topic => _topic.id === topicId)),
    catchError(_ => throwError(new TopicNotFound())),
);

export const getMessages$ = (topicId: string) => messagesVal$().pipe(
    map(messages => (messages || []).filter(message => message.topicId === topicId)),
);


export const addTopic$ = (topic: Topic) => topicsVal$().pipe(
    mergeMap(currentVal => topicsRef().set([...currentVal, topic])),
    mergeMapTo(of(topic)),
);

export const isTopicOwner$ = (userId: string, topicId: string) =>
    topicsCreatedBy$(userId).pipe(
        map(topics => topics.find(_topic => _topic.id === topicId)),
        tap(_ => !!_ ? '' : throwError(new TopicNotOwner()))
    );

export const createTopic$ = (
    userId: string, subject: string, description: string
) => addTopic$({
    createdAt: today(),
    updatedAt: today(),
    createdBy: userId,
    updatedBy: userId,
    id: uuid(),
    subject,
    description,
});

export const updateTopic$ = (userId: string, topic: {
    topicId: string, subject: string, description: string
}) => combineLatest([
    isTopicOwner$(userId, topic.topicId),
    topicsVal$(),
]).pipe(
    mergeMap(([existingTopic, currentTopics]) => topicsRef().set([
        ...currentTopics.filter(_topic => _topic.id !== topic.topicId),
        {
            ...existingTopic,
            subject: topic.subject,
            description: topic.description
        }
    ])),
)

