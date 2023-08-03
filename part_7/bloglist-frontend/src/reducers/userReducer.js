import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: { users: [], signedInUser: {} },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload
        .sort((a, b) => a.blogs.length - b.blogs.length)
        .reverse();
      return state.users;
    },
    setCurrentUser: (state, action) => {
      state.signedInUser = action.payload;
      return state;
    },
  },
});

export const { setUsers, setCurrentUser } = userSlice.actions;

export const determineUser = (user) => {
  return async (dispatch) => {
    await dispatch(setCurrentUser(user));
  };
};

export default userSlice.reducer;
