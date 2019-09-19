// import * as cors from 'cors';
import * as express from 'express';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firebaseConfig } from './config';
import { UserApplication } from './services/user/user.application';

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

// Instantiate user microservice
exports.user = functions.https.onRequest(new UserApplication()._expressApp);

const contentService = express();
exports.topic = functions.https.onRequest(contentService);

// Initialize firebase application;
// admin.initializeApp();
