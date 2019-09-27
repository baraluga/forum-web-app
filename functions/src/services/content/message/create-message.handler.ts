import { Request, Response } from 'firebase-functions';

export const CREATE_MESSAGE_URL = '/:id/message';

export const createMessageHandler = (req: Request, res: Response) => {
    console.log('Hello');
}
