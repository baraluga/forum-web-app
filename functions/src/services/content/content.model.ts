interface BaseContentRequest {
    token: string;
}

interface BaseContent {
    id: string;
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

interface CreateUpdateTopicRequest extends BaseContentRequest {
    subject: string;
    description: string;
}

interface Message {
    topicId: string;
    message: string;
}

interface Topic extends BaseContent {
    subject: string;
    description: string;
    deletedAt?: string;
}
