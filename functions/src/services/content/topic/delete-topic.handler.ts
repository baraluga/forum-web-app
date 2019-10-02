import { Request, Response } from 'firebase-functions';
import { mergeMap } from 'rxjs/operators';
import { allTruthy } from '../../../utils';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { deleteTopic$ } from '../content.service';

export const DELETE_TOPIC_URL = '/:id';

export const deleteTopicHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const id = req.params['id'] || '';
    const token = req.body['token'] || '';
    if (!allTruthy(id)) {
        responder.sendMissingParams('id');
    }
    userDetails$(token).pipe(
        mergeMap(userDetails => deleteTopic$(userDetails.uid, id)),
    ).subscribe(
        (_) => (responder.sendOK({ success: true })),
        (error) => (responder.sendError()),
    );
}
