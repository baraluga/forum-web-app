// import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firebaseConfig } from './config';
import { loginHandler, LOGIN_ENDPOINT, registrationHandler, REGISTRATION_ENDPOINT, VALIDATE_ENDPOINT, validateTokenHandler } from './services/user';

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

// Instantiate user microservice
const userService = express();
userService.post(REGISTRATION_ENDPOINT, registrationHandler);
userService.post(LOGIN_ENDPOINT, loginHandler);
userService.post(VALIDATE_ENDPOINT, validateTokenHandler);
exports.user = functions.https.onRequest(userService);

const contentService = express();
exports.topic = functions.https.onRequest(contentService);

// Initialize firebase application;
// admin.initializeApp();
