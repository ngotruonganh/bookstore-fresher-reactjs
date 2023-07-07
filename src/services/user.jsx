import axios from "./Axios.jsx";

const getAllUser = (query) => {
    return axios.get(query);
}

const getCategories = () => {
    return axios.get('/api/v1/database/category');
}

const getBookById = (id) => {
    return axios.get(`/api/v1/book/${id}`);
}

const checkout = (item) => {
    return axios.post('/api/v1/order', {...item});
}

const getHistoryOrder = (query) => {
    return axios.get(query);
}

export {getAllUser, getHistoryOrder, checkout, getCategories, getBookById}