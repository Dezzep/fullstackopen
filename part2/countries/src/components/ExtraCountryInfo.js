import { useState } from "react";
import Weather from "./Weather";

const ExtraCountryInfo = ({ country, displayOn }) => {
  const [clicked, setClicked] = useState(false);

  const buttonClicked = () => {
    setClicked(true);
  };

  if (displayOn || clicked) {
    return (
      <div>
        <p>capital: {country.capital}</p>
        <p>area: {country.area}</p>
        <h4>Languages:</h4>
        <ul>
          {country.languages.map((lang) => (
            <li key={country.name + lang.name}>{lang.name}</li>
          ))}
        </ul>
        <img src={country.flags.png} alt={`The Flag Of ${country.name}`}></img>
        <Weather country={country} />
      </div>
    );
  } else return <button onClick={buttonClicked}>show</button>;
};

export default ExtraCountryInfo;
