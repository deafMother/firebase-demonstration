// remember to link the firebase and firestore objects into the middle ware in the index.js file

// actions creators for signing in signing up, creating new note

// firebase sign up
export const firebaseSignIn = credential => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  console.log(credential);
  const firebase = getFirebase();
  firebase
    .auth()
    .signInWithEmailAndPassword(
      credential.email,
      credential.password
    )
    .then(() => {
      dispatch({
        type: 'LOGIN_SUCCESS'
      });
    })
    .catch(err => {
      dispatch({
        type: 'LOGIN_ERROR',
        payload: err
      });
    });
};

// firebase signin
export const firebaseSignUp = credentials => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firebase = await getFirebase();
  const firestore = await getFirestore();

  // add new user to firebase
  firebase
    .auth()
    .createUserWithEmailAndPassword(
      credentials.email,
      credentials.password
    )
    .then(response => {
      // add the new user info to 'users' collection with the uid of the new user

      return firestore
        .collection('users')
        .doc(response.user.uid)
        .set({
          userName: credentials.name
        });
    })
    .then(() => {
      dispatch({
        type: 'SIGNUP_SUCCESS'
      });
    })
    .catch(err => {
      dispatch({
        type: 'SIGNUP_ERROR',
        payload: err
      });
    });
};
// firebase signout
export const firebaseSignOut = () => async (
  dispatch,
  getState,
  { getFirebase }
) => {
  const firebase = getFirebase();
  firebase
    .auth()
    .signOut()
    .then(() => {
      dispatch({
        type: 'SIGNOUT_SUCCESS'
      });
    }); // sign the user out
};

//make note, dispatch error or success still pending
export const createNote = note => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const firestore = getFirestore();
  const id = getState().firebase.auth.uid;
  note.username = getState().firebase.profile.userName;
  note.createdAt = new Date();
  // user-posts/collection->user-id/doc -> posts/collection-> indivialua post/doc

  firestore
    .collection('userPosts')
    .doc(id)
    .set({ dummy: 'dummytext' }) // we need to add the dummy filed other wise we get the empty document firebase bug
    .then(() => {
      return firestore
        .collection('userPosts')
        .doc(id)
        .collection('posts')
        .add({
          ...note
        });
    })
    .then(response => {
      console.log('new note added');
      dispatch(
        showPopUp(true, 'success', ' new note added')
      );
    })
    .catch(err => {
      console.log('error' + err);
      dispatch(
        showPopUp(
          true,
          'error',
          'unable to make note Try later'
        )
      );
    });

  setTimeout(() => {
    dispatch(showPopUp(false, 'error'));
  }, 3000);
};

// remove a particular post, // 'user-posts'/collection->user-id/doc -> 'posts'/collection-> indivialua post/doc

export const removePost = id => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  const uid = getState().firebase.auth.uid; // uid of the user, we can also use getFirebase( ) for this
  const firestore = getFirestore();
  console.log('remove post initiater...');

  // after removing post go back to the main page
  firestore
    .collection('userPosts')
    .doc(uid)
    .collection('posts')
    .doc(id)
    .delete()
    .then(() => {
      console.log('post deleted successfully');
      dispatch(
        showPopUp(
          true,
          'success',
          'note removed successfully'
        )
      );
    })
    .catch(err => {
      console.log('Unable to delete' + err);
      dispatch(
        showPopUp(
          true,
          'error',
          'unable to delete note, Try later'
        )
      );
    });
  // remove the popup
  setTimeout(() => {
    dispatch(showPopUp(false, 'error'));
  }, 3000);
};

const showPopUp = (show, type, msg = '') => {
  if (show && type === 'success') {
    return {
      type: 'SHOW_POPUP_SUCCESS',
      msg
    };
  } else if (show && type === 'error') {
    return {
      type: 'SHOW_POPUP_ERROR',
      msg
    };
  } else if (!show) {
    return {
      type: 'REMOVE_POPUP',
      msg
    };
  }
};

// update note
export const updateNote = (id, form) => async (
  dispatch,
  getState,
  { getFirebase, getFirestore }
) => {
  console.log(id);
  console.log(form);
  //const firebase = getFirebase();
  const firestore = getFirestore();
  //console.log(firebase);
  const uid = getState().firebase.auth.uid; // uid of the user, we can also use getFirebase( ) for this

  // using the update method to update a note

  firestore
    .collection('userPosts')
    .doc(uid)
    .collection('posts')
    .doc(id)
    .update({
      ...form
    })
    .then(() => {
      console.log('Note Successfully updated');
      dispatch(
        showPopUp(
          true,
          'success',
          'note edited successfully'
        )
      );
    })
    .catch(err => {
      console.log('error updating' + err);
      dispatch(
        showPopUp(
          true,
          'error',
          'unable to edit note, try later'
        )
      );
    });
  // remove the popup
  setTimeout(() => {
    dispatch(showPopUp(false, 'error'));
  }, 3000);
};
