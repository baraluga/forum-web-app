import { Request, Response } from 'firebase-functions';
import { ResponseService } from '../response.service';
import * as admin from 'firebase-admin';

export const VALIDATE_ENDPOINT = '/validate';

export const validateTokenHandler = (req: Request, resp: Response) => {
  const rsp = new ResponseService(resp);
  admin
    .auth()
    .verifyIdToken(req.body.token)
    .catch(error => rsp.sendError(error))
    .then(_ => {
      rsp.sendOK({ message: 'Token is valid!' });
    })
    .catch(_ => rsp.sendError('Invalid token, mate!'));
};
