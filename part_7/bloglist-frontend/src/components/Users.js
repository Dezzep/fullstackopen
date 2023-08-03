import { useSelector } from 'react-redux';

const UserDisplay = ({ user }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '8px',
        justifyContent: 'space-between',
        width: '150px',
      }}
    >
      <p>{user.name}</p>
      <p>{user.blogs.length}</p>
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
