import axios from "./Axios.jsx";

const getAllBooks = (query) => {
    return axios.get(query);
}

const deleteBook = (id) => {
    return axios.delete(`/api/v1/book/${id}`);
}

export {getAllBooks, deleteBook}