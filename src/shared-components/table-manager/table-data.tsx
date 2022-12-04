import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import { Chip, IconButton, Stack, Tooltip } from '@mui/material';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { FieldConstants, Item } from '../../core/constants/common';
import { HeadColumn } from '../../core/types/base';
import { EnhancedTableHead, Order } from './table-columns';
import './table-data.scss';
import { EnhancedTableToolbar } from './table-toolbar';
import { formatDateTimeResList } from '../../core/utils/get-current-datetime';
import HandleProjectStatus from '../status-handle/project-status-handle';
import HandleCompanyStatus from '../status-handle/company-status-handle';
import HandleUserStatus from '../status-handle/user-status-handle';
import HandleConstructionStatus from '../status-handle/construction-status-handle';
import { Permission } from '../../core/types/permission';

export interface ArrayAction {
    nameFn: string;
    acFn: (object1: any, object2: any) => void;
    iconFn: string;
}

interface EnhancedTable {
    headCells?: HeadColumn[];
    rows?: any;
    isLoading: boolean;
    arrButton: ArrayAction[];
    searchCallBack: Function;
    deleteCallBack: Function;
    statusList?: any;
    permission?: Permission;
}

export default function EnhancedTable(props: EnhancedTable) {
    const { headCells, rows, isLoading, arrButton, statusList, permission } = props;
    const { t } = useTranslation();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('id');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    React.useEffect(() => {
        setSelected([]);
    }, [rows]);

    React.useEffect(() => {
        props.searchCallBack({
            page: page,
            size: rowsPerPage,
            sortDirection: order.toUpperCase(),
            sortBy: orderBy,
        });
    }, [rowsPerPage, page, orderBy, order]);

    const handleSortCallBack = (dataChild: string) => {
        setOrderBy(dataChild);
        if (order == 'asc') {
            setOrder('desc');
        } else {
            setOrder('asc');
        }
    };

    const handleDeleteRecordBySelected = () => {
        props.deleteCallBack({
            ids: selected,
        });
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelected = rows.content.map((n: any) => n.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: readonly string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const isSelected = (name: string) => {
        return selected.indexOf(name) !== -1 ? true : false;
    };

    const handlePropsEdit = (event: any, id: any, func: any) => {
        func(event, id);
    };

    const handleArrayValue = (data: any) => {
        return (
            <Stack direction="column" spacing={1}>
                {data &&
                    data.length > 0 &&
                    data.map((el: any) => {
                        return <Chip key={el.id} label={el.code} color="info" size="small" variant="outlined" />;
                    })}
            </Stack>
        );
    };

    const renderIcon = (iconFn: string) => {
        switch (iconFn) {
            case Item.ICON_BTN.MODE_EDIT_ICON:
                return <ModeEditIcon />;
            case Item.ICON_BTN.MODE_ADD_USER_ICON:
                return <PersonAddAlt1Icon />;
            case 'AddMaterialStatus':
                return <PostAddSharpIcon />;
            case 'AddProjectDetail':
                return <ManageHistorySharpIcon />;
            default:
                break;
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2, overflow: 'auto' }}>
                <EnhancedTableToolbar
                    numSelected={selected.length}
                    deleteRecordBySelected={handleDeleteRecordBySelected}
                />
                <TableContainer>
                    <Table
                        style={{
                            minWidth: 1200,
                        }}
                        stickyHeader
                        sx={{ minWidth: 400 }}
                        aria-labelledby="tableTitle"
                        size={'medium'}
                    >
                        <EnhancedTableHead
                            sortCallBack={handleSortCallBack}
                            numSelected={selected.length}
                            order={order}
                            orderBy={orderBy}
                            rowCount={rows.content.length}
                            headCells={headCells !== undefined ? headCells : []}
                            onSelectAllProps={handleSelectAllClick}
                            permission={permission}
                            hasNoAction={arrButton.length <= 0}
                        />
                        <TableBody>
                            {rows.content.map((row: any, index: any) => {
                                const isItemSelected = isSelected(row.id as string);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id as string}
                                        selected={isItemSelected}
                                    >
                                        {permission && permission.canDelete && (
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    onClick={(event) => handleClick(event, row.id as string)}
                                                />
                                            </TableCell>
                                        )}
                                        {headCells !== undefined &&
                                            headCells.map((colValue) => {
                                                return (
                                                    <TableCell
                                                        key={colValue.id}
                                                        padding="normal"
                                                        align="left"
                                                        hidden={colValue.id === FieldConstants.ID}
                                                    >
                                                        {colValue.id === 'startDate' ||
                                                        colValue.id === 'endDate' ||
                                                        colValue.id === 'createDate' ||
                                                        colValue.id === 'expiredDate' ? (
                                                            formatDateTimeResList(row[colValue.id])
                                                        ) : colValue.id === 'expired' ||
                                                          colValue.id === 'enabled' ||
                                                          colValue.id === 'status' ? (
                                                            colValue.label.includes('company') ? (
                                                                <HandleCompanyStatus
                                                                    statusId={row[colValue.id] as string}
                                                                />
                                                            ) : colValue.label.includes('project') ? (
                                                                <HandleProjectStatus
                                                                    statusList={
                                                                        statusList && statusList.length > 0
                                                                            ? statusList
                                                                            : []
                                                                    }
                                                                    statusId={row[colValue.id]}
                                                                />
                                                            ) : colValue.label.includes('user') ? (
                                                                <HandleUserStatus
                                                                    statusId={row[colValue.id] as string}
                                                                />
                                                            ) : colValue.label.includes('construction') ? (
                                                                <HandleConstructionStatus
                                                                    statusList={
                                                                        statusList && statusList.length > 0
                                                                            ? statusList
                                                                            : []
                                                                    }
                                                                    statusId={row[colValue.id] as string}
                                                                />
                                                            ) : (
                                                                ''
                                                            )
                                                        ) : colValue.id === 'projectType' ? (
                                                            row[colValue.id as string].name
                                                        ) : colValue.id === 'enabled' &&
                                                          colValue.label.includes('user') ? (
                                                            row[colValue.id as string] === 1 ? (
                                                                t('user.search.enabled')
                                                            ) : (
                                                                t('user.search.notEnabled')
                                                            )
                                                        ) : colValue.id === 'awbCodes' ? (
                                                            handleArrayValue(row[colValue.id as string])
                                                        ) : (
                                                            row[colValue.id as string]
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        {arrButton && arrButton.length > 0 && (
                                            <TableCell padding="normal">
                                                {arrButton.map((arrBtn) => {
                                                    return permission &&
                                                        !permission.canEdit &&
                                                        arrBtn.nameFn === 'Edit' ? (
                                                        <Tooltip
                                                            key={arrBtn.nameFn}
                                                            title={arrBtn.nameFn}
                                                            placement="top-start"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                aria-label="add to shopping cart"
                                                                disabled
                                                            >
                                                                {renderIcon(arrBtn.iconFn)}
                                                            </IconButton>
                                                        </Tooltip>
                                                    ) : (
                                                        <Tooltip
                                                            key={arrBtn.nameFn}
                                                            title={arrBtn.nameFn}
                                                            placement="top-start"
                                                        >
                                                            <IconButton
                                                                size="small"
                                                                color="primary"
                                                                aria-label="add to shopping cart"
                                                                onClick={(event) =>
                                                                    handlePropsEdit(
                                                                        event,
                                                                        row.id as string,
                                                                        arrBtn.acFn,
                                                                    )
                                                                }
                                                            >
                                                                {renderIcon(arrBtn.iconFn)}
                                                            </IconButton>
                                                        </Tooltip>
                                                    );
                                                })}
                                            </TableCell>
                                        )}
                                    </TableRow>
                                );
                            })}
                            {rows.content.length === 0 && (
                                <TableRow
                                    className="table-row"
                                    sx={{
                                        m: 3,
                                        minWidth: 300,
                                    }}
                                >
                                    <td>{t('message.noData')}</td>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rows !== undefined && rows.content !== undefined && rows.content.length > 0 && (
                    <TablePagination
                        rowsPerPageOptions={[5, 10]}
                        component="div"
                        count={rows.metaData.totalElements}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        labelRowsPerPage={t('message.rowsPerPage')}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                )}
            </Paper>
        </Box>
    );
}
