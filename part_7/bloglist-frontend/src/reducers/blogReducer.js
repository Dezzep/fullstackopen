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
    deleteBlog(state, action) {
      const id = action.payload;
      return state.filter((post) => post.id !== id);
    },
  },
});

export const { setBlogs, appendBlog, voteUpdate, deleteBlog } =
  blogSlice.actions;

export const initializeBlogs = () => {
  return async (dispatch) => {
    const posts = await blogService.getAll();
    dispatch(setBlogs(posts));
  };
};
export const voteFor = (id, content) => {
  return async (dispatch) => {
    console.log('id is ', id);
    console.log('user is ', content.user);

    const blogToIncrement = { id, ...content };
    await blogService.update(id, blogToIncrement);

    dispatch(voteUpdate(blogToIncrement));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(content);
    dispatch(appendBlog(newBlog));
  };
};

export const removeBlog = (id) => {
  return async (dispatch) => {
    console.log('was I ever here');
    await blogService.remove(id);

    dispatch(deleteBlog(id));
  };
};

export default blogSlice.reducer;
