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
        id: 'firstNm',
        numeric: false,
        disablePadding: false,
        label: 'user.table.firstName',
    },
    {
        id: 'lastNm',
        numeric: false,
        disablePadding: false,
        label: 'user.table.lastName',
    },
    {
        id: 'uTelNo',
        numeric: false,
        disablePadding: false,
        label: 'user.table.telNo',
    }
];
