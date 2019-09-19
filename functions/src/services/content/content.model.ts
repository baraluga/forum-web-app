interface BaseContentRequest {
    token: string;
}

interface BaseContentResponse {
    createdBy: string;
    updatedBy: string;
    createdAt: string;
    updatedAt: string;
}

interface CreateUpdateTopicRequest extends BaseContentRequest {
    subject: string;
    description: string;
}

interface CreateUpdateTopicResponse extends BaseContentResponse {
    id: string;
    subject: string;
    description: string;
}

interface DeleteTopicResponse {
    success: boolean;
}
