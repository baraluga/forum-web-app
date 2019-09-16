import { Request, Response } from 'firebase-functions';
// import * as firebase from 'firebase';
import { ResponseService } from '../response.service';
// import * as admin from 'firebase-admin';
// import { AES } from 'crypto-js';

export const REGISTRATION_ENDPOINT = '/register';
export const registrationHandler = (req: Request, resp: Response) => {
  const rsp = new ResponseService(resp);
  const newUserDetails = req.body as RegistrationRequest;
  // firebase.auth().createUserWithEmailAndPassword(newUserDetails.email)
  rsp.sendOK(newUserDetails);
}


/**
 * Expected body of the registration request
 */
interface RegistrationRequest {
  name: string;
  email: string;
  password: string;
}

export interface RegistrationResponse {
  id: string;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
}