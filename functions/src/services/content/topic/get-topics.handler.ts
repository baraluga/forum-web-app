import * as cors from 'cors';
import { Request, Response } from 'firebase-functions';
import { map, mergeMap } from 'rxjs/operators';
import { allTruthy } from '../../../utils';
import { ResponseService } from '../../response.service';
import { userDetails$ } from '../../user-access.service';
import { getTopics$ } from '../content.service';

const _cors = cors({ origin: true });

export const getTopicsHandler = (req: Request, res: Response) =>
  _cors(req, res, () => {
    const responder = new ResponseService(res);
    const token = req.header('token') || '';
    if (!allTruthy(token)) {
      responder.sendMissingParams('token');
      return;
    }

    userDetails$(token)
      .pipe(
        mergeMap(userDetails => getTopics$(userDetails.uid)),
        map(topics => ({ data: topics })),
      )
      .subscribe(
        data => responder.sendOK(data),
        error => responder.sendError(error),
      );
  });
