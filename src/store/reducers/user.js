// types
import { createSlice } from '@reduxjs/toolkit';

// initial state
const initialState = {
  userDetails: {},
  jwt: "",
  loggedIn: false
};

// ==============================|| SLICE - MENU ||============================== //

const user = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginUser(state, action) {
      state.userDetails = action.payload.userDetails;
      state.jwt = action.payload.jwt;
      state.loggedIn = true;
    },
    logoutUser(state, action) {
      state = initialState;
    },
  }
});

export default user.reducer;

export const { loginUser, logoutUser, setTeamDetails, setModules } = user.actions;
