import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    appendBlog(state, action) {
      state.push(action.payload);
    },
    voteUpdate(state, action) {
      const blogToIncrement = action.payload;

      return state.map((post) =>
        post.id !== blogToIncrement.id ? post : blogToIncrement
      );
    },
    setBlogs(state, action) {
      return action.payload.sort((a, b) => a.likes - b.likes).reverse();
    },
  },
});

export const { setBlogs, appendBlog, voteUpdate } = blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const posts = await blogService.getAll();
    dispatch(setBlogs(posts));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export default blogSlice.reducer;
