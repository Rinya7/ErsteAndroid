import { createSlice } from "@reduxjs/toolkit";

const state = {
  userId: null,
  nickName: null,
  stateChange: false,
  avatar: null,
  email: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState: state,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      nickName: payload.nickName,
      avatar: payload.avatar,
      email: payload.email,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSingOut: () => state,
  },
});

 
