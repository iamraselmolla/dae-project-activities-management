// http_instance.js
import axios from 'axios';
import { useContext } from 'react';
import { AuthContext } from '../components/AuthContext/AuthProvider';

const HttpInstance = (baseUrl) => {
    const { jwtToken } = useContext(AuthContext);

    const http = axios.create({
        baseURL: baseUrl,
    });

    http.interceptors.request.use(function (config) {
        if (jwtToken) {
            config.headers.Authorization = `Bearer ${jwtToken}`;
        }
        return config;
    }, function (error) {
        return Promise.reject(error);
    });

    return http;
};

export default HttpInstance;
