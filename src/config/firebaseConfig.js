import firebase from 'firebase/app'; // import the core functionality from firebase
import 'firebase/firestore'; // the database
import 'firebase/auth';

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyAXkeq9JDvHAbRSLbyE7Qfo5HA9BBH7xmU',
  authDomain: 'fir-demo-85feb.firebaseapp.com',
  databaseURL: 'https://fir-demo-85feb.firebaseio.com',
  projectId: 'fir-demo-85feb',
  storageBucket: '',
  messagingSenderId: '1065692893260',
  appId: '1:1065692893260:web:7a1a3e97ecf345be3ba4e9',
  measurementId: 'G-T2WW8WWHTK'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export default firebase;
