import AddCircleIcon from '@mui/icons-material/AddCircle';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import {
    Avatar,
    Button,
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { formatDateTimeResList } from '../../../core/utils/get-current-datetime';
import { ProjectProgressDTO } from '../../../models/project-res-dto';
import { getProgressByProjectId, getProgressStatus, getProjectStatus } from '../../../services/project-service';
import HandleProgressStatus from '../../../shared-components/status-handle/progress-status-handle';
import HandleProjectStatus from '../../../shared-components/status-handle/project-status-handle';
import ProgressCreate from './progress-create';
import ProgressEdit from './progress-edit';
import '../../project/project.scss';
import {
    getConstruction,
    getConstructionStatus,
    getProgressByConstruction,
} from '../../../services/construction-service';
import HandleConstructionStatus from '../../../shared-components/status-handle/construction-status-handle';

export default function ProgressDetail() {
    const [constructionData, setConstructionData] = useState<any>({});
    const { t } = useTranslation();
    const params = useParams();
    const [isOpenCreateProgress, setOpenCreateProgress] = useState(false);
    const [isOpenEditProgress, setOpenEditProgress] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState<any>();
    const [progressList, setProgressList] = useState<ProjectProgressDTO[]>([]);
    const [progressStatus, setProgressStatus] = useState([]);
    const [constructionStatus, setConstructionStatus] = useState([]);

    useEffect(() => {
        if (params.id) fetchData();

        getProgressStatus().then((value: any) => {
            if (value && value.data) setProgressStatus(value.data);
        });

        getConstructionStatus().then((status: any) => {
            if (status && status.data) setConstructionStatus(status.data);
        });
    }, [params.id]);

    const fetchData = async () => {
        const value: any = await getProgressByConstruction(params.id);
        if (value && value.data) {
            setProgressList(value.data);
        }

        const result: any = await getConstruction(params.id);
        if (result && result.data) {
            setConstructionData(result.data);
        }
    };

    useEffect(() => {
        fetchData();
    }, [isOpenEditProgress]);

    const toggleDrawerCreateProgress = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }
        setOpenCreateProgress(open);
    };

    const toggleDrawerEditProgress = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        )
            return;

        setOpenEditProgress(open);
    };

    const handleEditProgress = (progress: any) => {
        setOpenEditProgress(true);
        toggleDrawerEditProgress(true);
        const tmpSelectedProgress: any = progressList.find((prg: any) => prg.id === progress.id);
        setSelectedProgress(tmpSelectedProgress);
    };

    const handleCloseProject = (project: any) => {};
    const handleArrayValue = (data: any) => {
        return (
            <Stack direction="row" spacing={1}>
                {data &&
                    data.length > 0 &&
                    data.map((el: any) => {
                        return <Chip key={el.id} label={el.code} color="info" size="small" variant="outlined" />;
                    })}
            </Stack>
        );
    };

    return (
        <div className="project-detail">
            <form>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item md={12} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={require('../../../assets/construction_img.jpg')}
                                    alt="green iguana"
                                />
                            </CardActionArea>
                            {constructionData && (
                                <div className="project-info">
                                    <CardHeader
                                        action={
                                            <Button
                                                variant="contained"
                                                onClick={() => handleCloseProject(constructionData)}
                                            >
                                                Close
                                            </Button>
                                        }
                                        className="pb-0"
                                    ></CardHeader>
                                    <CardContent>
                                        <Typography gutterBottom variant="h3" component="div">
                                            {constructionData.constructionName}
                                        </Typography>
                                        <div className="d-flex justify-content-start flex-column p-3 info-item">
                                            <div className="title">{t('construction.register.cttStatus')}:</div>
                                            <HandleConstructionStatus
                                                statusList={
                                                    constructionStatus && constructionStatus.length > 0
                                                        ? constructionStatus
                                                        : []
                                                }
                                                statusId={constructionData?.status}
                                            />
                                        </div>
                                        <div className="d-flex justify-content-start flex-column p-3 info-item">
                                            <div className="title">{t('construction.register.cttLocation')}:</div>
                                            <div>{constructionData?.location}</div>
                                        </div>
                                        <div className="d-flex justify-content-start flex-column p-3 info-item">
                                            <div className="title">{t('construction.register.cttStartDate')}:</div>
                                            <div>{formatDateTimeResList(constructionData?.startDate)}</div>
                                        </div>
                                        <div className="d-flex justify-content-start flex-column p-3 info-item">
                                            <div className="title">{t('construction.register.cttEndDate')}:</div>
                                            <div>{formatDateTimeResList(constructionData?.endDate)}</div>
                                        </div>
                                        <div className="d-flex justify-content-start flex-column p-3 info-item">
                                            <div className="title">{t('construction.register.cttAwb')}:</div>
                                            <div> {handleArrayValue(constructionData?.awbCodes)}</div>
                                        </div>
                                    </CardContent>
                                </div>
                            )}
                        </Card>
                    </Grid>
                    <Grid item md={12} lg={8}>
                        <Card style={{ width: '100%' }}>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">PR</Avatar>}
                                title="Progress daily"
                                subheader={new Date().toLocaleDateString()}
                                action={
                                    <IconButton color="primary" size="large" onClick={toggleDrawerCreateProgress(true)}>
                                        <AddCircleIcon fontSize="inherit" />
                                    </IconButton>
                                }
                            />
                            <Divider />
                            <Timeline
                                sx={{
                                    [`& .${timelineOppositeContentClasses.root}`]: {
                                        flex: 0.2,
                                    },
                                }}
                            >
                                {progressList &&
                                    progressList.length > 0 &&
                                    progressList.map((progress: ProjectProgressDTO | any, index: number) => (
                                        <div key={index}>
                                            <TimelineItem>
                                                <TimelineOppositeContent color="textSecondary">
                                                    <div style={{ minWidth: '200px' }}>
                                                        {formatDateTimeResList(progress.startDate)}
                                                    </div>
                                                </TimelineOppositeContent>
                                                <TimelineSeparator className="h-40">
                                                    <TimelineDot />
                                                    <TimelineConnector />
                                                </TimelineSeparator>
                                                <TimelineContent>
                                                    <div
                                                        className="mb-4 progress-item pb-2"
                                                        onClick={() => handleEditProgress(progress)}
                                                    >
                                                        <div className="pb-2 h4 fw-bold">{progress.title}</div>
                                                        <div className="pb-2">{progress.report}</div>
                                                        <div className="pb-2">
                                                            <HandleProgressStatus
                                                                statusList={
                                                                    progressStatus && progressStatus.length > 0
                                                                        ? progressStatus
                                                                        : []
                                                                }
                                                                statusId={progress.status}
                                                            />
                                                        </div>
                                                    </div>
                                                </TimelineContent>
                                            </TimelineItem>
                                        </div>
                                    ))}
                            </Timeline>
                        </Card>
                    </Grid>
                </Grid>
            </form>

            <ProgressCreate
                isOpen={isOpenCreateProgress}
                setIsOpen={setOpenCreateProgress}
                toggleDrawer={toggleDrawerCreateProgress}
                callBackFn={fetchData}
            />
            <ProgressEdit
                isOpen={isOpenEditProgress}
                setIsOpen={setOpenEditProgress}
                toggleDrawer={toggleDrawerEditProgress}
                progress={selectedProgress}
            />
        </div>
    );
}
