import axios from "./Axios.jsx";

const getAllUser = (query) => {
    return axios.get(query);
}

const deleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}

export {getAllUser, deleteUser}