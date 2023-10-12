import axios from 'axios';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { FCC } from '../types/global-types';

const AuthContext = createContext({});

const AuthProvider: FCC<{}> = ({ children }) => {
    // State to hold the authentication token
    const [token, setToken_] = useState(localStorage.getItem('token'));

    const setToken = (newToken: string) => {
        setToken_(newToken);
    };

    useEffect(() => {
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
            localStorage.setItem('token', token);
        } else {
            delete axios.defaults.headers.common['Authorization'];
            localStorage.removeItem('token');
        }
    }, [token]);

    const contextValue = useMemo(
        () => ({
            token,
            setToken,
        }),
        [token],
    );

    return <AuthContext.Provider value={contextValue}>{hildren}</AuthContext.Provider>;
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;
