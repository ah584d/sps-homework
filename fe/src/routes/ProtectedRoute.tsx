import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';

export const ProtectedRoute = (): ReactElement => {
    const { token } = useAuth();

    if (!token || token.length === 0) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
};
