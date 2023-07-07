import axios from "./Axios.jsx";

const login = (username, password) => {
    return axios.post('/api/v1/auth/login', {username, password});
}

const logout = () => {
    return axios.post('/api/v1/auth/logout');
}

const register = (fullName, email, password, phone) => {
    return axios.post('/api/v1/user/register', {fullName, email, password, phone});
}

const callFetchAccount = () => {
    return axios.get('/api/v1/auth/account');
}

export {login, logout, register, callFetchAccount}