import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';

import CompanyEdit from '../ui/company/company-edit';
import AuthComponent from '../components/auth-component';
import ProjectEdit from '../ui/project/project-edit';

const Login = lazy(() => import('../ui/login/login'));
const MainApp = lazy(() => import('../components/main-app-component'));
const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const CompanyRegister = lazy(() => import('../ui/company/company-register'));
const CompanySearch = lazy(() => import('../ui/company/company-search'));
const UserSearch = lazy(() => import('../ui/user/user-search'));
const UserInfo = lazy(() => import('../ui/user/user-info'));
const UserCreate = lazy(() => import('../ui/user/user-create'));
const ProjectSearch = lazy(() => import('../ui/project/project-search'));
const Role = lazy(() => import('../ui/role/role'));
const Page404NotFound = lazy(() => import('../ui/error-page/404NotFound'));

const listRouter: RouteObject[] = [
    {
        path: UrlFeApp.MAIN_APP,
        element: <MainApp />,
        children: [
            {
                path: UrlFeApp.DASH_BOARD,
                element: <DashBoard />,
            },
            {
                path: UrlFeApp.COMPANY.SEARCH,
                element: <CompanySearch />,
            },
            {
                path: UrlFeApp.COMPANY.CREATE,
                element: <CompanyRegister />,
            },
            {
                path: UrlFeApp.COMPANY.EDIT_HAS_ID,
                element: <CompanyEdit />,
            },
            {
                path: UrlFeApp.USER.SEARCH,
                element: <UserSearch />,
            },
            {
                path: `${UrlFeApp.USER.INFO}/:userId`,
                element: <UserInfo />,
            },
            {
                path: UrlFeApp.USER.CREATE,
                element: <UserCreate />,
            },
            {
                path: UrlFeApp.PROJECT.SEARCH,
                element: <ProjectSearch />,
            },
            {
                path: UrlFeApp.PROJECT.EDIT_HAS_ID,
                element: <ProjectEdit />,
            },
            {
                path: UrlFeApp.ROLE.INDEX,
                element: <Role />,
            },
        ],
    },
    {
        path: '/',
        element: <AuthComponent />,
        children: [
            {
                path: UrlFeApp.LOGIN_URL,
                element: <Login />,
            },
        ],
    },
    {
        path: '/*',
        element: <Page404NotFound />,
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
