import axios from 'axios';

<<<<<<< HEAD
const BASE_URL = "http://192.168.1.11:5000/api/v1";
=======
const BASE_URL = "http://192.168.1.8:5000/api/v1";
>>>>>>> d5caac7a6feb0f8bdec82e624b8152318ab0de53

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});