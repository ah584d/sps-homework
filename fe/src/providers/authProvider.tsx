import axios from 'axios';
import { createContext, useEffect, useMemo, useState } from 'react';
import { AuthContextType } from '../types/common .types';
import { FCC } from '../types/global-types';

export const AuthContext = createContext<AuthContextType>({
    token: null,
    setToken: () => {},
});

interface AuthProviderProps {}

export const AuthProvider: FCC<AuthProviderProps> = ({ children }) => {
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

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};
