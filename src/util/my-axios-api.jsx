import axios from "axios";
// Creating a custom axios instance
const apiClient = axios.create({
  baseURL: "https://my-backend-project-bc-news.onrender.com",
  timeout: 1000,
});
export default apiClient;
