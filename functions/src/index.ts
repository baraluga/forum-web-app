// import * as cors from 'cors';
import * as firebase from 'firebase';
import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { firebaseConfig } from './config';
import { ContentApplication, UserApplication, getTopicsHandler } from './services';

admin.initializeApp();
firebase.initializeApp(firebaseConfig);

// Instantiate user microservice
exports.user = functions.https.onRequest(new UserApplication().toExpressApp());

// Instantiate content microservice
exports.topic = functions.https.onRequest(new ContentApplication().toExpressApp());

exports.topics = functions.https.onRequest(getTopicsHandler);
