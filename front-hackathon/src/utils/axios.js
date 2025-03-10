import axios from 'axios';

// Create an instance of axios
const myAxios = axios.create({
    baseURL: 'http://localhost:3001/api', // Replace with your API base URL
    timeout: 1000,
});

// Request interceptor
myAxios.interceptors.request.use(
    config => {
        // Do something before request is sent
        // For example, add an authorization token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // Do something with request error
        return Promise.reject(error);
    }
);

// Response interceptor
myAxios.interceptors.response.use(
    response => {
        // Do something with response data
        if (response.data && response.data.token) {
            localStorage.setItem('token', response.data.token);
        }
        return response;
    },
    error => {
        // Do something with response error
        if (error.response.status === 401) {
            // Handle unauthorized error
            console.log('Unauthorized, logging out...');
            // Perform logout or redirect to login page
        }
        return Promise.reject(error);
    }
);

export default myAxios;