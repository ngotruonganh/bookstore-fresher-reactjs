import axios from "./Axios.jsx";

const getAllUser = (query) => {
    return axios.get(query);
}

const createUser = (fullName, password, email, phone) => {
    return axios.post('/api/v1/user', {fullName, password, email, phone});
}

const updateUser = (_id, fullName, phone) => {
    return axios.put('/api/v1/user', {_id, fullName, phone});
}

const deleteUser = (id) => {
    return axios.delete(`/api/v1/user/${id}`);
}

export {getAllUser, createUser, updateUser, deleteUser}