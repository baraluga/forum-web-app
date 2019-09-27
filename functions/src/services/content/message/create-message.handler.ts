import { Request, Response } from 'firebase-functions';
import { mergeMap } from 'rxjs/operators';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { createMessage$ } from '../content.service';
import { allTruthy } from '../../../utils';

export const CREATE_MESSAGE_URL = '/:id/message';

export const createMessageHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const topicId = (req.params || {}).id;
    const { token, message } = req.body as CreateMessageRequest;
    if (!allTruthy(token, message)) {
        responder.sendMissingParams('token', 'message');
        return;
    }
    userDetails$(token).pipe(
        mergeMap(userDetails => createMessage$(userDetails.uid, topicId, message)),
    ).subscribe(
        (data) => responder.sendOK(data),
        (error) => responder.sendError(error),
    );
}
