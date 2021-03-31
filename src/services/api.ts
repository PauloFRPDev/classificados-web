import axios from 'axios';

const api =
  process.env.NODE_ENV === 'development'
    ? axios.create({
        baseURL: 'http://localhost:3333/',
      })
    : axios.create({
        baseURL: 'https://classificados.cro-rj.org.br/',
      });

export default api;