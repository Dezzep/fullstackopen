import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { voteFor, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
      navigate('/');
      try {
        dispatch(removeBlog(id));
      } catch (error) {
        dispatch(setNotification('Error deleting', 5, 'error'));
      }
    }
  };
  const id = useParams().id;
  const blogs = useSelector((state) => state.blogs);
  const blog = blogs.find((b) => b.id === id);

  if (!blog) return null;
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>{blog.title} </h1>
      <h2>author: {blog.author}</h2>
      <a href={blog.url}>{blog.url}</a>
      <p>current likes: {blog.likes}</p>
      <button
        onClick={() =>
          addLikes(
            blog.id,
            blog.title,
            blog.author,
            blog.url,
            blog.likes + 1,
            blog.user.id
          )
        }
      >
        Add Likes
      </button>
      <button onClick={() => deleteBlog(blog.id)}>Delete Blog</button>
    </div>
  );
};

export default Blog;
