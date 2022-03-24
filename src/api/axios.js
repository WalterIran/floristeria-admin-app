import { API_URL } from '@env';
import axios from 'axios';

const BASE_URL = `${API_URL}/api/v1`;

export default axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
});

export const axiosPrivate = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
});