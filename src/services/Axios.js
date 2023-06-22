import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_URL;

const instance = axios.create({
    baseURL: baseURL,
    //refresh token
    withCredentials: true
});

instance.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('access_token')}`}

export default instance;