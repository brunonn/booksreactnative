import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';
import config from './config';

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export {firebase};
