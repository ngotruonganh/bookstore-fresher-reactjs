import axios from "./Axios";

const login = (username, password) => {
    return axios.post("/api/v1/auth/login", {username, password});
}

const register  = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", {fullName, email, password, phone});
}

const callFetchAccount  = () => {
    return axios.get("/api/v1/auth/account");
}

const getAllUser = (current, pageSize) => {
    return axios.get(`/api/v1/user?current=${current}&pageSize=${pageSize}`);
}

export {login, register, callFetchAccount, getAllUser};