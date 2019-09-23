import { BaseApplication } from '../base/base.application';
import { CREATE_TOPIC_URL, createTopicHandler } from './topic/create-topic.handler';

export class ContentApplication extends BaseApplication {
    attachEndpoints() {
        this.toExpressApp().post(CREATE_TOPIC_URL, createTopicHandler);
    }
}
