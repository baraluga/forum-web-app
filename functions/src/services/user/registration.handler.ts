// import * as admin from 'firebase-admin';
import { MD5 } from 'crypto-js';
import * as firebase from 'firebase';
import { Request, Response } from 'firebase-functions';
import { from } from 'rxjs';
import { delay, map, tap } from 'rxjs/operators';
import { today } from '../../utils';
import { ResponseService } from '../response.service';

export const REGISTRATION_ENDPOINT = '/register';
export const registrationHandler = (req: Request, resp: Response) => {
  const rsp = new ResponseService(resp);
  const now = today();
  const { name, email, password } = req.body as RegistrationRequest;
  const hashed = MD5(password).toString();
  from(firebase.auth().createUserWithEmailAndPassword(email, hashed))
    .pipe(
      map(userCredential => userCredential.user as firebase.User),
      tap(newUser => newUser.updateProfile({ displayName: name })),
      delay(1000),
    ).subscribe(
      (user) => rsp.sendOK({
        created_at: now,
        updated_at: now,
        id: user.uid,
        email: user.email,
        name: user.displayName,
      } as RegistrationResponse),
      (error) => rsp.sendError(String(error)),
    )
}


/**
 * Expected body of the registration request
 */
interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}
