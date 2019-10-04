import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { get } from 'lodash';
import { firestoreConnect } from 'react-redux-firebase';
import { Link } from 'react-router-dom';

import moment from 'moment';

import { removePost } from '../../../actions/action';

const NoteDetail = props => {
  // direct to the main page if hot logged in

  const { userPost, username, removePost } = props;
  const id = props.match.params.id;
  if (userPost) {
    return (
      <div>
        {' '}
        <h2>Welcome:{username}</h2>
        <div className='single-note'>
          <h4>{userPost.title}</h4>
          <p>{userPost.description}</p>
          <p className='text-grey'>
            {moment(userPost.createdAt.toDate()).calendar()}
          </p>
        </div>
        <button
          className='delete'
          onClick={() => {
            removePost(id);
          }}
        >
          Delete
        </button>
        <button className='block'>
          <Link to={`/editNote/${id}`}> Edit</Link>
        </button>
      </div>
    );
  } else {
    return <h2>Loading...</h2>;
  }
};

//.. firebase and firestore is available form their reducers
const mapStateToProps = (
  { firebase, firestore },
  getOwnProps
) => {
  if (firebase.auth.uid) {
    const uid = firebase.auth.uid;
    return {
      auth: firebase.auth,
      userPost: get(
        firestore.data,
        `userPosts.${uid}.posts.${getOwnProps.match.params.id}`
      ),
      username: firebase.profile.userName
    };
  } else {
    return {
      auth: firebase.auth
    };
  }
};

export default compose(
  connect(
    mapStateToProps,
    { removePost }
  ),
  //firestore listnere
  firestoreConnect(props => [
    `userPosts/${props.auth.uid}/posts/${props.match.params.id}` // hook this in the mapState...above so that i t will be available as props to the component
  ])
)(NoteDetail);
