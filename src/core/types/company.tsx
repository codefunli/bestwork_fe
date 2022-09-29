import { HeadColumn } from "./base";

export const headCompanyCol: HeadColumn[] = [
	{
		id: 'id',
		numeric: false,
		disablePadding: false,
		label: 'Id',
    },
    {
		id: 'name',
		numeric: false,
		disablePadding: false,
		label: 'company.table.colCpName',
    },
    {
		id: 'address1',
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