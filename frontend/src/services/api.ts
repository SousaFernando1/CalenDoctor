import axios from 'axios';
import { setupInterceptors } from './interceptors';

const { VITE_BACKEND_URL } = import.meta.env;

const backend = setupInterceptors(
  axios.create({
    baseURL: VITE_BACKEND_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  }),
);

const backendPublic = axios.create({
  baseURL: VITE_BACKEND_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const api = {
  backend,
  backendPublic,
};
