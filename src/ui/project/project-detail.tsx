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
import { getProject } from '../../services/project-service';
import ProgressCreate from './progress-create';
import ProgressEdit from './progress-edit';
import './project.scss';

const initialValues = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        comment: '',
        updateDate: '',
        notificationFlag: true,
        isPaid: false,
        status: '',
    },
};

export default function ProjectEdit() {
    const [projectData, setProjectData] = useState(initialValues);
    const { t } = useTranslation();
    const params = useParams();
    const [isOpenCreateProgress, setOpenCreateProgress] = useState(false);
    const [isOpenEditProgress, setOpenEditProgress] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState<any>();

    const [progressList, setProgressList] = useState<ProjectProgressDTO[]>([]);

    const progressListFromLocal: any = localStorage.getItem('progressList');

    useEffect(() => {
        const progressTmp: any = JSON.parse(progressListFromLocal);
        if (progressTmp) setProgressList(progressTmp);
    }, [progressListFromLocal]);

    useEffect(() => {
        if (params.id !== undefined) {
            getProject(params.id).then((value: any) => {
                if (value !== undefined && value.data !== undefined) {
                    const project = {
                        ...value.data,
                    };
                    setProjectData({ project });
                }
            });
        }
    }, [params.id]);

    const toggleDrawerCreateProgress = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (
            event &&
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
        )
            return;

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

    const handleEditProgress = (id: string) => {
        setOpenEditProgress(true);
        toggleDrawerEditProgress(true);
        setSelectedProgress(id);
    };

    return (
        <div className="project-detail">
            <form>
                <Grid container spacing={3} justifyContent="center">
                    <Grid item xs={12} md={4} lg={4}>
                        <Card>
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image="https://cdn.pixabay.com/photo/2016/03/29/08/48/project-1287781__340.jpg"
                                    alt="green iguana"
                                />
                                <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        Đặt cược F88
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Nhà cái tới từ Châu âu, thay đổi, lắp đặt kích thước, tranh ảnh, điện trần nhà
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={4}>
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
                                {progressList.map((progress: ProjectProgressDTO, index: number) => (
                                    <div>
                                        <TimelineItem>
                                            <TimelineOppositeContent color="textSecondary">
                                                {progress.startDate}
                                            </TimelineOppositeContent>
                                            <TimelineSeparator className="h-40">
                                                <TimelineDot />
                                                <TimelineConnector />
                                            </TimelineSeparator>
                                            <TimelineContent>
                                                <div
                                                    className="mb-4 progress-item"
                                                    onClick={() => handleEditProgress(progress.id)}
                                                >
                                                    <div className="progress-item-title">{progress.title}</div>
                                                    <div className="progress-item-report">{progress.report}</div>
                                                    <Chip label="pedding" color="secondary" />
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
            />
            <ProgressEdit
                isOpen={isOpenEditProgress}
                setIsOpen={setOpenEditProgress}
                toggleDrawer={toggleDrawerEditProgress}
                progressId={selectedProgress}
            />
        </div>
    );
}
