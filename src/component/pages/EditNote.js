import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';
import { get } from 'lodash';
import { updateNote } from '../../actions/action';

class EditNote extends React.Component {
  state = {
    title: '',
    description: ''
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.updateNote(
      this.props.match.params.id,
      this.state
    );
  };

  componentDidMount = () => {
    console.log(this.props.userPost);
    this.setState({
      ...this.props.userPost
    });
  };

  render() {
    return (
      <div>
        <h2>Edit Note</h2>
        <form onSubmit={this.handleSubmit}>
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
            <button type='submit'>Edit</button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, getOwnProps) => {
  const uid = state.firebase.auth.uid;
  return {
    auth: state.firebase.auth, // incase we want ot check if the user is logged in or not
    userPost: get(
      state.firestore.data,
      `userPosts.${uid}.posts.${getOwnProps.match.params.id}`
    )
  };
};

export default compose(
  connect(
    mapStateToProps,
    { updateNote }
  ),
  //firestore listnere
  firestoreConnect(props => [
    `userPosts/${props.auth.uid}/posts/${props.match.params.id}` // hook this in the mapState...above so that i t will be available as props to the component
  ])
)(EditNote);
