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
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AWB_LOADING } from '../../../core/constants/common';
import { getUserInfo } from '../../../core/redux/user-slice';
import { Permission } from '../../../core/types/permission';
import { formatDateTimeResList } from '../../../core/utils/get-current-datetime';
import { ContructionProgressResDTO } from '../../../models/construction-res-dto';
import {
    getConstruction,
    getConstructionStatus,
    getProgressByConstruction,
} from '../../../services/construction-service';
import { getProgressStatus } from '../../../services/project-service';
import Loading from '../../../shared-components/loading-page/Loading';
import HandleConstructionStatus from '../../../shared-components/status-handle/construction-status-handle';
import HandleProgressStatus from '../../../shared-components/status-handle/progress-status-handle';
import '../../project/project.scss';
import ProgressCreate from './progress-create';
import ProgressEdit from './progress-edit';

export default function ProgressDetail() {
    const [constructionData, setConstructionData] = useState<any>({});
    const { t } = useTranslation();
    const params = useParams();
    const [isLoadingConstruction, setIsLoadingConstruction] = useState<any>(false);
    const [isLoadingProgress, setIsLoadingProgress] = useState<any>(false);
    const [isOpenCreateProgress, setOpenCreateProgress] = useState(false);
    const [isOpenEditProgress, setOpenEditProgress] = useState(false);
    const [selectedProgress, setSelectedProgress] = useState<any>();
    const [progressList, setProgressList] = useState<any>([]);
    const [progressStatus, setProgressStatus] = useState([]);
    const [constructionStatus, setConstructionStatus] = useState([]);
    const userInfo = useSelector(getUserInfo);
    const [permission, setPermission] = useState<Permission>();

    useEffect(() => {
        if (userInfo && userInfo.permissions && userInfo.permissions[5] && userInfo.permissions[5][0]) {
            setPermission(userInfo.permissions[5][0]);
        }
    }, [userInfo]);

    useEffect(() => {
        if (params.id) fetchData(true, true);

        getProgressStatus().then((value: any) => {
            if (value && value.data) setProgressStatus(value.data);
        });

        getConstructionStatus().then((status: any) => {
            if (status && status.data) setConstructionStatus(status.data);
        });
    }, [params.id]);

    const fetchData = async (isLoadingConstruction: any, isLoadingProgress: any) => {
        if (isLoadingConstruction) {
            setIsLoadingConstruction(AWB_LOADING.LOADING);
        }

        if (isLoadingProgress) {
            setIsLoadingProgress(AWB_LOADING.LOADING);
        }

        const res = await Promise.all([getProgressByConstruction(params.id), getConstruction(params.id)]);

        if (res[0] && res[0].data) {
            setProgressList(res[0].data);
            if (isLoadingProgress) {
                setIsLoadingProgress(AWB_LOADING.HAS_DATA);
            }
        }

        if (res[1] && res[1].data) {
            setConstructionData(res[1].data);
            if (isLoadingConstruction) {
                setIsLoadingConstruction(AWB_LOADING.HAS_DATA);
            }
        }
    };

    const handleLoading = () => {
        setIsLoadingProgress(AWB_LOADING.LOADING);
    };

    const handleLoadingCreate = () => {
        setIsLoadingProgress(AWB_LOADING.LOADING);
    };

    const fetchProgressData = () => {
        getProgressByConstruction(params.id)
            .then((res) => {
                if (res && res.data) {
                    setProgressList(res.data);
                    setIsLoadingProgress(AWB_LOADING.HAS_DATA);
                }
            })
            .catch((err) => {
                setProgressList([]);
            });
    };

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
            <Stack direction="column" spacing={1}>
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
                            {isLoadingConstruction === AWB_LOADING.HAS_DATA ? (
                                <div className="project-info">
                                    <CardHeader
                                        action={
                                            <Button
                                                disabled={permission && !permission.canEdit}
                                                variant="contained"
                                                onClick={() => handleCloseProject(constructionData)}
                                            >
                                                {t('button.btnClose')}
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
                            ) : (
                                <div className="m-4">
                                    <Loading />
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
                                    <IconButton
                                        disabled={permission && !permission.canAdd}
                                        color="primary"
                                        size="large"
                                        onClick={toggleDrawerCreateProgress(true)}
                                    >
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
                                {isLoadingProgress === AWB_LOADING.HAS_DATA ? (
                                    progressList &&
                                    progressList.length > 0 &&
                                    progressList.map((progress: ContructionProgressResDTO | any, index: number) => (
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
                                    ))
                                ) : (
                                    <div className="m-4">
                                        <Loading />
                                    </div>
                                )}
                            </Timeline>
                        </Card>
                    </Grid>
                </Grid>
            </form>

            <ProgressCreate
                isOpen={isOpenCreateProgress}
                setIsOpen={setOpenCreateProgress}
                toggleDrawer={toggleDrawerCreateProgress}
                callBackFn={fetchProgressData}
                callBackLoading={handleLoadingCreate}
            />
            <ProgressEdit
                isOpen={isOpenEditProgress}
                setIsOpen={setOpenEditProgress}
                toggleDrawer={toggleDrawerEditProgress}
                progress={selectedProgress}
                callBackLoading={handleLoading}
                callBackFn={fetchProgressData}
            />
        </div>
    );
}
