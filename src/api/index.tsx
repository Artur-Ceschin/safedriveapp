import axios from 'axios';

const api = axios.create({
  baseURL: 'https://safe-driver-api.herokuapp.com/api/Driver',
});

export default api;
