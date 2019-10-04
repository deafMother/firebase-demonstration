import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { firebaseSignOut } from '../../../actions/action';
import './SignOut.css';

function SignOut(props) {
  return (
    <div className='navigation-items'>
      <Link className='mr-2' to='/newNote'>
        Add Note
      </Link>
      <div
        className='button'
        onClick={() => {
          props.firebaseSignOut();
        }}
      >
        SignOut
      </div>
    </div>
  );
}

export default connect(
  null,
  {
    firebaseSignOut
  }
)(SignOut);
