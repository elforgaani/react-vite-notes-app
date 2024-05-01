import axios from "axios";
import { endPoints } from "./apiEndpoints";
const instance = axios.create({
  baseURL: endPoints._baseUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
export default instance;
