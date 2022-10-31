import AddCircleIcon from '@mui/icons-material/AddCircle';
import Timeline from '@mui/lab/Timeline';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent, { timelineContentClasses } from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
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
    Typography,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ProjectProgressDTO } from '../../models/project-res-dto';
import { getProgressByProjectId, getProgressStatus } from '../../services/project-service';
import ProgressCreate from './progress-create';
import ProgressEdit from './progress-edit';
import './project.scss';

export default function ProjectEdit() {
    const [projectData, setProjectData] = useState<any>({});
    const { t } = useTranslation();
    const params = useParams();
    const [isOpenCreateProgress, setOpenCreateProgress] = useState(false);
    const [isOpenEditProgress, setOpenEditProgress] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState<any>();
    const [progressList, setProgressList] = useState<ProjectProgressDTO[]>([]);
    const [progressStatus, setProgressStatus] = useState([]);

    useEffect(() => {
        if (params.id) {
            fetchData();
        }

        getProgressStatus().then((value: any) => {
            if (value && value.data) {
                setProgressStatus(value.data);
            }
        });
    }, [params.id]);

    const fetchData = async () => {
        const value: any = await getProgressByProjectId(params.id);
        if (value && value.data) {
            setProjectData(value.data.project);
            setProgressList(value.data.progress);
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

    const handleCloseProject = (project: any) => {
        console.log(project);
    };

    const renderStatusChip = (statusId: string) => {
        let status: string = '';
        progressStatus.forEach((value: any) => {
            if (statusId.toString() === value.id.toString()) {
                status = value.status
            }
        });

        switch (statusId) {
            case '0':
                return <Chip label={status} color="secondary" />;
            case '1':
                return <Chip label={status} color="primary" />;
            case '2':
                return <Chip label={status} color="error" />;
            case '3':
                return <Chip label={status} color="info" />;
            case '4':
                return <Chip label={status} color="success" />;
            default:
                return status;
        }
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
                                    image="https://cdn.pixabay.com/photo/2016/03/29/08/48/project-1287781__340.jpg"
                                    alt="green iguana"
                                />
                                {projectData && (
                                    <>
                                        <CardHeader
                                            action={
                                                <Button
                                                    variant="contained"
                                                    onClick={() => handleCloseProject(projectData)}
                                                >
                                                    Close
                                                </Button>
                                            }
                                            className="pb-0"
                                        ></CardHeader>
                                        <CardContent>
                                            <Typography gutterBottom variant="h3" component="div">
                                                {projectData.projectName}
                                            </Typography>
                                            <Typography color="text.secondary" style={{ fontSize: '20px' }}>
                                                {t('project.search.description')}: {projectData.description}
                                            </Typography>
                                            <Typography color="text.secondary" style={{ fontSize: '20px' }}>
                                                {t('message.status')}: {projectData.status}
                                            </Typography>
                                            <Typography color="text.secondary" style={{ fontSize: '20px' }}>
                                                {t('radio.paid')}:
                                                {projectData.isPaid === 1 ? t('radio.paid') : t('radio.unPaid')}
                                            </Typography>
                                        </CardContent>
                                    </>
                                )}
                            </CardActionArea>
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
                                {progressList.map((progress: ProjectProgressDTO | any, index: number) => (
                                    <div key={index}>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="textSecondary">
                                                <div style={{ minWidth: '200px' }}>
                                                    {progress.startDate.replace(/[TZ]/g, ' ')}
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
                                                    <div className="progress-item-title pb-2 h4 fw-bold">
                                                        {progress.title}
                                                    </div>
                                                    <div className="progress-item-report pb-2">{progress.report}</div>
                                                    <div className="progress-item-report pb-2">
                                                        {renderStatusChip(progress.status)}
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
