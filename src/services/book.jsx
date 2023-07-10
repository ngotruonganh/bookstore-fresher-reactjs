import axios from "./Axios.jsx";

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

const createBook = (thumbnail, slider, mainText, author, price, sold, quantity, category) => {
    return axios.post('/api/v1/book', {thumbnail, slider, mainText, author, price, sold, quantity, category} );
}

const deleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`);
}

export {
    getAllBooks,
    deleteBook,
    getBookById,
    getCategories,
    getHistoryOrder,
    checkout,
    createBook,
}