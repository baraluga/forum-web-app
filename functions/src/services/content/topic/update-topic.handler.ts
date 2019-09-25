import { Request, Response } from 'firebase-functions';
import { mergeMap } from 'rxjs/operators';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { updateTopic$ } from '../content.service';
import { allTruthy } from '../../../utils';


export const UPDATE_TOPIC_URL = '/:id';


export const updateTopicHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const topicId = req.params['id'] || '';
    const { token, subject, description } = req.body || {};
    if (!allTruthy(token, subject, description)) {
        responder.sendMissingParams('token', 'description', 'subject');
        return;
    }
    userDetails$(token).pipe(
        mergeMap(details => updateTopic$(details.uid, {
            topicId, subject, description
        })),
    ).subscribe(
        (data) => responder.sendOK(data),
        (error) => responder.sendError(error),
    )
}
