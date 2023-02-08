import { useSelector } from 'react-redux';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  let style;
  console.log(notification.error);
  console.log(notification.error);

  console.log(notification.error);

  if (notification.error) {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      backgroundColor: 'red',
    };
  } else {
    style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1,
      backgroundColor: 'green',
    };
  }

  return (
    <div>
      {notification.value ? (
        <div style={style}>{notification.value}</div>
      ) : null}
    </div>
  );
};

export default Notification;
