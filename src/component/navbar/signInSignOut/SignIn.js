import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function SignIn(props) {
  return (
    <div>
      <Link to='/signin' className='mr-2 button'>
        SignIn
      </Link>
      <Link to='/signup' className='button'>
        SignUp
      </Link>
    </div>
  );
}

const mapStateToProps = state => {
  return {};
};

export default connect(mapStateToProps)(SignIn);
