import { useState, useEffect } from "react";
import Filter from "./components/Filter";
import Numbers from "./components/Numbers";
import Form from "./components/Form";
import peopleService from "./services/people";
import Message from "./components/Message";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [message, setMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const updatePeople = () => {
    peopleService.getAll().then((updatedValue) => {
      setPersons(updatedValue);
    });
  };

  const displayMessage = (msg, error) => {
    setMessage(null);
    setErrorMessage(null);
    if (!error) {
      setMessage(msg);
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } else {
      setErrorMessage(msg);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };
  const changeNumber = (id, newNumber) => {
    const personsData = persons.find((p) => p.id === id);
    const name = personsData.name;
    const changedNumber = { ...personsData, number: newNumber };
    peopleService
      .update(id, changedNumber, displayMessage, name)
      .then(() => updatePeople());
  };
  const sendAlert = (id, duplicateName) => {
    if (
      window.confirm(
        `A number for ${duplicateName} already exists. Do you want to replace it?`
      )
    ) {
      displayMessage(`${duplicateName}'s number has been changed.`);
      changeNumber(id, newNumber);
      setNewName("");
      setNewNumber("");
    }
  };
  const addNewPerson = () => {
    if (newName.length < 1 || newNumber.length < 1) {
      return displayMessage("Please put a name and number.", true);
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    peopleService
      .create(personObject, displayMessage)
      .then((personData) => {
        updatePeople();
      })
      .catch((error) => {
        console.log(error.message);
      });

    displayMessage(`${newName} has been added to the phonebook.`);

    setNewName("");
    setNewNumber("");
  };

  const buttonClick = (e) => {
    e.preventDefault();
    let duplicate = false;
    let duplicateName;
    persons.map((person) =>
      person.name === newName
        ? ((duplicate = person.id), (duplicateName = person.name))
        : null
    ); // sets duplicate value to true if there are any repeated names.
    !duplicate ? addNewPerson() : sendAlert(duplicate, duplicateName);
  };
  const deleteButtonClick = (id, name) => {
    if (window.confirm(`do you want to delete: ${name}`)) {
      const x = peopleService.remove(id);
      x.then(() => updatePeople());
    }
  };

  const handleNameChange = (e) => {
    setNewName(e.target.value);
  };
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value);
  };
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    updatePeople();
  }, []);

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter onChange={handleFilterChange} filterValue={filterValue} />

      <Form
        newNumber={newNumber}
        newName={newName}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        buttonClick={buttonClick}
      />
      <Message msg={message} error={errorMessage} />

      <Numbers
        filterValue={filterValue}
        persons={persons}
        deleteButtonClick={deleteButtonClick}
      />
    </div>
  );
};

export default App;
