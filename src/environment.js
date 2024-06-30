const API_URL = import.meta.env.PROD ? import.meta.env.VITE_APP_PROD_API_URL : import.meta.env.VITE_APP_LOCAL_API_URL;

export default API_URL;
