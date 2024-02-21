import axios from 'axios';

export default axios.create({
    baseURL:process.env.REACT_APP_SERVER_URL
});

export const axiosPrivate = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
})