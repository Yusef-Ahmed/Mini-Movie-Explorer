import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: "Bearer " + import.meta.env.VITE_ACCESS_TOKEN_AUTH,
    accept: "application/json",
  },
});

export default api;
