import { Box, Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from "@mui/material";
import { FieldConstants } from "../../core/constants/common";
import { HeadColumn } from "../../core/types/base";
import {  } from "../../ui/company/company-search";

export type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    headCells:HeadColumn[];
    numSelected: number;
    order: Order;
    orderBy: string;
    rowCount: number;
}
  
export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, numSelected, rowCount, headCells } = props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              //onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id as string}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
              hidden={headCell.id===FieldConstants.ID}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                //onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
              </TableSortLabel>
            </TableCell>
          ))}
          <TableCell padding="normal">
                  Action
          </TableCell>
        </TableRow>
      </TableHead>
    );
  }