// import * as admin from 'firebase-admin';
import * as firebase from 'firebase';
import { Request, Response } from 'firebase-functions';
import { from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ResponseService } from '../response.service';

export const LOGIN_ENDPOINT = '/login';

export const loginHandler = (req: Request, resp: Response) => {
    const rsp = new ResponseService(resp);
    const { email, password } = req.body as LoginRequest;

    from(firebase.auth().signInWithEmailAndPassword(email, password)).pipe(
        mergeMap((userDetails: any) => userDetails.user.getIdToken()),
        map(token => ({ token: token } as LoginResponse)),
        catchError(_ => of(false)),
    ).subscribe(data => !!data ? rsp.sendOK(data) : rsp.sendError());
}

interface LoginRequest {
    email: string,
    password: string
}

interface LoginResponse {
    token: string;
}