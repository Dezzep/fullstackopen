import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const User = () => {
  const getUser = () => {
    const id = useParams().id;

    const users = useSelector((state) => state.users.users);
    const user = users.find((u) => u.id === id);
    return user;
  };

  const user = getUser();
  if (!user) {
    return null;
  } else {
    return (
      <div>
        <h1>{user.name}</h1>
        <h2>added blogs</h2>
        <ul>
          {user.blogs.map((blog, i) => {
            return (
              <li key={'blog' + user.name + i + blog.title}>{blog.title}</li>
            );
          })}
        </ul>
      </div>
    );
  }
};
export default User;
