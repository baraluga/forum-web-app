import { Request, Response } from 'firebase-functions';
import { mergeMap } from 'rxjs/operators';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { createTopic$ } from '../content.service';

export const CREATE_TOPIC_URL = '/';

export const createTopicHandler = (req: Request, res: Response) => {
    const responder = new ResponseService(res);
    const { token, description, subject } = req.body as CreateUpdateTopicRequest;
    userDetails$(token).pipe(
        mergeMap(userDetails => createTopic$(userDetails.uid, subject, description)),
    ).subscribe(
        (createdTopic) => responder.sendOK(createdTopic),
        (error) => responder.sendError(error),
    )
}
