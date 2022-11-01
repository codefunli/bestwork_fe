import { HeadColumn } from './base';

export const headCompanyCol: HeadColumn[] = [
    {
        id: 'id',
        numeric: false,
        disablePadding: false,
        label: 'Id',
    },
    {
        id: 'companyName',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpName',
    },
    {
        id: 'cpEmail',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpEmail',
    },
    {
        id: 'startDate',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpStartDate',
    },
    {
        id: 'expiredDate',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpExpiredtDate',
    },
    {
        id: 'status',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpExpired',
    },
];
