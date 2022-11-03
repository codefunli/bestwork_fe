import { UrlFeApp } from './common';

export type MenuItemLink = {
    name: string;
    link: string;
    iconNm: string;
};

const menuItemLinkData: MenuItemLink[] = [
    {
        name: 'DashBoard',
        link: UrlFeApp.DASH_BOARD,
        iconNm: 'DashBoardIcon',
    },
    {
        name: 'Company',
        link: UrlFeApp.COMPANY.SEARCH,
        iconNm: 'CompanyIcon',
    },
    {
        name: 'User',
        link: UrlFeApp.USER.SEARCH,
        iconNm: 'UserIcon',
    },
    {
        name: 'Project',
        link: UrlFeApp.PROJECT.SEARCH,
        iconNm: 'ProjectIcon',
    },
    {
        name: 'Role',
        link: UrlFeApp.ROLE.INDEX,
        iconNm: 'RoleIcon',
    },
];

export default menuItemLinkData;
