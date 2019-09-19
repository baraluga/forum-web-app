import { BaseApplication } from '../base/base.application';
import { loginHandler, LOGIN_ENDPOINT } from './login.handler';
import { registrationHandler, REGISTRATION_ENDPOINT } from './registration.handler';
import { validateTokenHandler, VALIDATE_ENDPOINT } from './validate-token.handler';

export class UserApplication extends BaseApplication {
    constructor() {
        super();
        this._expressApp.post(REGISTRATION_ENDPOINT, registrationHandler);
        this._expressApp.post(LOGIN_ENDPOINT, loginHandler);
        this._expressApp.post(VALIDATE_ENDPOINT, validateTokenHandler);
    }
}
