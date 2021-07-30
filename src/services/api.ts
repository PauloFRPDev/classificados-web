import axios from 'axios';

const api =
  process.env.NODE_ENV === 'development'
    ? axios.create({
        baseURL: process.env.REACT_APP_API_URL,
      })
    : axios.create({
        baseURL: process.env.REACT_APP_API_URL_PRODUCTION,
      });

export default api;
