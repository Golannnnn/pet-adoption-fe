import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/pets`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getByPetId = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getByUserId = async (id) => {
  const response = await axios.get(`${baseUrl}/user/${id}`);
  return response.data;
};

const search = async (query) => {
  const response = await axios.get(`${baseUrl}/search/${query}`);
  return response.data;
};

const create = async (newPet) => {
  const response = await axios.post(`${baseUrl}/create`, newPet);
  return response.data;
};

const update = async (petId, updatedField) => {
  const response = await axios.put(`${baseUrl}/${petId}`, updatedField);
  return response.data;
};

const changeStatus = async (petId, action) => {
  const response = await axios.patch(
    `${baseUrl}/change-status/${petId}`,
    action
  );
  return response.data;
};

export default {
  getAll,
  getByPetId,
  getByUserId,
  create,
  update,
  search,
  changeStatus,
};
