import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Logout from '../pages/Logout';
import { ProtectedRoute } from './ProtectedRoute';

const Routes = () => {
    const { token } = useAuth();

    const routesForPublic = [
        {
            path: '/about-us',
            element: <div>About Us</div>,
        },
    ];

    const routesForAuthenticatedOnly = [
        {
            path: '/',
            element: <ProtectedRoute />,
            children: [
                {
                    path: '/',
                    element: <Login />,
                },
                {
                    path: '/profile/:userId',
                    element: <Home />,
                },
                {
                    path: '/logout',
                    element: <Logout />,
                },
            ],
        },
    ];

    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <Login />,
        },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    return <RouterProvider router={router} />;
};

export default Routes;
