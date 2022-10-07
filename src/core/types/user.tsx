import { HeadColumn } from './base';

export enum RoleUser {
    SYS_ADMIN = 'SYS_ADMIN',
    ORG_ADMIN = 'ADMIN',
    ORG_USER = 'USER',
}

export type UserInfoRes = {
    id: number;
    userId: string;
    current_org_id: number;
    user_nm: string;
    role: RoleUser;
    email: string;
    first_nm: string;
    last_nm: string;
    is_deleted: boolean;
    created_dt: string;
    created_prg_id: string;
    updated_dt: string;
    updated_prg_id: string;
};

export const headUserCol: HeadColumn[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'user_nm',
        numeric: false,
        disablePadding: false,
        label: 'User Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: false,
        label: 'Address',
    },
    {
        id: 'first_name',
        numeric: false,
        disablePadding: false,
        label: 'First Name',
    },
    // {
    //   id: 'telNo',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Tel-No',
    // },
    // {
    //   id: 'status',
    //   numeric: false,
    //   disablePadding: false,
    //   label: 'Status',
    // },
];
