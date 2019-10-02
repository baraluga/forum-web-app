import { BaseApplication } from '../base/base.application';
import {
    createMessageHandler, CREATE_MESSAGE_URL, getMessagesHandler,
    GET_MESSAGES_URL
} from './message';
import { createTopicHandler, CREATE_TOPIC_URL } from './topic/create-topic.handler';
import { deleteTopicHandler, DELETE_TOPIC_URL } from './topic/delete-topic.handler';
import { updateTopicHandler, UPDATE_TOPIC_URL } from './topic/update-topic.handler';

export class ContentApplication extends BaseApplication {
    attachEndpoints() {
        this.toExpressApp().post(CREATE_TOPIC_URL, createTopicHandler);
        this.toExpressApp().patch(UPDATE_TOPIC_URL, updateTopicHandler);
        this.toExpressApp().delete(DELETE_TOPIC_URL, deleteTopicHandler);
        this.toExpressApp().post(CREATE_MESSAGE_URL, createMessageHandler);
        this.toExpressApp().get(GET_MESSAGES_URL, getMessagesHandler);
    }
}
