import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './App.css';
import { ALL_AUTHORS } from './services/queries';
import Authors from './components/Authors';
import Books from './components/Books';

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
      </div>
      <Routes>
        <Route
          path="/"
          element={<Authors authors={authorResult.data.allAuthors} />}
        />
        <Route path="/books" element={<Books />} />
      </Routes>
    </Router>
  );
}

export default App;
