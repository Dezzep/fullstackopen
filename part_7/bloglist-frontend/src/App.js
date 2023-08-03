import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import LoginInfo from './components/LoginInfo';
import User from './components/User';

import Users from './components/Users';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
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
    <Router>
      <div>
        <Link to="/">home</Link>
        <Link to="users">users</Link>

        <LoginInfo logOut={logOut} user={user} />

        <Routes>
          <Route path="/users" element={<Users />} />
          <Route path="/users/:id" element={<User />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route
            path="/"
            element={
              <Home
                user={user}
                blogFormRef={blogFormRef}
                blogs={blogs}
                blogSubmitHandler={blogSubmitHandler}
                state={state}
              />
            }
          ></Route>
        </Routes>
      </div>
    </Router>
  );
};

export default App;
