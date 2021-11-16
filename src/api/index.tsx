import axios from "axios";

const httpClient  = axios.create({
  baseURL: 'https://backend-wallet.aegirwallet.org/api/v1.0',
});

export {
  httpClient
};