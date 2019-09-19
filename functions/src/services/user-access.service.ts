import * as admin from 'firebase-admin';
import { from, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const userDetails$ = (jwt: string): Observable<admin.auth.DecodedIdToken> =>
    from(admin.auth().verifyIdToken(jwt))

export const uuid$ = (jwt: string): Observable<string> =>
    userDetails$(jwt).pipe(
        map(user => user.uid),
    );
