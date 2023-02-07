import { useState } from 'react';
import Weather from './Weather';
import { useFullName } from '../hooks/hooks';

const ExtraCountryInfo = ({ country, displayOn }) => {
  const [clicked, setClicked] = useState(false);
  const extra = useFullName(country.name);
  const buttonClicked = () => {
    setClicked(true);
  };

  if (displayOn || clicked) {
    return (
      <div>
        <p>capital: {extra.capital}</p>
        <p>area: {extra.area}</p>
        <p>continent: {extra.continents}</p>
        <h3> Borders: </h3>
        <ul>
          {extra.borders
            ? extra.borders.map((border) => (
                <li key={extra.name + border}>{border}</li>
              ))
            : null}
        </ul>
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
