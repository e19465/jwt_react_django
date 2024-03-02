import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  auth_tokens: null,
  isLoadingToken: false,
  isTokenLoadingError: false,
};

const userTokenSlice = createSlice({
  name: "userToken",
  initialState,
  reducers: {
    getTokenStart: (state) => {
      state.isLoadingToken = true;
      state.auth_tokens = null;
      state.isTokenLoadingError = false;
    },
    getTokenSuccess: (state, action) => {
      state.isLoadingToken = false;
      state.auth_tokens = action.payload;
      state.isTokenLoadingError = false;
    },
    getTokenError: (state) => {
      state.auth_tokens = null;
      state.isLoadingToken = false;
      state.isTokenLoadingError = true;
    },
    logout: (state) => {
      state.auth_tokens = null;
      state.isLoadingToken = false;
      state.isTokenLoadingError = false;
    },
  },
});

export const { getTokenStart, getTokenSuccess, getTokenError, logout } =
  userTokenSlice.actions;
export default userTokenSlice.reducer;
