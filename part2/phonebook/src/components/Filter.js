const Filter = ({filterValue, onChange}) => {
  return (  
    <div>
   
      <div>
        filter shown with: <input value={filterValue} onChange={onChange}></input>
      </div>
    </div>
  );
}
 
export default Filter;