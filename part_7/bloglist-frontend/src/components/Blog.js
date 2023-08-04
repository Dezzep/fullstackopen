import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { update, removeBlog } from '../reducers/blogReducer';
import { setNotification } from '../reducers/notificationReducer';
import { useState } from 'react';
const Blog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const updateBlog = async (id, title, author, url, likes, user, comments) => {
    try {
      dispatch(update(id, { title, author, url, likes, user, comments }));
    } catch (exception) {
      console.log('error');
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const arrayOfComments = [...blog.comments];
    arrayOfComments.push(comment);
    if (comment.length >= 2) {
      // const newComments = blog.comments.push(comment);
      updateBlog(
        blog.id,
        blog.title,
        blog.author,
        blog.url,
        blog.likes,
        blog.user.id,
        arrayOfComments
      );

      // setComment('');
    }
  };

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  if (!blog) return null;
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '20em',
        background: 'rebeccaPurple',
        justifyContent: 'center',
        alignContent: 'center',
        padding: '6em',
        color: 'orange',
      }}
    >
      <h1 style={{ color: 'blue', fontSize: '3em' }}>
        <strong>{blog.title}</strong>
      </h1>
      <h2>author: {blog.author}</h2>
      <div style={{ display: 'flex', gap: '1em' }}>
        <p>Link:</p>
        <a style={{ color: 'black', fontSize: '2em' }} href={blog.url}>
          {blog.url}
        </a>
      </div>
      <div
        style={{ display: 'flex', marginBottom: '2em', alignContent: 'center' }}
      >
        <p>{blog.likes} likes</p>{' '}
        <button
          style={{ height: '24px', marginTop: '12px', marginLeft: '6px' }}
          onClick={() =>
            updateBlog(
              blog.id,
              blog.title,
              blog.author,
              blog.url,
              blog.likes + 1,
              blog.user.id,
              blog.comments
            )
          }
        >
          like
        </button>{' '}
      </div>

      <div>
        <h3>Comments</h3>
        <form style={{ marginBottom: '4em' }}>
          <input
            value={comment}
            onChange={handleCommentChange}
            minLength={2}
            type="text"
          ></input>
          <button onClick={handleSubmit}>Comment</button>
        </form>
        {blog.comments
          .map((comment, i) => {
            return (
              <ul key={comment + i}>
                {' '}
                <li>{comment} </li>{' '}
              </ul>
            );
          })
          .reverse()}
      </div>

      <button
        style={{
          width: '12em',
          background: 'red',
          height: '2em',
          fontSize: '1.2em',
        }}
        onClick={() => deleteBlog(blog.id)}
      >
        Delete Blog
      </button>
    </div>
  );
};

export default Blog;
