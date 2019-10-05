import * as express from 'express';
import * as cors from 'cors';

export abstract class BaseApplication {
  private _expressApp: express.Express;
  constructor() {
    this._expressApp = express().use(cors({ origin: true }));
    this.attachEndpoints();
  }
  toExpressApp = () => this._expressApp;

  abstract attachEndpoints(): void;
}
