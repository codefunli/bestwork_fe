import ModeEditIcon from '@mui/icons-material/ModeEdit';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import { Chip, IconButton, Tooltip } from '@mui/material';
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
import { FieldConstants } from '../../core/constants/common';
import { HeadColumn } from '../../core/types/base';
import { EnhancedTableHead, Order } from './table-columns';
import './table-data.scss';
import { EnhancedTableToolbar } from './table-toolbar';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import ManageHistorySharpIcon from '@mui/icons-material/ManageHistorySharp';

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
}

export default function EnhancedTable(props: EnhancedTable) {
    const { headCells, rows, isLoading, arrButton } = props;
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('id');
    const [selected, setSelected] = React.useState<readonly string[]>([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const { t } = useTranslation();

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

    const renderIcon = (iconFn: string) => {
        switch (iconFn) {
            case 'ModeEditIcon':
                return <ModeEditIcon />;
            case 'AddUser':
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
                                        {headCells != undefined &&
                                            headCells.map((colValue) => {
                                                return (
                                                    <TableCell
                                                        key={colValue.id}
                                                        padding="normal"
                                                        align="left"
                                                        hidden={colValue.id === FieldConstants.ID}
                                                    >
                                                        {colValue.id == 'startDate' || colValue.id == 'createDate' ? (
                                                            row[colValue.id as string].replace(/[TZ]/g, ' ')
                                                        ) : (colValue.id == 'expired' ||
                                                              colValue.id == 'enabled' ||
                                                              colValue.id == 'status') &&
                                                          colValue.label.includes('company') ? (
                                                            String(row[colValue.id as string]) == '0' ? (
                                                                <Chip
                                                                    sx={{ backgroundColor: green[400] }}
                                                                    className="btn btn-outline-success"
                                                                    label={t('button.btnActive')}
                                                                    size="small"
                                                                    icon={<CheckIcon color="success" />}
                                                                />
                                                            ) : (
                                                                <Chip
                                                                    label={t('button.btnPending')}
                                                                    size="small"
                                                                    className="btn btn-outline-secondary"
                                                                    icon={<CloseIcon />}
                                                                />
                                                            )
                                                        ) : colValue.id == 'projectType' ? (
                                                            row[colValue.id as string].name
                                                        ) : colValue.id == 'enable' &&
                                                          colValue.label.includes('user') ? (
                                                            row[colValue.id as string] === 1 ? (
                                                                t('user.search.enabled')
                                                            ) : (
                                                                t('user.search.notEnabled')
                                                            )
                                                        ) : (
                                                            row[colValue.id as string]
                                                        )}
                                                    </TableCell>
                                                );
                                            })}
                                        <TableCell padding="normal">
                                            {arrButton.map((arrBtn) => {
                                                return (
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
                                                                handlePropsEdit(event, row.id as string, arrBtn.acFn)
                                                            }
                                                        >
                                                            {renderIcon(arrBtn.iconFn)}
                                                        </IconButton>
                                                    </Tooltip>
                                                );
                                            })}
                                        </TableCell>
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
                                    {t('message.noData')}
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                {rows != undefined && rows.content != undefined && rows.content.length > 0 && (
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
