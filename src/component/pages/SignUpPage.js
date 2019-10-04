import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { firebaseSignUp } from '../../actions/action';

export class SignUpPage extends Component {
  state = {
    email: '',
    name: '',
    password: ''
  };

  // submit handler
  handlerSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    this.props.firebaseSignUp(this.state);
  };

  render() {
    const {
      authError: { authError },
      auth
    } = this.props;

    if (auth.uid) {
      return <Redirect to='/'></Redirect>;
    }

    return (
      <div>
        <h2 className='header-medium'>SIGUP</h2>
        <div>
          <form
            onSubmit={this.handlerSubmit}
            className='form'
          >
            <label htmlFor='userName'>User Name:</label>
            <input
              type='text'
              id='userName'
              value={this.state.name}
              placeholder='name'
              onChange={e =>
                this.setState({ name: e.target.value })
              }
              required
            ></input>

            <label htmlFor='email'>E-Mail:</label>
            <input
              type='email'
              id='email'
              value={this.state.email}
              placeholder='email'
              onChange={e =>
                this.setState({ email: e.target.value })
              }
              required
            ></input>

            <label htmlFor='password'>Password:</label>
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
  console.log(state);
  const { authError } = state;
  return {
    authError,
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { firebaseSignUp }
)(SignUpPage);
