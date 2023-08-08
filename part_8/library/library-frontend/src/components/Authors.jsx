// eslint-disable-next-line react/prop-types
const Authors = ({ authors }) => {
  return (
    <div>
      <h2>Authors</h2>
      {authors.map((author) => (
        <div
          key={author.name}
          style={{ background: 'black', padding: '2em', marginBottom: '1em' }}
        >
          <p>{author.name}</p>
          <p>born: {author.born}</p>
          <p>books: {author.bookCount}</p>
        </div>
      ))}
      <p></p>
    </div>
  );
};

export default Authors;
