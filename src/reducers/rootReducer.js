import { combineReducers } from 'redux';
// import the firebase reducers
import { firebaseReducer } from 'react-redux-firebase';
// import the custom reducers
import { loginErrorReducer } from './loginError';
// import firestore reducer
import { firestoreReducer } from 'redux-firestore';
// import popUpReducer
import { popUpReducer } from './popUpReducer';
// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  authError: loginErrorReducer,
  popUp: popUpReducer
});

export default rootReducer;
