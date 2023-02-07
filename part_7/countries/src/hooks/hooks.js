import { useState, useEffect } from 'react';
import axios from 'axios';

export const useFullName = (country) => {
  const [details, setDetails] = useState([]);
  useEffect(() => {
    if (country) {
      axios
        .get(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
        .then((response) => setDetails(response.data[0]));
    }
  }, [country]);
  return details;
};
