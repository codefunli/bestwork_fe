import {
    Box,
    Card,
    CardHeader,
    Divider,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableSortLabel,
    Tooltip,
} from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { formatDateTimeResList } from '../../core/utils/get-current-datetime';
import { getLatestProgress } from '../../services/dashboard-service';
import { getProgressStatus } from '../../services/project-service';
import HandleProgressStatus from '../../shared-components/status-handle/progress-status-handle';

export default function RecentProgress() {
    const { t } = useTranslation();
    const [tableData, setTableData] = useState<any[]>();
    const [progressStatus, setProgressStatus] = useState([]);

    useEffect(() => {
        getLatestProgress().then((result: any) => {
            if (result && result.data) {
                setTableData(result.data);
            }
        });

        getProgressStatus().then((value: any) => {
            if (value && value.data) setProgressStatus(value.data);
        });
    }, []);

    return (
        <Card>
            <CardHeader title={t('dashBoard.progress')} />
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
                            <TableCell>{t('dashBoard.progressTb.constructionName')}</TableCell>
                            <TableCell>{t('dashBoard.progressTb.title')}</TableCell>
                            <TableCell sortDirection="desc">
                                <Tooltip enterDelay={300} title="Sort">
                                    <TableSortLabel active direction="desc">
                                        {t('dashBoard.progressTb.crtDate')}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell sortDirection="desc">
                                <Tooltip enterDelay={300} title="Sort">
                                    <TableSortLabel active direction="desc">
                                        {t('dashBoard.progressTb.endDate')}
                                    </TableSortLabel>
                                </Tooltip>
                            </TableCell>
                            <TableCell>{t('dashBoard.progressTb.status')}</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tableData &&
                            tableData.map((item: any, index: any) => (
                                <TableRow hover key={index}>
                                    <TableCell>{item.constructionName}</TableCell>
                                    <TableCell>{item.title}</TableCell>
                                    <TableCell>{formatDateTimeResList(item.startDate)}</TableCell>
                                    <TableCell>{formatDateTimeResList(item.endDate)}</TableCell>
                                    <TableCell>
                                        <HandleProgressStatus
                                            statusList={
                                                progressStatus && progressStatus.length > 0 ? progressStatus : []
                                            }
                                            statusId={item.status}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </Box>
        </Card>
    );
}
