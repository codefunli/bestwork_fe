import { v4 as uuid } from 'uuid';
import {
    Box,
    Card,
    CardHeader,
    Chip,
    Divider,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const orders = [
    {
        id: uuid(),
        ref: 'CDD1049',
        amount: 30.5,
        customer: {
            name: 'Ekaterina Tankova',
        },
        createdAt: 2022 / 12 / 11,
        status: 'pending',
    },
    {
        id: uuid(),
        ref: 'CDD1048',
        amount: 25.1,
        customer: {
            name: 'Cao Yu',
        },
        createdAt: 2022 / 12 / 11,
        status: 'delivered',
    },
    {
        id: uuid(),
        ref: 'CDD1047',
        amount: 10.99,
        customer: {
            name: 'Alexa Richardson',
        },
        createdAt: 2022 / 12 / 11,
        status: 'refunded',
    },
    {
        id: uuid(),
        ref: 'CDD1046',
        amount: 96.43,
        customer: {
            name: 'Anje Keizer',
        },
        createdAt: 2022 / 12 / 11,
        status: 'pending',
    },
    {
        id: uuid(),
        ref: 'CDD1045',
        amount: 32.54,
        customer: {
            name: 'Clarke Gillebert',
        },
        createdAt: 2022 / 12 / 11,
        status: 'delivered',
    },
    {
        id: uuid(),
        ref: 'CDD1044',
        amount: 16.76,
        customer: {
            name: 'Adam Denisov',
        },
        createdAt: 2022 / 12 / 11,
        status: 'delivered',
    },
];

export const RecentProgress = (props: any) => (
    <Card {...props}>
        <CardHeader title="Recent Progress" />
        <Divider />
        <Box sx={{ minWidth: 700 }}>
            <Table
                sx={{
                    [`& .${tableCellClasses.root}`]: {
                        borderBottom: 'none',
                    },
                }}
            >
                <TableHead>
                    <TableRow>
                        <TableCell>Order Ref</TableCell>
                        <TableCell>Customer</TableCell>
                        <TableCell sortDirection="desc">
                            <Tooltip enterDelay={300} title="Sort">
                                <TableSortLabel active direction="desc">
                                    Date
                                </TableSortLabel>
                            </Tooltip>
                        </TableCell>
                        <TableCell>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {orders.map((order) => (
                        <TableRow hover key={order.id}>
                            <TableCell>{order.ref}</TableCell>
                            <TableCell>{order.customer.name}</TableCell>
                            <TableCell>{order.createdAt}</TableCell>
                            <TableCell>
                                <Chip
                                    color={
                                        (order.status === 'delivered' && 'success') ||
                                        (order.status === 'refunded' && 'error') ||
                                        'warning'
                                    }
                                    label={order.status}
                                />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    </Card>
);
