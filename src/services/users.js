import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BACKEND_URL}/users`;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const google_token = localStorage.getItem("google_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
    config.headers.tokentype = "jwt";
  }
  if (google_token) {
    config.headers.Authorization = `Bearer ${google_token}`;
    config.headers.tokentype = "google";
  }
  return config;
});

const create = async (newUser) => {
  const response = await axios.post(`${baseUrl}/signup`, newUser);
  return response.data;
};

const login = async (user) => {
  const response = await axios.post(`${baseUrl}/login`, user);
  return response.data;
};

const get = async () => {
  const response = await axios.get(`${baseUrl}/me`);
  return response.data;
};

const getAll = async () => {
  const response = await axios.get(`${baseUrl}/all`);
  return response.data;
};

const update = async (user) => {
  const response = await axios.put(`${baseUrl}/update`, user);
  return response.data;
};

const googleLogin = async (user) => {
  const response = await axios.get(`${baseUrl}/google-login`, {
    headers: {
      Authorization: `Bearer ${user.access_token}`,
      tokentype: "google",
    },
  });
  return response.data;
};

export default {
  create,
  login,
  get,
  getAll,
  update,
  googleLogin,
};
