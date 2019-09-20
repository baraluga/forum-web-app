import { Request, Response } from 'firebase-functions';
import { today } from '../../utils';
import { ResponseService } from '../response.service';
import { userDetails$ } from '../user-access.service';

export const createTopicHandler = (req: Request, res: Response) => {
    const now = today();
    const responder = new ResponseService(res);
    const { token, description, subject } = req.body as CreateUpdateTopicRequest;
    userDetails$(token).pipe(
        // TODO: Persist to the RTDB; if that's successful, continue on
    ).subscribe(
        (_) => responder.sendOK({
            createdAt: now,
            updatedAt: now,
        } as Topic),
        (error) => responder.sendError(error),
    )
}
