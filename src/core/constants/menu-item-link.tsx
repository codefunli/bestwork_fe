import { UrlFeApp } from './common';

export type MenuItemLink = {
    name: string;
    link: string;
};

const menuItemLinkData: MenuItemLink[] = [
    {
        name: 'DashBoard',
        link: UrlFeApp.DASH_BOARD,
    },
    {
        name: "Company",
        link: UrlFeApp.COMPANY.SEARCH
    },
    {
        name: "User",
        link: UrlFeApp.USER.SEARCH
    }
]

export default menuItemLinkData;
