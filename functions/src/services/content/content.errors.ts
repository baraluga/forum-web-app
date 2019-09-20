abstract class BaseError {
    statusCode = 500;
    message = 'Something went horribly wrong!';
}

abstract class NotFoundError extends BaseError {
    statusCode = 404;
    message = `${this.getContentName()} not found!`

    abstract getContentName(): string;
}

abstract class UnauthorizedError extends BaseError {
    statusCode = 401;
    message = `User unauthorized to view/edit this ${this.getContentName()}`

    abstract getContentName(): string;
}

export class TopicNotFound extends NotFoundError {
    getContentName = () => 'Topic';
}

export class TopicNotOwner extends UnauthorizedError {
    getContentName = () => 'Topic';
}



