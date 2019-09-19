// import * as admin from 'firebase-admin';
import { MD5 } from 'crypto-js';
import * as firebase from 'firebase';
import { Request, Response } from 'firebase-functions';
import { from } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { ResponseService } from '../response.service';

export const LOGIN_ENDPOINT = '/login';

export const loginHandler = (req: Request, resp: Response) => {
    const rsp = new ResponseService(resp);
    const { email, password } = req.body as LoginRequest;
    const hashed = MD5(password).toString();
    console.log(hashed);
    from(firebase.auth().signInWithEmailAndPassword(email, hashed))
        .pipe(
            mergeMap((userDetails: any) => userDetails.user.getIdToken()),
            map(token => ({ token: token } as LoginResponse)),
        ).subscribe(
            (data) => rsp.sendOK(data),
            (error) => rsp.sendError(error)
        );
}

interface LoginRequest {
    email: string,
    password: string
}

interface LoginResponse {
    token: string;
}
