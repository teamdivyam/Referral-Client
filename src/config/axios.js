import axios from "axios";
import { API_URL, API_URL_TEST } from "../lib/constant";

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // Set a reasonable timeout (10s)
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: "include"
});


export default api;

