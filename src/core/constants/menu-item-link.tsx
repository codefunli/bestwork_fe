import { UrlFeApp } from './common';

export type MenuItemLink = {
    name: string;
    link: string;
    iconNm: string;
};

const menuItemLinkData: MenuItemLink[] = [
    {
        name: 'menu.dashboard',
        link: UrlFeApp.DASH_BOARD,
        iconNm: 'DashBoardIcon',
    },
    {
        name: 'menu.company',
        link: UrlFeApp.COMPANY.SEARCH,
        iconNm: 'CompanyIcon',
    },
    {
        name: 'menu.user',
        link: UrlFeApp.USER.SEARCH,
        iconNm: 'UserIcon',
    },
    {
        name: 'menu.project',
        link: UrlFeApp.PROJECT.SEARCH,
        iconNm: 'ProjectIcon',
    },
    {
        name: 'menu.role',
        link: UrlFeApp.ROLE.INDEX,
        iconNm: 'RoleIcon',
    },
];

export default menuItemLinkData;
