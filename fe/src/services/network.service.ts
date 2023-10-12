import axios from 'axios';

export const setTokenOnHttpHeader = (token: string): void => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export const deleteTokenOnHttpHeader = (): void => {
    delete axios.defaults.headers.common['Authorization'];
};

export { axios as networkManager };
