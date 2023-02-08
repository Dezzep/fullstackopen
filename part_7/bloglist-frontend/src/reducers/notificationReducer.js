import { createSlice } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: { value: '', error: '' },
  reducers: {
    displayNotification(state, action) {
      const [message, error] = action.payload;
      console.log(error);
      console.log(message);
      state.value = message;
      if (error) {
        state.error = error;
      }
    },

    removeNotification(state) {
      state.value = '';
      state.error = '';
    },
  },
});

export const { displayNotification, removeNotification } =
  notificationSlice.actions;

export const setNotification = (message, timer, err = 0) => {
  return (dispatch) => {
    dispatch(displayNotification([message, err]));

    const msTime = timer * 1000;
    setTimeout(() => {
      dispatch(removeNotification());
    }, msTime);
  };
};

export default notificationSlice.reducer;
