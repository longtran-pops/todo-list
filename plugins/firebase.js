
import firebase from 'firebase';
import config from '../config/firebase-config'
import 'firebase/firestore'
const app = firebase.apps.length === 0 ?  firebase.initializeApp(config.firebase) : firebase.apps[0];

export const db = firebase.firestore();
