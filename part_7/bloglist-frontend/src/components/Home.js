import Togglable from './Togglable';
import BlogForm from './BlogForm';
import Notification from './Notification';
import Blog from './Blog';
import LoginForm from './LoginForm';
import LoginInfo from './LoginInfo';

const Home = ({
  user,
  blogFormRef,
  logOut,
  blogs,
  addLikes,
  deleteBlog,
  blogSubmitHandler,
  loginFormSubmit,
  state,
}) => {
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
        <LoginInfo logOut={logOut} user={user} />
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

export default Home;
