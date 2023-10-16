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
  ({ email, password, nickName, photo }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      await updateProfile(user, { displayName: nickName });
      const { uid, displayName } = await auth.currentUser;

      dispatch(
        updateUserProfile({
          userId: uid,
          nickName: displayName,
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
      const { uid, displayName } = user;
      dispatch(
        updateUserProfile({
          nickName: displayName,
          userId: uid,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
    }
  });
};

export { authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser };
