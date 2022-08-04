const Form = ({newNumber, newName, handleNameChange, handleNumberChange, buttonClick}) => {
  return ( 
    <div>
      <h2>Add a new</h2>
      <form>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" onClick={buttonClick}>add</button>
        </div>
      </form>
    </div>
   );
}
 
export default Form;