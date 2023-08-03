import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], signedInUser: {} },
  reducers: {
    setAllUsers(state, action) {
      state.users = action.payload
        .sort((a, b) => a.blogs.length - b.blogs.length)
        .reverse();
      // return action.payload.sort((a, b) => a.likes - b.likes).reverse();

      return state;
    },
    setCurrentUser: (state, action) => {
      state.signedInUser = action.payload;
      return state;
    },
  },
});

export const { setAllUsers, setCurrentUser } = userSlice.actions;

export const getAllUsers = () => {
  return async (dispatch) => {
    const users = await userService.getAll();

    dispatch(setAllUsers(users));
  };
};

export const determineUser = (user) => {
  return async (dispatch) => {
    await dispatch(setCurrentUser(user));
  };
};

export default userSlice.reducer;
