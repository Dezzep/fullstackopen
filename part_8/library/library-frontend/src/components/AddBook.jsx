import { useState } from 'react';
import { ADD_BOOK, ALL_AUTHORS, ALL_BOOKS } from '../services/queries';
import { useMutation } from '@apollo/client';
const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [published, setPublished] = useState('');
  const [genre, setGenre] = useState('');
  const [genres, setGenres] = useState([]);

  const [bookAdd] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      console.log(messages);
    },
  });

  const addGenre = (e) => {
    e.preventDefault();

    if (genre.length >= 1 && !genres.includes(genre)) {
      setGenres(genres.concat(genre));
      setGenre('');
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (title && author && published && genres.length > 0) {
      bookAdd({
        variables: { title, author, published: parseInt(published), genres },
      });
      setTitle('');
      setAuthor('');
      setPublished('');
      setGenre('');
      setGenres([]);
    }
  };
  return (
    <div>
      <h2>Add a books</h2>
      <form
        style={{
          display: 'flex',
          gap: '16px',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <label htmlFor={'title'}> Title: </label>
        <input
          id="title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />

        <label htmlFor={'author'}> Author: </label>
        <input
          id="author"
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />

        <label htmlFor={'published'}> Published: </label>
        <input
          type="number"
          id="published"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
        />
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '46px',
          }}
        >
          <div>
            <label htmlFor={'genres'}> Genres: </label>
            <input
              id="genres"
              value={genre}
              onChange={({ target }) => setGenre(target.value)}
            />
          </div>
          <button type="button" onClick={addGenre}>
            add genre
          </button>
        </div>
      </form>

      <div
        style={{
          display: 'flex',
          gap: '16px',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        genres:{' '}
        {genres.map((g) => (
          <p key={g + 'genre'}>{g}, </p>
        ))}
      </div>
      <button onClick={handleSubmit}>Add Book</button>
    </div>
  );
};

export default AddBook;
