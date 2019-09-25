import { BaseApplication } from '../base/base.application';
import { CREATE_TOPIC_URL, createTopicHandler } from './topic/create-topic.handler';
import { UPDATE_TOPIC_URL, updateTopicHandler } from './topic/update-topic.handler';

export class ContentApplication extends BaseApplication {
    attachEndpoints() {
        this.toExpressApp().post(CREATE_TOPIC_URL, createTopicHandler);
        this.toExpressApp().patch(UPDATE_TOPIC_URL, updateTopicHandler);
    }
}
