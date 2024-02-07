import axios from 'axios';

const http_create = axios.create({
    baseURL: 'http://localhost:5000/api/v1',
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
});

// http_create.interceptors.request.use(
//     (config) => {
//         if (typeof window !== 'undefined') {
//             const token = localStorage.getItem('token');
//             const userId = localStorage.getItem('localid');
//             if (token) {
//                 config.headers.authorization = `Bearer ${token}`;
//             }
//             if (userId) {
//                 config.headers['user-id'] = userId;
//             }
//         }
//         return config;
//     },
//     (error) => {
//         console.log(error)
//         return Promise.reject(error);
//     }
// );

const http = {
    get: http_create.get,
    post: http_create.post,
    put: http_create.put,
    delete: http_create.delete,
};


export default http;