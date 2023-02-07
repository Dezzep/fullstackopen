import { useState, useEffect } from 'react';
import axios from 'axios';
export const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  const create = async (resource) => {
    const response = await axios.post(baseUrl, resource);
    setResources([...resources, response.data]);
    return response.data;
  };

  useEffect(() => {
    const getAll = async () => {
      const response = await axios.get(baseUrl);
      setResources(response.data);
    };
    if (resources.length === 0) {
      getAll();
    }
  }, [resources, baseUrl]);

  const service = {
    create,
  };

  return [resources, service];
};
