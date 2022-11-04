import { UrlFeApp, MenuItem } from './common';

export type MenuItemLink = {
    name: string;
    link: string;
    iconNm: string;
};

const menuItemLinkData: MenuItemLink[] = [
    {
        name: MenuItem.DASHBOARD,
        link: UrlFeApp.DASH_BOARD,
        iconNm: 'DashBoardIcon',
    },
    {
        name: MenuItem.COMPANY,
        link: UrlFeApp.COMPANY.SEARCH,
        iconNm: 'CompanyIcon',
    },
    {
        name: MenuItem.USER,
        link: UrlFeApp.USER.SEARCH,
        iconNm: 'UserIcon',
    },
    {
        name: MenuItem.PROJECT,
        link: UrlFeApp.PROJECT.SEARCH,
        iconNm: 'ProjectIcon',
    },
    {
        name: MenuItem.ROLE,
        link: UrlFeApp.ROLE.INDEX,
        iconNm: 'RoleIcon',
    },
];

export default menuItemLinkData;
