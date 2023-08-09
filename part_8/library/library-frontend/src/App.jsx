import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './App.css';
import { ALL_AUTHORS } from './services/queries';
import Authors from './components/Authors';
import Books from './components/Books';
import AddBook from './components/AddBook';

function App() {
  const authorResult = useQuery(ALL_AUTHORS, {});
  if (authorResult.loading) {
    return <div>loading...</div>;
  }
  return (
    <Router>
      <div
        style={{
          display: 'flex',
          gap: '32px',
          width: '550px',
        }}
      >
        <Link to="/">Authors</Link>
        <Link to="/books">Books</Link>
        <Link to="/add-book">Add Book</Link>
      </div>
      <Routes>
        <Route
          path="/"
          element={<Authors authors={authorResult.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
        <Route path="add-book" element={<AddBook />} />
      </Routes>
    </Router>
  );
}

export default App;
