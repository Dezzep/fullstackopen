import axios from 'axios';
const baseUrl = '/api/people';

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject, displayMessage) => {
  try {
    const request = axios.post(baseUrl, newObject);
    const response = await request;
    return response.data;
  } catch (error) {
    // I spent 2 hours trying to figure out why error.response.data.error wasn't working.. so I did this instead

    displayMessage(
      'Validation Error: Name must be 3 characters long. Number must be formatted like: 555-555-5555',
      true
    );
  }
};

const update = async (id, newObject, displayMessage, name) => {
  try {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
  } catch (error) {
    displayMessage(
      'Validation Error: Number must be formatted like: 555-555-5555',
      true
    );
  }
};

const remove = async (id) => {
  try {
    await axios.delete(`${baseUrl}/${id}`);
  } catch {
    return 0;
  }
};

const peopleService = {
  getAll,
  create,
  update,
  remove,
};

export default peopleService;
