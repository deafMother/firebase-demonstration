import React, { Component } from 'react';
import { connect } from 'react-redux';
import { firebaseSignIn } from '../../actions/action';
import { Redirect } from 'react-router-dom';

export class SignInPage extends Component {
  state = {
    email: '',
    password: ''
  };

  // submit handler
  handlerSubmit = e => {
    e.preventDefault();
    this.props.firebaseSignIn(this.state);
  };

  render() {
    const {
      authError: { authError },
      auth
    } = this.props;
    console.log(authError);
    if (auth.uid) {
      return <Redirect to='/'></Redirect>;
    }
    return (
      <div>
        <h2 className='header-medium'>SIGNIN</h2>
        <div>
          <form
            onSubmit={this.handlerSubmit}
            className='form'
          >
            <label htmlFor='email'>E-Mail:</label>
            <input
              type='email'
              id='email'
              value={this.state.email}
              placeholder='Name'
              onChange={e =>
                this.setState({ email: e.target.value })
              }
              required
            ></input>

            <label htmlFor='password'>pasword:</label>
            <input
              type='password'
              id='password'
              value={this.state.password}
              placeholder='password'
              onChange={e =>
                this.setState({ password: e.target.value })
              }
              required
            ></input>
            <button type='submit'>Sign In</button>
          </form>

          {authError ? (
            <div className='error-deatl'>
              {authError.code}
            </div>
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { authError } = state;
  return {
    authError,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { firebaseSignIn }
)(SignInPage);
