const Numbers = ({persons, filterValue}) => {
  
  const filtered = persons.filter(person =>  person.name.toLowerCase().includes(filterValue.toLowerCase()));


  return ( 
    <div>
      <h2>Numbers</h2>
      {filtered.map((person, i) => <p key={person.name + i}>{person.name} {person.number}</p>)}
    </div>
   );
}
 
export default Numbers;