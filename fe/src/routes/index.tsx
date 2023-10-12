import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useAuth } from '../common/hooks/auth.hook';
import { ProtectedRoute } from './ProtectedRoute';
import Login from '../pages/login';
import Logout from '../pages/logout';

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
                    element: <div>User Home Page</div>,
                },
                {
                    path: '/profile',
                    element: <div>User Profile</div>,
                },
                {
                    path: '/logout',
                    element: <Logout/>,
                },
            ],
        },
    ];

    // Define routes accessible only to non-authenticated users
    const routesForNotAuthenticatedOnly = [
        {
            path: '/',
            element: <div>Home Page</div>,
        },
        {
            path: '/login',
            element: <Login/>,
        },
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