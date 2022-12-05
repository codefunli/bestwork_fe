import { HeadColumn } from './base';

export const headNotiCol: HeadColumn[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'id',
    },
    {
        id: 'title',
        numeric: false,
        disablePadding: false,
        label: 'notification.table.colTitle',
    },
    {
        id: 'content',
        numeric: false,
        disablePadding: false,
        label: 'notification.table.colContent',
    },
    {
        id: 'createDate',
        numeric: false,
        disablePadding: false,
        label: 'notification.table.colCreateDate',
    },
    {
        id: 'read',
        numeric: false,
        disablePadding: false,
        label: 'notification.table.colRead',
    },
];
