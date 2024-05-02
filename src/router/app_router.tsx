
import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Home, NotFound, SignIn, SignUp } from "../pages";
import { AuthLayout, MainLayout } from "../layouts";
import ProtectedRoute from "../components/common/ProtectedRoute";
import UnProtectedRoute from "../components/common/UnProtectedRoute";


export const paths = {
    signUp: '/sign-up',
    signIn: '/sign-in',
    home: '/',
    notFound: '*'
};

const routes: RouteObject[] = [
    {
        path: "", element: <MainLayout />, children: [
            { path: paths.home, element: <ProtectedRoute><Home /> </ProtectedRoute> }
        ]
    },
    {
        path: "", element: <AuthLayout />, children: [
            { path: paths.signUp, element: <UnProtectedRoute><SignUp /></UnProtectedRoute> },
            { path: paths.signIn, element: <UnProtectedRoute><SignIn /></UnProtectedRoute> }
        ]
    },
    {
        path: paths.notFound, element: <NotFound />
    }
];

export const router = createBrowserRouter(routes);

export default router;
