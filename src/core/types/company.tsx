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
        id: 'detailAddress',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpAddress',
    },
    {
        id: 'startDate',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpStartDate',
    },
    {
        id: 'expired',
        numeric: false,
        disablePadding: false,
        label: 'company.table.colCpExpired',
    },
];
