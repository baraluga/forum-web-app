import { Request, Response } from 'firebase-functions';

export const GET_MESSAGES_URL = '/:id/messages';

export const getMessagesHandler = (req: Request, res: Response) => {
    console.log('Hello');
}
