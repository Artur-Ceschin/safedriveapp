import axios from 'axios';

export const driverApi = axios.create({
  baseURL: 'https://safe-driver-api.herokuapp.com/api/Driver',
});

export const loginApi = axios.create({
  baseURL: 'https://safe-driver-api.herokuapp.com/api/Login',
});
