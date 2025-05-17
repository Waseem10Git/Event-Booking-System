import axios from "./axios";

const register = data => axios.post("/auth/register", data);
const login = data => axios.post("/auth/login", data);
const logout = () => axios.post("/auth/logout");

const authApis = { register, login, logout };
export default authApis; 