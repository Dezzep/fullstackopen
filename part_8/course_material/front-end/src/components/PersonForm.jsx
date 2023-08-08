/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_PERSONS, CREATE_PERSON } from '../queries';

const PersonForm = ({ setError }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');

  const [createPerson] = useMutation(CREATE_PERSON, {
    refetchQueries: [{ query: ALL_PERSONS }],
    onError: (error) => {
      const messages = error.graphQLErrors[0].message;
      setError(messages);
    },
  });

  const submit = (e) => {
    e.preventDefault();

    createPerson({ variables: { name, phone, street, city } });

    setName('');
    setPhone('');
    setCity('');
    setStreet('');
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={submit}>
        <div>
          name{' '}
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          ></input>
        </div>
        <div>
          phone{' '}
          <input
            value={phone}
            onChange={({ target }) => setPhone(target.value)}
          ></input>
        </div>
        <div>
          city{' '}
          <input
            value={city}
            onChange={({ target }) => setCity(target.value)}
          ></input>
        </div>
        <div>
          street{' '}
          <input
            value={street}
            onChange={({ target }) => setStreet(target.value)}
          ></input>
        </div>
        <button type="submit">add!</button>
      </form>
    </div>
  );
};

export default PersonForm;
