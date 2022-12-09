import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    ButtonGroup,
    Drawer,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { StatusCode } from '../../../core/constants/common';
import { validateProjectProgress } from '../../../core/constants/validate';
import { getUserInfo } from '../../../core/redux/user-slice';
import { Permission } from '../../../core/types/permission';
import {
    formatDateTimeReq,
    formatDateTimeRes,
    formatDateTimeResNoneSuffixes,
} from '../../../core/utils/get-current-datetime';
import { getProgressStatus, updateProgress } from '../../../services/construction-service';
import ApiAlert from '../../../shared-components/alert/api-alert';
import UploadMultipartFile from '../../../shared-components/file-management/upload-multipartfile';

interface Props {
    isOpen: boolean;
    setIsOpen: Function;
    toggleDrawer: Function;
    progress: any;
    callBackFn: Function;
    callBackLoading: Function;
}

const initialDataImg = {
    description: '',
    file: [],
    isOpenComment: false,
};

const ProgressEdit = (props: Props) => {
    const { isOpen, setIsOpen, toggleDrawer, progress, callBackFn, callBackLoading } = props;
    const { t } = useTranslation();
    const params = useParams();
    const [progressData, setProgressData] = useState(progress);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [progressStatus, setProgressStatus] = useState([]);
    const [fileDataBefore, setFileDataBefore] = useState(initialDataImg);
    const [fileDataAfter, setFileDataAfter] = useState(initialDataImg);
    const [eventImage, setEventImage] = useState<any>();
    const [isClearPreview, setIsClearPreview] = useState(false);
    const userInfo = useSelector(getUserInfo);
    const [permission, setPermission] = useState<Permission>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateProjectProgress),
    });

    useEffect(() => {
        if (userInfo && userInfo.permissions && userInfo.permissions[5] && userInfo.permissions[5][0]) {
            setPermission(userInfo.permissions[5][0]);
        }
    }, [userInfo]);

    useEffect(() => {
        getProgressStatus().then((value: any) => {
            if (value && value.data) {
                setProgressStatus(value.data);
            }
        });
        reset();
    }, []);

    useEffect(() => {
        setProgressData({
            ...progress,
            startDate: progress?.startDate
                ? formatDateTimeResNoneSuffixes(progress.startDate)
                : formatDateTimeRes(new Date()),
            endDate: progress?.endDate
                ? formatDateTimeResNoneSuffixes(progress.endDate)
                : formatDateTimeRes(new Date()),
        });
    }, [progress]);

    const handleCancel = () => {
        reset();
        setIsOpen(false);
        toggleDrawer(false);
        setIsClearPreview(true);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProgressData({
            ...progressData,
            [name]: value,
        });
    };

    const handleSubmitForm = async () => {
        let formData = new FormData();

        const progressValue: any = {
            ...progressData,
            constructionId: params.id,
            startDate: formatDateTimeReq(progressData.startDate),
            endDate: formatDateTimeReq(progressData.endDate),
        };

        if (fileDataBefore && fileDataBefore.file && fileDataBefore.file.length > 0) {
            fileDataBefore.file.forEach((data: any) => {
                formData.append('fileBefore', data);
            });
        } else {
            formData.append('fileBefore', new Blob());
        }

        if (fileDataAfter && fileDataAfter.file && fileDataAfter.file.length > 0) {
            fileDataAfter.file.forEach((data: any) => {
                formData.append('fileAfter', data);
            });
        } else {
            formData.append('fileAfter', new Blob());
        }

        formData.append(
            'progressReqDto',
            new Blob([JSON.stringify(progressValue)], {
                type: 'application/json',
            }),
        );
        setIsOpen(false);
        callBackLoading();
        updateProgress(formData, progressData.id)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    callBackFn();
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
        clearEventImage();
    };

    const onChangeImageBefore = (data: any) => {
        setFileDataBefore({
            ...fileDataBefore,
            file: data,
        });
    };

    const onChangeImageAfter = (data: any) => {
        setFileDataAfter({
            ...fileDataAfter,
            file: data,
        });
    };

    const handleClearEvent = (event: any) => {
        setEventImage(event);
    };

    const clearEventImage = () => {
        if (eventImage && eventImage.target && eventImage.target.value) eventImage.target.value = '';
    };

    return (
        <div>
            {progressData && progressData.id && (
                <div>
                    <Drawer anchor="right" open={isOpen} onClose={toggleDrawer(false)}>
                        <Box sx={{ width: 320 }} className="progress-drawer">
                            <Grid container direction="row" spacing={0}>
                                <Grid item xs={12} className="header">
                                    <Typography
                                        color="white"
                                        variant="h6"
                                        gutterBottom
                                        sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 9 }}
                                    >
                                        {t('project.progress.edit')}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.progressTitle')}</div>
                                    <div className="content">
                                        <TextField
                                            size="small"
                                            value={progressData.title}
                                            fullWidth={true}
                                            required
                                            disabled={permission && !permission.canEdit}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            label=""
                                            id="outlined-required"
                                            placeholder={t('common.placeholder')}
                                            error={Boolean(errors.title)}
                                            helperText={t(errors.title?.message?.toString() as string)}
                                            {...register('title', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.progressImg')}</div>
                                    <div className="content">
                                        <UploadMultipartFile
                                            id="before"
                                            imgData={progressData.fileBefore}
                                            clearPreview={isClearPreview}
                                            callbackFunc={onChangeImageBefore}
                                            callBackClearEvent={handleClearEvent}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.progressImg')}</div>
                                    <div className="content">
                                        <UploadMultipartFile
                                            id="after"
                                            imgData={progressData.fileAfter}
                                            clearPreview={isClearPreview}
                                            callbackFunc={onChangeImageAfter}
                                            callBackClearEvent={handleClearEvent}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.date')}</div>
                                    <div className="content">
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.startDate)}
                                        >
                                            {t('project.progress.startDate')} <span className="input-required">*</span>
                                        </InputLabel>
                                        <TextField
                                            size="small"
                                            fullWidth={true}
                                            disabled={permission && !permission.canEdit}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={progressData.startDate}
                                            id="dateEnd"
                                            type="datetime-local"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={Boolean(errors.startDate)}
                                            helperText={t(errors.startDate?.message?.toString() as string)}
                                            {...register('startDate', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                        <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.endDate)}>
                                            {t('project.progress.endDate')} <span className="input-required">*</span>
                                        </InputLabel>
                                        <TextField
                                            size="small"
                                            fullWidth={true}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            disabled={permission && !permission.canEdit}
                                            value={progressData.endDate}
                                            id="dateEnd"
                                            type="datetime-local"
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            error={Boolean(errors.endDate)}
                                            helperText={t(errors.endDate?.message?.toString() as string)}
                                            {...register('endDate', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.status')}</div>
                                    <div className="content">
                                        <FormControl
                                            size="small"
                                            fullWidth={true}
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            variant="outlined"
                                        >
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                displayEmpty
                                                disabled={permission && !permission.canEdit}
                                                value={progressData.status}
                                                error={Boolean(errors.status)}
                                                {...register('status', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            >
                                                <MenuItem value="" selected={true} disabled>
                                                    <em>{t('message.statusLabel')}</em>
                                                </MenuItem>
                                                {progressStatus &&
                                                    progressStatus.length > 0 &&
                                                    progressStatus.map((value: any) => (
                                                        <MenuItem value={value.id.toString()} key={value.id}>
                                                            <em>{value.status}</em>
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                            {Boolean(errors.status) && (
                                                <FormHelperText id="component-error-text">
                                                    <span className="message-required">
                                                        {errors?.status?.message as string}
                                                    </span>
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.report')}</div>
                                    <div className="content">
                                        <TextField
                                            size="small"
                                            fullWidth={true}
                                            multiline
                                            disabled={permission && !permission.canEdit}
                                            rows={3}
                                            name="report"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={progressData.report}
                                            placeholder={t('common.placeholder')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.note')}</div>
                                    <div className="content">
                                        <TextField
                                            size="small"
                                            fullWidth={true}
                                            multiline
                                            disabled={permission && !permission.canEdit}
                                            rows={3}
                                            name="note"
                                            sx={{
                                                mt: 1,
                                                mb: 1,
                                                '& legend': { display: 'none' },
                                                '& fieldset': { top: 0 },
                                            }}
                                            value={progressData.note}
                                            placeholder={t('common.placeholder')}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} className="text-center" sx={{ mt: 1, mb: 1 }}>
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
                                    >
                                        <Button onClick={handleCancel} variant="outlined" disabled={isSubmitting}>
                                            {t('button.btnCancel')}
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            sx={{ ml: 1 }}
                                            disabled={isSubmitting || (permission && !permission.canEdit)}
                                            onClick={handleSubmit(handleSubmitForm)}
                                        >
                                            {t('button.btnUpdate')}
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Box>
                    </Drawer>

                    <ApiAlert response={resForHandleMsg} />
                </div>
            )}
        </div>
    );
};

export default ProgressEdit;
