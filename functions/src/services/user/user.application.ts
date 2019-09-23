import { BaseApplication } from '../base/base.application';
import { loginHandler, LOGIN_ENDPOINT } from './login.handler';
import { registrationHandler, REGISTRATION_ENDPOINT } from './registration.handler';
import { validateTokenHandler, VALIDATE_ENDPOINT } from './validate-token.handler';

export class UserApplication extends BaseApplication {
    attachEndpoints() {
        this.toExpressApp().post(REGISTRATION_ENDPOINT, registrationHandler);
        this.toExpressApp().post(LOGIN_ENDPOINT, loginHandler);
        this.toExpressApp().post(VALIDATE_ENDPOINT, validateTokenHandler);
    }
}
