import axios from 'axios';
import { createContext, useEffect, useMemo, useState } from 'react';
import { AuthContextType } from '../types/common .types';
import { FCC } from '../types/global-types';
import { deleteTokenOnHttpHeader, setTokenOnHttpHeader } from '../services/network.service';

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
            setTokenOnHttpHeader(token);
            localStorage.setItem('token', token);
        } else {
            deleteTokenOnHttpHeader();
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
