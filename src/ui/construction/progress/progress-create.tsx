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
import { useParams } from 'react-router-dom';
import { StatusCode } from '../../../core/constants/common';
import { validateProjectProgress } from '../../../core/constants/validate';
import { formatDateTimeReq, formatDateTimeRes } from '../../../core/utils/get-current-datetime';
import { ContructionProgressDTO } from '../../../models/construction-res-dto';
import { createProgress, getProgressStatus } from '../../../services/construction-service';
import ApiAlert from '../../../shared-components/alert/api-alert';
import UploadMultipartFile from '../../../shared-components/file-management/upload-multipartfile';
import HandleProjectStatus from '../../../shared-components/status-handle/project-status-handle';

const progressInitValues: ContructionProgressDTO = {
    constructionId: '',
    title: '',
    fileStorages: [],
    startDate: formatDateTimeRes(new Date()),
    endDate: formatDateTimeRes(new Date()),
    status: '',
    report: '',
    note: '',
};

interface Props {
    isOpen: boolean;
    setIsOpen: Function;
    toggleDrawer: Function;
    callBackFn: Function;
    callBackLoading: Function;
}

const initialDataImg = {
    description: '',
    file: [],
    isOpenComment: false,
};

const ProgressCreate = (props: Props) => {
    const { isOpen, setIsOpen, toggleDrawer, callBackFn, callBackLoading } = props;
    const { t } = useTranslation();
    const params = useParams();
    const [progressData, setProgressData] = useState(progressInitValues);
    const [isClearPreview, setIsClearPreview] = useState(false);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [progressStatus, setProgressStatus] = useState([]);
    const [fileDataBefore, setFileDataBefore] = useState(initialDataImg);
    const [fileDataAfter, setFileDataAfter] = useState(initialDataImg);
    const [eventImage, setEventImage] = useState<any>();

    useEffect(() => {
        if (params.id) {
            setProgressData({
                ...progressData,
                constructionId: params.id,
            });
        }
        getProgressStatus().then((value: any) => {
            if (value && value.data) {
                setProgressStatus(value.data);
            }
        });
    }, []);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateProjectProgress),
    });

    const handleClear = () => {
        reset();
        setIsOpen(false);
        toggleDrawer(false);
        setIsClearPreview(true);
        if (params.id) {
            setProgressData({
                ...progressInitValues,
                constructionId: params.id,
            });
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProgressData({
            ...progressData,
            [name]: value,
        });
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

    const handleSubmitForm = async (event: any) => {
        let formData = new FormData();

        const progressValue: any = {
            ...progressData,
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

        callBackLoading();
        createProgress(formData)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    callBackFn(false, true);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
        handleClear();
        clearEventImage();
    };

    return (
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
                                {t('project.progress.create')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <InputLabel className="item-header" htmlFor="progressTitle">
                                {t('project.progress.progressTitle')}
                            </InputLabel>
                            <div className="content">
                                <TextField
                                    size="small"
                                    value={progressData.title}
                                    fullWidth={true}
                                    required
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
                            <InputLabel className="item-header">{t('project.progress.progressImg')}</InputLabel>
                            <div className="content">
                                <UploadMultipartFile
                                    id="before"
                                    imgData={progressData.fileStorages}
                                    clearPreview={isClearPreview}
                                    callbackFunc={onChangeImageBefore}
                                    callBackClearEvent={handleClearEvent}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <InputLabel className="item-header">{t('project.progress.progressImg')}</InputLabel>
                            <div className="content" id="after">
                                <UploadMultipartFile
                                    id="after"
                                    imgData={progressData.fileStorages}
                                    clearPreview={isClearPreview}
                                    callbackFunc={onChangeImageAfter}
                                    callBackClearEvent={handleClearEvent}
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <InputLabel className="item-header" htmlFor="date">
                                {t('project.progress.date')}
                            </InputLabel>
                            <div className="content">
                                <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.startDate)}>
                                    {t('project.progress.startDate')} <span className="input-required">*</span>
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
                                    value={progressData.startDate}
                                    id="startDate"
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
                                    value={progressData.endDate}
                                    id="endDate"
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
                            <InputLabel className="item-header" htmlFor="status">
                                {t('project.progress.status')}
                            </InputLabel>
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
                                        value={progressData.status}
                                        error={Boolean(errors.status)}
                                        {...register('status', {
                                            onChange: (e) => handleInputChange(e),
                                        })}
                                    >
                                        <MenuItem value="" selected={true} disabled>
                                            <em className="color-label-select-box">{t('message.statusLabel')}</em>
                                        </MenuItem>
                                        {progressStatus &&
                                            progressStatus.length > 0 &&
                                            progressStatus.map((status: any) => (
                                                <MenuItem value={status.id} key={status.id}>
                                                    <HandleProjectStatus
                                                        isSearch={true}
                                                        statusList={progressStatus}
                                                        statusId={status.id.toString()}
                                                    />
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
                            <InputLabel className="item-header" htmlFor="report">
                                {t('project.progress.report')}
                            </InputLabel>
                            <div className="content">
                                <TextField
                                    size="small"
                                    fullWidth={true}
                                    multiline
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
                            <InputLabel className="item-header" htmlFor="note">
                                {t('project.progress.note')}
                            </InputLabel>
                            <div className="content">
                                <TextField
                                    size="small"
                                    fullWidth={true}
                                    multiline
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
                            <ButtonGroup disableElevation variant="contained" aria-label="Disabled elevation buttons">
                                <Button
                                    variant="contained"
                                    color="primary"
                                    sx={{ mr: 1 }}
                                    disabled={isSubmitting}
                                    onClick={handleSubmit(handleSubmitForm)}
                                >
                                    {t('button.btnCreate')}
                                </Button>
                                <Button onClick={handleClear} variant="outlined" disabled={isSubmitting}>
                                    {t('button.btnCancel')}
                                </Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>

            <ApiAlert response={resForHandleMsg} />
        </div>
    );
};

export default ProgressCreate;
