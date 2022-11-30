import { lazy } from 'react';
import { UrlFeApp } from '../core/constants/common';
import { RouteObject, useRoutes } from 'react-router-dom';
import ProgressDetail from '../ui/construction/progress/progress-detail';

const AuthComponent = lazy(() => import('../components/auth-component'));
const Login = lazy(() => import('../ui/login/login'));
const MainApp = lazy(() => import('../components/main-app-component'));
const DashBoard = lazy(() => import('../ui/dashboard/dashboard'));
const CompanyRegister = lazy(() => import('../ui/company/company-register'));
const CompanySearch = lazy(() => import('../ui/company/company-search'));
const CompanyEdit = lazy(() => import('../ui/company/company-edit'));
const UserSearch = lazy(() => import('../ui/user/user-search'));
const UserInfo = lazy(() => import('../ui/user/user-info'));
const UserCreate = lazy(() => import('../ui/user/user-create'));
const ProjectSearch = lazy(() => import('../ui/project/project-search'));
const ProjectEdit = lazy(() => import('../ui/project/project-edit'));
const ProjectDetail = lazy(() => import('../ui/project/project-detail'));
const Role = lazy(() => import('../ui/role/role'));
const Page404NotFound = lazy(() => import('../ui/error-page/404NotFound'));
const ProjectRegister = lazy(() => import('../ui/project/project-register'));
const ForgotPassword = lazy(() => import('../ui/forgot-password/forgot-password'));
const ResetPassword = lazy(() => import('../ui/forgot-password/reset-password'));
const ConstructionSearch = lazy(() => import('../ui/construction/construction-search'));
const ConstructionRegister = lazy(() => import('../ui/construction/construction-register'));
const ConstructionEdit = lazy(() => import('../ui/construction/construction-edit'));
const AirWayBillList = lazy(() => import('../ui/awb/awb-list'));

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
                path: UrlFeApp.USER.CREATE_WITH_COMPANY_ID,
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
            {
                path: UrlFeApp.PROJECT.CREATE,
                element: <ProjectRegister />,
            },
            {
                path: UrlFeApp.AWB.LIST,
                element: <AirWayBillList />,
            },
            {
                path: UrlFeApp.AWB.LIST_HAS_ID,
                element: <AirWayBillList />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.SEARCH,
                element: <ConstructionSearch />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.CREATE,
                element: <ConstructionRegister />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.CREATE_HAS_ID,
                element: <ConstructionRegister />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.EDIT_HAS_ID,
                element: <ConstructionEdit />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.DETAIL,
                element: <ConstructionEdit />,
            },
            {
                path: UrlFeApp.CONSTRUCTION.DETAIL_HAS_ID,
                element: <ProgressDetail />,
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
    {
        path: UrlFeApp.FORGOT_PASSWORD.FORGOT,
        element: <ForgotPassword />,
    },
    {
        path: `${UrlFeApp.FORGOT_PASSWORD.RESET}/:token`,
        element: <ResetPassword />,
    },
];
export default function RenderRouter() {
    let element = useRoutes(listRouter);
    return element;
}
