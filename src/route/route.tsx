import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from "react-router-dom";
import AuthComponent from '../ui/login/auth-component';

const Login = lazy(() => import('../ui/login/login'));
const MainApp = lazy(() => import('../components/main-app-component'));
const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const Company = lazy(() => import('../ui/company/company'));

const listRouter : RouteObject[] = [
    {
        path: UrlFeApp.MAIN_APP,
        element: <MainApp/>,
        children: [
            {
                path: UrlFeApp.DASH_BOARD,
                element: <DashBoard />,
            },
            {
                path: UrlFeApp.COMPANY,
                element: <Company />,
            }
        ],
    },
    {
        path: '/',
        element: <AuthComponent />,
        children: [
            {
                path: UrlFeApp.LOGIN_URL,
                element:     <Login />,
            }
        ],
    }
]
export default function RenderRouter() {
	let element = useRoutes(listRouter);
	return element;
}