import * as admin from 'firebase-admin';
import { combineLatest, from, of, throwError } from 'rxjs';
import {
  catchError,
  first,
  map,
  mergeMap,
  mergeMapTo,
  tap,
} from 'rxjs/operators';
import { today } from '../../utils';
import { TopicNotFound, TopicNotOwner } from './content.errors';
import * as uuid from 'uuid';

export const dbRef = (refPath: string) => admin.database().ref(refPath);

export const topicsRef = () => dbRef('/topics');

export const messagesRef = () => dbRef('/messages');

export const topicsVal$ = () =>
  from(topicsRef().once('value')).pipe(
    first(),
    map(snapshot => (snapshot.val() as Topic[]) || []),
    map(topics => topics.filter(topic => !!!topic.deletedAt)),
  );

export const messagesVal$ = () =>
  from(messagesRef().once('value')).pipe(
    first(),
    map(snapshot => (snapshot.val() as Message[]) || []),
    map(messages => messages.filter(message => !!!message.deletedAt)),
  );

export const topicsCreatedBy$ = (userId: string) =>
  topicsVal$().pipe(
    map(topics => topics.filter(_topic => _topic.createdBy === userId)),
  );

export const getTopic$ = (topicId: string) =>
  topicsVal$().pipe(
    tap(_ => console.log('getting topic...')),
    map(topics => topics.find(_topic => _topic.id === topicId)),
    catchError(_ => throwError(new TopicNotFound())),
  );

export const addTopic$ = (topic: Topic) =>
  topicsVal$().pipe(
    mergeMap(currentVal => topicsRef().set([...(currentVal || []), topic])),
    mergeMapTo(of(topic)),
  );

export const isTopicOwner$ = (userId: string, topicId: string) =>
  topicsCreatedBy$(userId).pipe(
    map(topics => topics.find(_topic => _topic.id === topicId)),
    tap(_ => (!!_ ? '' : throwError(new TopicNotOwner()))),
  );

export const createTopic$ = (
  userId: string,
  subject: string,
  description: string,
) =>
  addTopic$({
    createdAt: today(),
    updatedAt: today(),
    createdBy: userId,
    updatedBy: userId,
    id: uuid(),
    subject,
    description,
  });

export const updateTopic$ = (
  userId: string,
  topic: {
    id: string;
    subject?: string;
    description?: string;
    deletedAt?: string;
  },
) =>
  combineLatest([getTopic$(topic.id), topicsVal$()]).pipe(
    mergeMap(([existingTopic, currentTopics]) =>
      topicsRef().set([
        ...currentTopics.filter(_topic => _topic.id !== topic.id),
        {
          ...existingTopic,
          ...topic,
          updatedBy: userId,
          updatedAt: today(),
        },
      ]),
    ),
  );

export const createMessage$ = (
  userId: string,
  topicId: string,
  message: string,
) => {
  const newMessage: Message = {
    createdAt: today(),
    updatedAt: today(),
    createdBy: userId,
    updatedBy: userId,
    id: uuid(),
    message,
    topicId,
  };
  return combineLatest([isTopicOwner$(userId, topicId), messagesVal$()]).pipe(
    mergeMap(([_o, currentMessages]) =>
      messagesRef().set([...(currentMessages || []), newMessage]),
    ),
    mergeMapTo(of(newMessage)),
  );
};

export const getMessages$ = (userId: string, topicId: string) =>
  combineLatest([isTopicOwner$(userId, topicId), messagesVal$()]).pipe(
    map(([_o, currentMessages]) =>
      currentMessages.filter(message => message.topicId === topicId),
    ),
  );

export const getTopics$ = (userId: string) =>
  topicsVal$().pipe(
    map(topics => topics.filter(topic => topic.createdBy === userId)),
  );

export const deleteTopic$ = (userId: string, topicId: string) =>
  updateTopic$(userId, { id: topicId, deletedAt: today() });
