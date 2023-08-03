import LoginInfo from './LoginInfo';
import { Link } from 'react-router-dom';

const Nav = ({ logOut, user }) => {
  return (
    <div
      style={{
        display: 'flex',
        gap: '2em',
        background: 'grey',
        padding: '6px',
        marginBottom: '2em',
      }}
    >
      <Link to="/">home</Link>
      <Link to="users">users</Link>
      <LoginInfo logOut={logOut} user={user} />
    </div>
  );
};

export default Nav;
