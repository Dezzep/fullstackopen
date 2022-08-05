import { useState, useEffect } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

function App() {
  const [countryData, setCountryData] = useState([]);
  const [filterValue, setFilterValue] = useState("");

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v2/all").then((response) => {
      setCountryData(response.data);
      console.log(response.data[200].name);
    });
  }, []);

  return (
    <div>
      <Filter filterValue={filterValue} onChange={handleFilterChange} />
      <Countries filterValue={filterValue} countries={countryData} />
    </div>
  );
}

export default App;
