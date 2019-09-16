import { Response } from 'firebase-functions';
import { today } from '../utils';



export class ResponseService {
    private _response: Response;

    constructor(response: Response) {
        this._response = response;
    }

    sendError = (message = 'Something went wrong!', code = 500) =>
        this._response.status(code).json({
            responded_at: today(),
            message: message
        } as BaseResponse)

    sendOK = (payload?: {}, code = 200) =>
        this._response.status(code).json(payload);
}

interface BaseResponse {
    responded_at: string;
    message?: string;
}