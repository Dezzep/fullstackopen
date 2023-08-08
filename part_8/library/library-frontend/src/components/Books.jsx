// eslint-disable-next-line react/prop-types
import { useQuery } from '@apollo/client';
import { ALL_BOOKS } from '../services/queries';

const Books = () => {
  const bookResult = useQuery(ALL_BOOKS, {});

  if (bookResult.loading) {
    return <div>loading...</div>;
  }

  return (
    <div>
      <h2>Books</h2>
      <table>
        <tbody>
          <tr>
            <th>Books</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {bookResult.data.allBooks.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;
