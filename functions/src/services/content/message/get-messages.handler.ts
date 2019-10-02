import { Request, Response } from 'firebase-functions';
import { map, mergeMap } from 'rxjs/operators';
import { allTruthy } from '../../../utils';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { getMessages$ } from '../content.service';

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
        map(messages => ({ data: messages })),
    ).subscribe(
        (data) => (responder.sendOK(data)),
        (error) => (responder.sendError(error)),
    )
}
