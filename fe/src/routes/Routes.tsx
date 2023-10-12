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
            path: '/service',
            element: <div>Service Page</div>,
        },
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
                    path: '/profile',
                    element: <Home />,
                },
                {
                    path: '/logout',
                    element: <Logout />,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <Login />,
        },
        // {
        //     path: '/login',
        //     element: <Login />,
        // },
    ];

    // Combine and conditionally include routes based on authentication status
    const router = createBrowserRouter([
        ...routesForPublic,
        ...(!token ? routesForNotAuthenticatedOnly : []),
        ...routesForAuthenticatedOnly,
    ]);

    // Provide the router configuration using RouterProvider
    return <RouterProvider router={router} />;
};

export default Routes;
