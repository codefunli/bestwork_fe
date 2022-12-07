import { v4 as uuid } from 'uuid';
import {
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Chip,
    Avatar,
    Table,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
    TableBody,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import HandleUserStatus from '../../shared-components/status-handle/user-status-handle';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

const products = [
    {
        id: uuid(),
        name: 'Dropbox',
        imageUrl: "require('../../../assets/construction_img.jpg')",
        updatedAt: subHours(new Date(), 2),
        status: 'true',
    },
    {
        id: uuid(),
        name: 'Medium Corporation',
        imageUrl: '../../assets/images/giay02.jpg',
        updatedAt: subHours(new Date(), 2),
        status: 'false',
    },
    {
        id: uuid(),
        name: 'Slack',
        imageUrl: '../../assets/images/giay03.jpg',
        updatedAt: subHours(new Date(), 3),
        status: 'true',
    },
    {
        id: uuid(),
        name: 'Lyft',
        imageUrl: '../../assets/images/giay04.jpg',
        updatedAt: subHours(new Date(), 5),
        status: 'false',
    },
    {
        id: uuid(),
        name: 'GitHub',
        imageUrl: '../../assets/images/giay05.jpg',
        updatedAt: subHours(new Date(), 9),
        status: 'true',
    },
];

export const TopLocation = (props: any) => (
    <Card {...props}>
        <CardHeader subtitle={`${products.length} in total`} title="Recent Users" />
        <Divider />
        <List>
            {products.map((product, i) => (
                <ListItem divider={i < products.length - 1} key={product.id}>
                    <ListItemAvatar>
                        <Avatar alt={product.name} src={product.imageUrl} sx={{ height: 47, width: 47 }} />
                    </ListItemAvatar>
                    <ListItemText
                        primary={product.name}
                        secondary={`Updated ${formatDistanceToNow(product.updatedAt)}`}
                    />
                    <ListItemText>
                        <HandleUserStatus statusId={product.status} />
                    </ListItemText>
                    <IconButton edge="end" size="small">
                        <MoreVertIcon />
                    </IconButton>
                </ListItem>
            ))}
        </List>
        <Divider />
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'flex-end',
                p: 2,
            }}
        >
            <Button color="primary" endIcon={<ArrowRightIcon />} size="small" variant="text">
                View all
            </Button>
        </Box>
    </Card>
);

function subHours(arg0: Date, arg1: number) {
    return arg0.getHours() - arg1;
}

function formatDistanceToNow(updatedAt: number) {
    return updatedAt;
}
