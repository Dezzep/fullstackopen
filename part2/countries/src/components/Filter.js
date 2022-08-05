const Filter = ({ onChange, filterValue }) => {
  return (
    <div>
      find countries: <input onChange={onChange} value={filterValue}></input>
    </div>
  );
};

export default Filter;
