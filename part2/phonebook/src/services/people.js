import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const create = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const update = async (id, newObject, displayMessage, name) => {
  try {
    const request = axios.put(`${baseUrl}/${id}`, newObject);
    const response = await request;
    return response.data;
  } catch {
    displayMessage(`information of ${name} has already been deleted.`, true);
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
