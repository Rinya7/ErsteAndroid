import auth from "../../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
//import { authSlice } from "./authReducer";

const authSingUpUser =
  ({ email, password, name }) =>
  async (dispatch) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log("user", user);
      //  dispatch(authSlice.actions.updateUserProfile({ userId: user.uid }));

      console.log("user.uid:", user.uid);
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
    const user = await signOut(auth);
    console.log(user);
  } catch (error) {
    console.log(error);
    console.log(error.message);
  }
};

export { authSingInUser, authSingUpUser, authSingOutUser };
