import axios from "axios";

const httpClient  = axios.create({
  // baseURL: 'http://localhost:3000/api/v1.0',
  baseURL: 'https://hydro.gallbers.uy/api/v1.0',
});

export {
  httpClient
};