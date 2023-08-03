const LoginInfo = ({ logOut, user }) => {
  return (
    <div>
      {user.name} logged in <button onClick={logOut}>Log Out</button>
    </div>
  );
};

export default LoginInfo;
