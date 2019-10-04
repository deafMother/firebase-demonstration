import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { createNote } from '../../actions/action';

class CreateNote extends React.Component {
  state = {
    title: '',
    description: ''
  };

  handlerSubmit = e => {
    e.preventDefault();
    this.props.createNote(this.state);
  };

  render() {
    if (!this.props.auth.uid) {
      // redirect to the home page if the user is not signed in
      return <Redirect to='/'></Redirect>;
    }
    return (
      <div>
        <h4>Add Note</h4>

        <form onSubmit={this.handlerSubmit}>
          <label htmlFor='title'>Tile:</label>
          <input
            value={this.state.title}
            type='text'
            id='title'
            placeholder='title...'
            required
            onChange={e => {
              this.setState({ title: e.target.value });
            }}
          ></input>
          <label htmlFor='desc'>Description:</label>
          <textarea
            value={this.state.description}
            id='desc'
            required
            placeholder='message...'
            onChange={e => {
              this.setState({
                description: e.target.value
              });
            }}
          ></textarea>
          <div>
            <button type='submit'>Add</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  { createNote }
)(CreateNote);
