import { useState } from 'react'
import Filter from './components/Filter'
import Numbers from './components/Numbers'
import Form from './components/Form'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number:'555-123-1234' },
    { name: 'Toro Hellaaaas', number:'55345-12-1234' },
    { name: 'Boroo Belldas', number:'51255-121253-1125234' }


  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterValue, setFilterValue] = useState('')


  
  const sendAlert = () => {
    alert(`${newName} is already added to phonebook.`)
    setNewName('')
  }
  const addNewPerson = () => {
    setPersons(persons.concat({name:newName, number:newNumber}));
    setNewName('')
    setNewNumber('')
  }
  const buttonClick = (e) => {
    e.preventDefault()
    let duplicates = false;
    persons.map(person => person.name === newName ? duplicates = true: null ) // sets duplicate value to true if there are any repeated names.
    !duplicates ? addNewPerson() : sendAlert();
  }
    
  
  const handleNameChange = (e) => {
    setNewName(e.target.value)
  }
  const handleNumberChange = (e) => {
    setNewNumber(e.target.value)
  }
  const handleFilterChange = (e) => {
    setFilterValue(e.target.value)
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter 
      onChange={handleFilterChange} 
      filterValue={filterValue} 
      />
      
      <Form 
      newNumber={newNumber} 
      newName={newName} 
      handleNameChange={handleNameChange} 
      handleNumberChange={handleNumberChange} 
      buttonClick={buttonClick}
      />

      <Numbers 
      filterValue={filterValue} 
      persons={persons} 
      />
        

    </div>
  )
}

export default App