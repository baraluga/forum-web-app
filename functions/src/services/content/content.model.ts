interface BaseContentRequest {
    token: string;
}

interface BaseContent {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
    deletedAt?: string;
}

interface CreateUpdateTopicRequest extends BaseContentRequest {
    subject: string;
    description: string;
}

interface CreateMessageRequest extends BaseContentRequest {
    message: string;
}

interface Message extends BaseContent {
    topicId: string;
    message: string;
}

interface Topic extends BaseContent {
    subject: string;
    description: string;
    deletedAt?: string;
}
