import axios from "axios";

export const API_URL = "http://192.168.31.50:8000/api/v1";

export const $api = axios.create({
  baseURL: API_URL + "/",
});
