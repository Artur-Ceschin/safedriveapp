import axios from 'axios';

export const homeApi = axios.create({
  baseURL: 'https://safe-driver-api.herokuapp.com/api/Driver',
});

export const profileApi = axios.create({
  baseURL: 'https://safe-driver-api.herokuapp.com/api/Driver',
});
