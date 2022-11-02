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
import { StatusCode } from '../../core/constants/common';
import { validateProjectProgress } from '../../core/constants/validate';
import { currentDateTime, formatDateTimeReq } from '../../core/utils/get-current-datetime';
import { ProjectProgressDTO } from '../../models/project-res-dto';
import { createProgress, getProgressStatus } from '../../services/project-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import MultipleFileUpload from '../../shared-components/file-upload/multiple-file-upload';

const progressInitValues: ProjectProgressDTO = {
    projectId: '',
    title: '',
    fileStorages: [],
    startDate: currentDateTime,
    endDate: currentDateTime,
    status: '',
    report: '',
    note: '',
};

interface Props {
    isOpen: boolean;
    setIsOpen: Function;
    toggleDrawer: Function;
    callBackFn: Function;
}

const ProgressCreate = (props: Props) => {
    const { isOpen, setIsOpen, toggleDrawer, callBackFn } = props;
    const { t } = useTranslation();
    const params = useParams();
    const [progressData, setProgressData] = useState(progressInitValues);
    const [isClearPreview, setIsClearPreview] = useState(false);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [progressStatus, setProgressStatus] = useState([]);

    useEffect(() => {
        if (params.id) {
            setProgressData({
                ...progressData,
                projectId: params.id,
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
        formState: { errors },
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
                projectId: params.id,
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

    const handleImageChange = (data: any) => {
        const convertedImages = data.map((image: any) => {
            return { data: image }
        });

        setProgressData({
            ...progressData,
            fileStorages: convertedImages,
        });
    };

    const handleSubmitForm = async () => {
        createProgress({
            ...progressData,
            startDate: formatDateTimeReq(progressData.startDate),
            endDate: formatDateTimeReq(progressData.endDate),
        })
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });
                callBackFn();
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
        handleClear();
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
                            <div className="item-header">{t('project.progress.progressTitle')}</div>
                            <div className="content">
                                <TextField
                                    size="small"
                                    value={progressData.title}
                                    fullWidth
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
                            <div className="item-header">{t('project.progress.progressImg')}</div>
                            <div className="content">
                                <MultipleFileUpload clearPreview={isClearPreview} callbackFunc={handleImageChange} />
                            </div>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <div className="item-header">{t('project.progress.date')}</div>
                            <div className="content">
                                <InputLabel htmlFor="outlined-adornment-amount" error={Boolean(errors.startDate)}>
                                    {t('project.progress.startDate')} <span className="input-required">*</span>
                                </InputLabel>
                                <TextField
                                    size="small"
                                    fullWidth
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
                                    fullWidth
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
                            <div className="item-header">{t('project.progress.status')}</div>
                            <div className="content">
                                <FormControl
                                    size="small"
                                    fullWidth
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
                                            <em>{t('message.statusLabel')}</em>
                                        </MenuItem>
                                        {(progressStatus && progressStatus.length > 0) && progressStatus.map((status: any) => (
                                            <MenuItem value={status.id} key={status.id}>
                                                <em>{status.status}</em>
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
                                    fullWidth
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
                            <div className="item-header">{t('project.progress.note')}</div>
                            <div className="content">
                                <TextField
                                    size="small"
                                    fullWidth
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
                                    sx={{ ml: 1 }}
                                    onClick={handleSubmit(handleSubmitForm)}
                                >
                                    {t('button.btnCreate')}
                                </Button>
                                <Button onClick={handleClear} variant="outlined">
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
