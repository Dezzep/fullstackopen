import ExtraCountryInfo from "./ExtraCountryInfo";

const Countries = ({ countries, filterValue }) => {
  const filtered = countries.filter((country) =>
    country.name.toLowerCase().includes(filterValue.toLowerCase())
  );

  if (filtered.length === 1) {
    return (
      <div>
        {filtered.map((country, i) => (
          <div key={country.name + i}>
            <p>{country.name}</p>
            <ExtraCountryInfo country={country} displayOn={true} />
          </div>
        ))}
      </div>
    );
  } else if (filtered.length <= 10) {
    return (
      <div>
        <div>
          {filtered.map((country, i) => (
            <div key={country.name + i}>
              <p style={{display:"inline-block"}}>{country.name}</p>
              <ExtraCountryInfo country={country} />
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div>
        <p>Too many matches, specify another filter</p>
      </div>
    );
  }
};

export default Countries;
