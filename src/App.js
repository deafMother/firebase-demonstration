import React from 'react';
import { connect } from 'react-redux';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';
import Navbar from './component/navbar/Navbar';
import SignInPage from './component/pages/SignInPage';
import SignUpPage from './component/pages/SignUpPage';
import CreateNote from './component/pages/CreateNote';
import ShowNotes from './component/pages/dashboard/ShowNotes';
import NoteDetail from './component/pages/dashboard/NoteDetail';
import EditNote from './component/pages/EditNote';
import PopUP from './component/PopUp/PopUp';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />

        <Switch>
          <Route path='/' exact component={ShowNotes} />
          <Route
            path='/signin'
            exact
            component={SignInPage}
          />
          <Route
            path='/noteDetail/:id'
            exact
            component={NoteDetail}
          />
          <Route
            path='/signup'
            exact
            component={SignUpPage}
          />
          <Route
            path='/newNote'
            exact
            component={CreateNote}
          />
          <Route
            path='/editNote/:id'
            exact
            component={EditNote}
          />
        </Switch>
      </div>
      <PopUP />
    </BrowserRouter>
  );
}

const mapStateToProps = state => {
  //console.log(state);
  return {};
};

export default connect(mapStateToProps)(App);
