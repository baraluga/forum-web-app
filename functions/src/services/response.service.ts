import { Response } from 'firebase-functions';
import { today } from '../utils';



export class ResponseService {
    private _response: Response;

    constructor(response: Response) {
        this._response = response;
    }

    sendError = (message = 'Something went wrong!', code = 500) =>
        this._response.status(code).json({
            respondedAt: today(),
            message: String(message)
        } as BaseResponse)

    sendOK = (payload?: {}, code = 200) =>
        this._response.status(code).json({
            ...payload,
            respondedAt: today()
        } as BaseResponse);
}

interface BaseResponse {
    respondedAt: string;
    message?: string;
}
