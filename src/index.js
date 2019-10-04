import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import thunk from 'redux-thunk';
import {
  createStore,
  applyMiddleware,
  compose
} from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './reducers/rootReducer';

// import firebase features

// impoort the config file required to link to a particular firebase app
import firebase from '../src/config/firebaseConfig';
import {
  getFirebase,
  ReactReduxFirebaseProvider
} from 'react-redux-firebase';

// Firestore
import {
  createFirestoreInstance,
  getFirestore,
  reduxFirestore
} from 'redux-firestore';

// react-redux-firebase config, we are not using this right now but set it up anyway
const rrfConfig = {
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB

  userProfile: 'users'
  // enableClaims: true // Get custom claims along with the profile
};

const initialState = {};
firebase.firestore();

// create the store and link the middleware with firebase so that it is availavble in the Action Creator
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(
      thunk.withExtraArgument({ getFirebase, getFirestore })
    ),
    reduxFirestore(firebase) // redux bindings for firestore
  )
);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance // <- needed if using firestore
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...rrfProps}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root')
);
