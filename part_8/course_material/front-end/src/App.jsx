import { useQuery } from '@apollo/client';
import Persons from './components/Persons';
import PersonForm from './components/PersonForm';
import { ALL_PERSONS } from './queries';
import { useState } from 'react';
import Notify from './components/Notify';
import PhoneForm from './components/PhoneForm';

function App() {
  const [errorMessage, setErrorMessage] = useState(null);
  const result = useQuery(ALL_PERSONS, {});

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  };

  console.log(result);
  return (
    <div>
      <Notify message={errorMessage} />
      <Persons persons={result.data.allPersons} />
      <PersonForm setError={notify} />
      <PhoneForm setError={notify} />
    </div>
  );
}

export default App;
