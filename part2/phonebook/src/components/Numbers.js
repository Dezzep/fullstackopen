const Numbers = ({ persons, filterValue, deleteButtonClick }) => {
  let filtered = persons.filter((person) =>
    person.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  return (
    <div>
      <h2>Numbers</h2>
      {filtered.map((person, i) => (
        <div key={person.name + i}>
          {person.name} {person.number}
          <button
            onClick={() => deleteButtonClick(person.id, person.name)}
            style={{ marginLeft: "4px" }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default Numbers;
