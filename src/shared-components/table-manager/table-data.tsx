import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { IconButton, Tooltip } from '@mui/material';
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
import { useEffect } from 'react';
import { FieldConstants } from '../../core/constants/common';
import { HeadColumn } from '../../core/types/base';
import { EnhancedTableHead, Order } from './table-columns';
import { EnhancedTableToolbar } from './table-toolbar';
import DeleteIcon from '@mui/icons-material/Delete';

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator<Key extends keyof any>(
  order: Order,
  orderBy: Key,
): (
  a: { [key in Key]: number | string },
  b: { [key in Key]: number | string },
) => number {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
  const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

export interface ArrayAction {
    nameFn:string;
    acFn: (object1: any, object2: any) => void;
    iconFn: string;
}

interface EnhancedTable {
  headCells?: HeadColumn[];
  rows?:any;
  isLoading:boolean;
  arrButton: ArrayAction[];
}

export default function EnhancedTable(props:EnhancedTable) {
  const { headCells, rows, isLoading, arrButton } = props;
  const [order, setOrder] = React.useState<Order>('asc');
  const [orderBy, setOrderBy] = React.useState<string>('name');
  const [selected, setSelected] = React.useState<readonly string[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n:any) => n.id);
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
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
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

  const isSelected = (name: string) => selected.indexOf(name) !== -1? true : false;

  const handlePropsEdit = (event:any, id: any, func: any) => {
    func(event, id);
  }

  const handleDeleteRecordBySelected = () => {
    alert("Delete Record by selected")
  }

  const renderIcon = (iconFn : string) => {
    switch (iconFn) {
      case "ModeEditIcon":
        return <ModeEditIcon/>;
      case "Delete":
        return <DeleteIcon/>
      default:
        break;
    }
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2, overflow: 'auto' }}>
        <EnhancedTableToolbar numSelected={selected.length} deleteRecordBySelected={handleDeleteRecordBySelected}/>
        <TableContainer>
          <Table
            stickyHeader 
            sx={{ minWidth: 320 }}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              rowCount={rows.length}
              headCells={headCells != undefined? headCells:[]}
              onSelectAllProps={handleSelectAllClick}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
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
                        {headCells != undefined && headCells.map((colValue)=> {
                            return (
                              <TableCell 
                                padding="normal" 
                                align="left"
                                hidden={colValue.id===FieldConstants.ID}
                              >
                                {row[colValue.id as string]}
                              </TableCell>
                            );
                        })}
                        <TableCell padding="normal">
                          {arrButton.map((arrBtn)=> {
                            return(
                                <Tooltip title={arrBtn.nameFn} placement="top-start">
                                <IconButton size="small" color="primary" aria-label="add to shopping cart" 
                                  onClick={(event) => handlePropsEdit(event, row.id as string, arrBtn.acFn)}>
                                    {renderIcon(arrBtn.iconFn)}
                                </IconButton>
                              </Tooltip>
                            )
                          })}
                        </TableCell>
                      </TableRow>
                    );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
}