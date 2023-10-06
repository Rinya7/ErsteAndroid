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
  ({ email, password, login, photo }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      const user = await auth.currentUser;
      await updateProfile(user, { displayName: login });
      const { uid, displayName } = await auth.currentUser;
      console.log("uid:", uid);
      console.log("displayName:", displayName);
      dispatch(
        updateUserProfile({
          userId: uid,
          login: displayName,
        })
      );
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSingInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user);
    } catch (error) {
      console.log(error);
      console.log(error.message);
    }
  };

const authSingOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(auth);
    dispatch(authSingOut());
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

const authStateChangeUser = () => async (dispatch, getState) => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const { uid, displayName } = user;
      dispatch(
        updateUserProfile({
          login: displayName,
          userId: uid,
        })
      );
      dispatch(authStateChange({ stateChange: true }));
    } else {
    }
  });
};

export { authSingInUser, authSingUpUser, authSingOutUser, authStateChangeUser };
