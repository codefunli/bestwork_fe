import { HeadColumn } from './base';

export enum RoleUser {
    SYS_ADMIN = 'SYS_ADMIN',
    ORG_ADMIN = 'ADMIN',
    ORG_USER = 'USER',
}

export const headUserCol: HeadColumn[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'userName',
        numeric: false,
        disablePadding: false,
        label: 'user.table.userName',
    },
    {
        id: 'uEmail',
        numeric: false,
        disablePadding: false,
        label: 'user.table.email',
    },
    {
        id: 'firstName',
        numeric: false,
        disablePadding: false,
        label: 'user.table.firstName',
    },
    {
        id: 'lastName',
        numeric: false,
        disablePadding: false,
        label: 'user.table.lastName',
    },
    {
        id: 'uTelNo',
        numeric: false,
        disablePadding: false,
        label: 'user.table.telNo',
    },
    {
        id: 'enabled',
        numeric: false,
        disablePadding: false,
        label: 'user.table.status',
    },
];
