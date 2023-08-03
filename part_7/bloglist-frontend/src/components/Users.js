import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserDisplay = ({ user }) => {
  return (
    <div
      style={{
        display: 'flex',
        height: '50px',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        gap: '36px',
      }}
    >
      <div>
        {' '}
        <Link to={`/users/${user.id}`}>{user.name}</Link>
      </div>
      <p style={{ marginLeft: 'auto' }}>{user.blogs.length}</p>
    </div>
  );
};

const Users = () => {
  const state = useSelector((state) => state);
  const allUsers = state.users.users;

  {
    if (!allUsers) {
      return null;
    }
  }
  return (
    <div style={{ display: 'flex', flexFlow: 'column' }}>
      <div style={{ display: 'flex', gap: '40px' }}>
        <h1>Users</h1>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', width: '200px' }}>
        <h4 style={{ marginLeft: 'auto' }}>Blogs created</h4>
        {allUsers.map((user, i) => {
          return (
            <div key={i + 'user'}>
              <UserDisplay user={user} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Users;
