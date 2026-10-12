import axios from "axios";

console.log(process.env.REACT_APP_SERVER,66666);


const instance = axios.create({
  baseURL:
    process.env.REACT_APP_SERVER === "prelive"
      ? process.env.REACT_APP_GORC_BASE_URL_API
      : process.env.REACT_APP_BASE_URL_API
});


instance.interceptors.request.use((config) => {
  const lang = localStorage.getItem("lang") || "am";
  const token = localStorage.getItem("token") || null;

  config.headers = {
    Authorization: `Bearer ${token}`,
    "Accept-Language": lang,
    ...(config.headers || {})
  };

  return config;
});

export default instance;
