import { Checkbox, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { FieldConstants } from '../../core/constants/common';
import { HeadColumn } from '../../core/types/base';
import {} from '../../ui/company/company-search';
import { useTranslation } from 'react-i18next';
import { Permission } from '../../core/types/permission';

export type Order = 'asc' | 'desc';

interface EnhancedTableProps {
    headCells: HeadColumn[];
    numSelected: number;
    order: Order;
    orderBy: string;
    rowCount: number;
    onSelectAllProps: Function;
    sortCallBack: Function;
    permission?: Permission;
    hasNoAction: boolean;
}

export function EnhancedTableHead(props: EnhancedTableProps) {
    const { order, orderBy, numSelected, rowCount, headCells, onSelectAllProps, permission, hasNoAction } = props;
    const onSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        onSelectAllProps(event);
    };
    const { t } = useTranslation();

    const createSortHandler = (id: string) => {
        props.sortCallBack(id);
    };

    return (
        <TableHead>
            <TableRow>
                {permission?.canDelete && (
                    <TableCell padding="checkbox">
                        <Checkbox
                            color="primary"
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={rowCount > 0 && numSelected === rowCount}
                            onChange={(event) => onSelectAllClick(event)}
                            inputProps={{
                                'aria-label': 'select all desserts',
                            }}
                        />
                    </TableCell>
                )}
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id as string}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                        hidden={headCell.id === FieldConstants.ID}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={() => createSortHandler(headCell.id)}
                        >
                            {t(headCell.label as string)}
                        </TableSortLabel>
                    </TableCell>
                ))}
                {!hasNoAction && <TableCell padding="normal">{t('common.action')}</TableCell>}
            </TableRow>
        </TableHead>
    );
}
