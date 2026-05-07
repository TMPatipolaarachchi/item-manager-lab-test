import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

const itemApi = axios.create({
  baseURL: `${API_BASE_URL}/api/items`
});

export default itemApi;
