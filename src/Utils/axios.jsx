
import axios from "axios";

const apiKey = import.meta.env.VITE_TMDB_API_KEY;

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
});


instance.interceptors.request.use((config) => {
  config.params = {
    ...config.params,
    api_key: apiKey,
  };
  return config;
});

export default instance;