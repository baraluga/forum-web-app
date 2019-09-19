import * as express from 'express';

export class BaseApplication {
    _expressApp: express.Express;
    constructor() {
        this._expressApp = express();
    }
}
