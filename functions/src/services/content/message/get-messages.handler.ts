import { Request, Response } from 'firebase-functions';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { mergeMap } from 'rxjs/operators';
import { getMessages$ } from '../content.service';
import { allTruthy } from '../../../utils';

export const GET_MESSAGES_URL = '/:id/messages';

export const getMessagesHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const { token } = req.body as BaseContentRequest;
    const topicId = req.params['id'] || '';
    if (!allTruthy(token)) {
        responder.sendMissingParams('token');
        return;
    }

    userDetails$(token).pipe(
        mergeMap(userDetails => getMessages$(userDetails.uid, topicId)),
    ).subscribe(
        (data) => (responder.sendOK(data)),
        (error) => (responder.sendError(error)),
    )
}
