import axios from 'axios';
const token = localStorage.getItem('CurrentUserToken');
const http_create = axios.create({
    baseURL: 'https://dae-server.vercel.app/api/v1',
    headers: {
        Authorization: `Bearer ${token}`,
    },
});

http_create.interceptors.request.use(
    (config) => {
        // if (typeof window !== 'undefined') {
        const token = localStorage.getItem('CurrentUserToken');
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        // }
        return config;
    },
    (error) => {
        console.log(error)
        return Promise.reject(error);
    }
);

const http = {
    get: http_create.get,
    post: http_create.post,
    put: http_create.put,
    delete: http_create.delete,
};
export default http;
