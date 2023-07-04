import axios from "./Axios.jsx";

const login = (username, password) => {
    return axios.post('/api/v1/auth/login', {username, password});
}

const logout = () => {
    return axios.post('/api/v1/auth/logout');
}

const register  = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {fullName, email, password, phone});
}

const callFetchAccount  = () => {
    return axios.get('/api/v1/auth/account');
}

const getAllUser = (query) => {
    return axios.get(query);
}

const getAllBooks = (query) => {
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

export {
    login,
    register,
    callFetchAccount,
    getAllUser,
    getAllBooks,
    getCategories,
    getBookById,
    checkout,
    getHistoryOrder,
    logout
};