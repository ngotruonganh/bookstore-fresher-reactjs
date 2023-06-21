import axios from "./Axios";

const login = (username, password) => {
    return axios.post("/api/v1/auth/login", {username, password});
}

const register  = (fullName, email, password, phone) => {
    return axios.post("/api/v1/user/register", {fullName, email, password, phone});
}

export {login, register};