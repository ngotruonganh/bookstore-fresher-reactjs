import axios from "./Axios.jsx";

const getAllUser = (query) => {
    return axios.get(query);
}

export {getAllUser}