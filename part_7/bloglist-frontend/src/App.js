import { useState, useEffect, useRef } from 'react';
// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import {
  initializeBlogs,
  createBlog,
  voteFor,
  removeBlog,
} from './reducers/blogReducer';
import { determineUser, getAllUsers } from './reducers/userReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';

const App = () => {
  const state = useSelector((state) => state);
  const blogs = state.blogs;
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
    dispatch(getAllUsers());
  }, [dispatch]);

  const logOut = () => {
    setUser(null);
    dispatch(determineUser(''));
    localStorage.removeItem('loggedBloglistUser');
  };

  const loginFormSubmit = async (event, username, password) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem('loggedBloglistUser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      dispatch(determineUser(user));

      return 1;
    } catch (exception) {
      // dispatch(setNotification('Wrong Username or Password', 5));
      dispatch(setNotification('Wrong Username or password', 5, 'error'));
    }
  };

  const blogSubmitHandler = async (e, title, author, url) => {
    e.preventDefault();
    if (title.length < 3 || url.length < 3) {
      dispatch(setNotification('URL or TITLE invalid', 5, 'error'));
    } else {
      try {
        dispatch(createBlog({ title, author, url }));
        dispatch(setNotification(`Blog ${title} has been created`, 5));
        blogFormRef.current.toggleVisibility();
      } catch (exception) {
        dispatch(setNotification('Please fill out required forms', 5, 'error'));
      }
    }
  };

  const addLikes = async (id, title, author, url, likes, user) => {
    dispatch(setNotification(`you voted ${title}`, 5));

    try {
      dispatch(voteFor(id, { title, author, url, likes, user }));
    } catch (exception) {
      console.log('error adding like');
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('do you really want to delete this?')) {
      dispatch(setNotification('Blog deleted', 5, 'error'));
      try {
        dispatch(removeBlog(id));
      } catch (error) {
        dispatch(setNotification('Error deleting', 5, 'error'));
      }
    }
  };

  useEffect(() => {}, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  if (!user) {
    return (
      <div>
        <LoginForm loginFormSubmit={loginFormSubmit} user={user} />
        <h3 style={{ color: 'red' }}>{state.notification.value}</h3>
      </div>
    );
  }
  return (
    <Home
      user={user}
      blogFormRef={blogFormRef}
      logOut={logOut}
      blogs={blogs}
      addLikes={addLikes}
      deleteBlog={deleteBlog}
      blogSubmitHandler={blogSubmitHandler}
      state={state}
    />
  );
};

export default App;
