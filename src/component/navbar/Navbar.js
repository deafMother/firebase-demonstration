import React from 'react';
import SignIn from './signInSignOut/SignIn';
import SignOut from './signInSignOut/SignOut';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Navbar extends React.Component {
  render() {
    const {
      auth: { uid }
    } = this.props;
    return (
      <div className='navbar'>
        <div className='logo'>
          <Link to='/'>Logo</Link>
        </div>
        <div className='navbar-items'>
          {uid ? <SignOut /> : <SignIn />}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(mapStateToProps)(Navbar);
