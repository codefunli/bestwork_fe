import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from "react-router-dom";

import CompanyEdit from '../ui/company/company-edit';
import AuthComponent from '../components/auth-component';

const Login = lazy(() => import('../ui/login/login'));
const MainApp = lazy(() => import('../components/main-app-component'));
const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const CompanyRegister = lazy(() => import('../ui/company/company-register'));
const CompanySearch = lazy(() => import('../ui/company/company-search'));
const UserSearch = lazy(() => import('../ui/user/user-search'));

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
                path: UrlFeApp.COMPANY.SEACH,
                element: <CompanySearch />,
            },
            {
                path: UrlFeApp.COMPANY.CREATE,
                element: <CompanyRegister />,
            },
            {
                path:UrlFeApp.COMPANY.EDIT_HAS_ID,
                element: <CompanyEdit />,
            },
            {
                path:UrlFeApp.USER.SEACH,
                element: <UserSearch />,
            }
        ],
    },
    {
        path: '/',
        element: <AuthComponent/>,
        children: [
            {
                path: UrlFeApp.LOGIN_URL,
                element: <Login />,
            }
        ],
    },
]
export default function RenderRouter() {
	let element = useRoutes(listRouter);
	return element;
}