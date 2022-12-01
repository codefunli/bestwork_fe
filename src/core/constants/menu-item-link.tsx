import { UrlFeApp, MenuItem } from './common';

export type MenuItemLink = {
    id: number;
    name: string;
    link: string;
    iconNm: string;
};

const menuItemLinkData: MenuItemLink[] = [
    {
        id: 1,
        name: MenuItem.DASHBOARD,
        link: UrlFeApp.DASH_BOARD,
        iconNm: 'DashBoardIcon',
    },
    {
        id: 2,
        name: MenuItem.COMPANY,
        link: UrlFeApp.COMPANY.SEARCH,
        iconNm: 'CompanyIcon',
    },
    {
        id: 3,
        name: MenuItem.USER,
        link: UrlFeApp.USER.SEARCH,
        iconNm: 'UserIcon',
    },
    {
        id: 4,
        name: MenuItem.PROJECT,
        link: UrlFeApp.PROJECT.SEARCH,
        iconNm: 'ProjectIcon',
    },
    {
        id: 5,
        name: MenuItem.CONSTRUCTION,
        link: UrlFeApp.CONSTRUCTION.SEARCH,
        iconNm: 'ConstructionIcon',
    },
    {
        id: 6,
        name: MenuItem.ROLE,
        link: UrlFeApp.ROLE.INDEX,
        iconNm: 'RoleIcon',
    },
];

export default menuItemLinkData;
