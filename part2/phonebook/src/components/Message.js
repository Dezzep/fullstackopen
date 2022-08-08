const Message = ({ msg, error }) => {
  if (error) {
    return (
      <div
        style={{
          width: "full",
          border: "4px solid red",
          padding: 12,
          marginTop: 6,
          fontSize: 24,
          color: "red",
          backgroundColor: "grey",
          fontStyle: "bold",
        }}
      >
        {error}
      </div>
    );
  } else if (msg) {
    return (
      <div
        style={{
          width: "full",
          border: "4px solid green",
          padding: 12,
          marginTop: 6,
          fontSize: 24,
          backgroundColor: "#2ff22f",
          fontStyle: "bold",
        }}
      >
        {msg}
      </div>
    );
  } else {
    return null;
  }
};

export default Message;
