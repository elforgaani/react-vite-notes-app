
import { createBrowserRouter, RouteObject } from "react-router-dom";

import { Home, NotFound, SignIn, SignUp } from "../pages";
import { AuthLayout, MainLayout } from "../layouts";


export const paths = {
    signUp: '/sign-up',
    signIn: '/sign-in',
    home: '/',
    notFound: '*'
};

const routes: RouteObject[] = [
    {
        path: "", element: <MainLayout />, children: [
            { path: paths.home, element: <Home /> }
        ]
    },
    {
        path: "", element: <AuthLayout />, children: [
            { path: paths.signUp, element: <SignUp /> },
            { path: paths.signIn, element: <SignIn /> }
        ]
    },
    {
        path: paths.notFound, element: <NotFound />
    }
];

export const router = createBrowserRouter(routes);

export default router;
