import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isLoadingUser: false,
  isUserLoadingError: false,
};

const userAuthSlice = createSlice({
  name: "userAuth",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.isLoadingUser = true;
      state.user = null;
      state.isUserLoadingError = false;
    },
    loginSuccess: (state, action) => {
      state.isLoadingUser = false;
      state.user = action.payload;
      state.isUserLoadingError = false;
    },
    loginFailure: (state, action) => {
      state.user = null;
      state.isLoadingUser = false;
      state.isUserLoadingError = true;
    },
  },
});

export const { loginStart, loginSuccess, loginFailure } = userAuthSlice.actions;
export default userAuthSlice.reducer;
