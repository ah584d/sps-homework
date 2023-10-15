import axios from 'axios';

export const initAxios = (): void => {
    axios.defaults.baseURL = 'http://localhost:3001';
};

export const setTokenOnHttpHeader = (token: string): void => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
//     axios.interceptors.request.use(
//         (request) => console.log(request)
//     );
};

export const deleteTokenOnHttpHeader = (): void => {
    delete axios.defaults.headers.common['Authorization'];
};

export { axios as networkManager };
