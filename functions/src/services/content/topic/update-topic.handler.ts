import { Request, Response } from 'firebase-functions';
import { mergeMap } from 'rxjs/operators';
import { allTruthy } from '../../../utils';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { getTopic$, updateTopic$ } from '../content.service';


export const UPDATE_TOPIC_URL = '/:id';


export const updateTopicHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const topicId = req.params['id'] || '';
    const { token, subject, description } = req.body || {};
    if (!allTruthy(token)) {
        responder.sendMissingParams('token');
        return;
    }
    userDetails$(token).pipe(
        mergeMap(details => updateTopic$(details.uid, {
            id: topicId, subject, description
        })),
        mergeMap(_ => getTopic$(topicId)),
    ).subscribe(
        (data) => responder.sendOK(data),
        (error) => responder.sendError(error),
    )
}
