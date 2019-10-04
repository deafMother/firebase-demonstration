import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { get } from 'lodash';

import NoteSummary from './NoteSummary';

const ShowNotes = props => {
  //console.log(props.userPosts);
  if (props.auth.uid) {
    return (
      <div>
        <h2 className='heading-light'>
          Notes By:{' '}
          <span className='user-name'>
            {props.username}
          </span>{' '}
        </h2>
        {props.userPosts
          ? Object.values(props.userPosts).map(
              (note, index) => {
                if (note) {
                  // we nedd to check this for when the note is being deleted
                  return (
                    <NoteSummary
                      key={index}
                      note={note}
                      id={
                        Object.keys(props.userPosts)[index]
                      } // get the key value
                    />
                  );
                } else {
                  return null;
                }
              }
            )
          : null}
      </div>
    );
  }
  return <h3>Sign In/Sign Up</h3>;
};

const mapStateToProps = ({
  firebase,
  firestore,
  popUp
}) => {
  if (firebase.profile.isLoaded) {
    const id = firebase.auth.uid;
    return {
      auth: firebase.auth,
      userPosts: get(
        firestore.data,
        `userPosts.${id}.posts`
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
  connect(mapStateToProps),
  firestoreConnect(props => [
    `userPosts/${props.auth.uid}/posts` // hook this in the mapState...above so that i t will be available as props to the component
  ])
)(ShowNotes);
