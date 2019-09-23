import * as express from 'express';

export abstract class BaseApplication {
    private _expressApp: express.Express;
    constructor() {
        this._expressApp = express();
        this.attachEndpoints();
    }
    toExpressApp = () => this._expressApp;

    abstract attachEndpoints(): void;
}
