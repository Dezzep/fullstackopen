import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Notification from './Notification';
import LoginForm from './LoginForm';
import { Link } from 'react-router-dom';

const Home = ({
  user,
  blogFormRef,
  blogs,
  // addLikes,
  // deleteBlog,
  blogSubmitHandler,
  loginFormSubmit,
  state,
}) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
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
      <Togglable buttonLabel={'new blog'} ref={blogFormRef}>
        <h2>create new</h2>
        <BlogForm user={user} blogSubmitHandler={blogSubmitHandler} />
      </Togglable>
      <Notification />

      <h2>blogs</h2>

      {blogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blog/${blog.id}`}>
            {blog.title} --- {blog.author}
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Home;
