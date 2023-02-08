import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import LoginForm from './components/LoginForm';
import loginService from './services/login';
import BlogForm from './components/BlogForm';
import Togglable from './components/Togglable';
import { initializeBlogs, createBlog } from './reducers/blogReducer';
import { useDispatch, useSelector } from 'react-redux';
import { setNotification } from './reducers/notificationReducer';
import Notification from './components/Notification';

const App = () => {
  const state = useSelector((state) => state);
  console.log(state.blogs);
  const blogs = state.blogs;
  const [user, setUser] = useState(null);

  console.log(state.notification.value);
  const blogFormRef = useRef();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeBlogs());
  }, [dispatch]);

  const logOut = () => {
    setUser(null);
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
      await blogService.update(id, { title, author, url, likes, user });
    } catch (exception) {
      console.log('error adding like');
    }
  };

  const deleteBlog = async (id) => {
    if (window.confirm('do you really want to delete this?')) {
      try {
        await blogService.remove(id);
      } catch (error) {
        dispatch(setNotification('Wrong Username or password', 5, 'error'));
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
    <div>
      <h2>blogs</h2>
      <div>
        {user.name} logged in <button onClick={logOut}>Log Out</button>
      </div>
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm user={user} blogSubmitHandler={blogSubmitHandler} />
      </Togglable>
      <Notification />

      <h2>blogs</h2>
      {blogs.map((blog, i) => (
        <Blog
          key={blog.id}
          viewId={`viewId${i}`}
          likeId={`likeId${i}`}
          deleteId={`deleteblog${i}`}
          blog={blog}
          addLikes={addLikes}
          deleteBlog={deleteBlog}
        />
      ))}
    </div>
  );
};

export default App;
