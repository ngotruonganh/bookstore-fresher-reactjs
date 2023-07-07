import axios from "./Axios.jsx";

const getDashboard = () => {
    return axios.get('/api/v1/database/dashboard');
}

export {
    getDashboard,
};