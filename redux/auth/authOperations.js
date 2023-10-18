import auth from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { authSlice } from "./authReducer";

const { updateUserProfile, authSingOut, authStateChange } = authSlice.actions;

const authSingUpUser =
  ({ state, uploadAvatarFromServer }) =>
  async (dispatch) => {
    try {
      const { email, password, nickName } = state;
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.currentUser;

      await updateProfile(user, {
        displayName: nickName,
        photoURL: uploadAvatarFromServer,
      });
      const { uid, displayName, photoURL } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
          avatar: photoURL,
          email: email,
        })
      );
    } catch (error) {
      console.log(error.message);
    }
  };

const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log(error.message);
    }
  };

const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSingOut());
  } catch (error) {
    console.log(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName, email, photoURL } = user;
      dispatch(
        updateUserProfile({
          nickName: displayName,
          userId: uid,
          email: email,
          avatar: photoURL,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
    }
  });
};

export { authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser };
