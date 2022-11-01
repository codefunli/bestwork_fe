import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, ButtonGroup, Drawer,
    FormControl, FormHelperText, Grid,
    InputLabel, MenuItem, Select, TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StatusCode } from '../../core/constants/common';
import { validateProjectProgress } from '../../core/constants/validate';
import { ProjectProgressDTO } from '../../models/project-res-dto';
import { currentDateTime, formatDateTimeReq, formatDateTimeRes } from '../../core/utils/get-current-datetime';
import ApiAlert from '../../shared-components/alert/api-alert';
import MultipleFileUpload from '../../shared-components/file-upload/multiple-file-upload';
import { updateProgress, getProgressStatus } from '../../services/project-service';

interface Props {
    isOpen: boolean,
    setIsOpen: Function,
    toggleDrawer: Function,
    progress: any
}

const ProgressEdit = (props: Props) => {
    const { isOpen, setIsOpen, toggleDrawer, progress } = props;
    const { t } = useTranslation();
    const [progressData, setProgressData] = useState(progress);
    const [imgData, setImgData] = useState([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [progressStatus, setProgressStatus] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateProjectProgress),
    });

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
            startDate: progress?.startDate ? formatDateTimeRes(progress?.startDate) : currentDateTime,
            endDate: progress?.endDate ? formatDateTimeRes(progress?.endDate) : currentDateTime,
        });
        setImgData(progress?.fileStorages);
    }, [progress]);

    const handleCancel = () => {
        setIsOpen(false);
        toggleDrawer(false);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProgressData({
            ...progressData,
            [name]: value,
        });
    };

    const handleSubmitForm = async () => {
        updateProgress(
            {
                ...progressData,
                fileStorages: imgData,
                startDate: formatDateTimeReq(progressData.startDate),
                endDate: formatDateTimeReq(progressData.endDate),
            },
            progressData.id
        )
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                setIsOpen(false);
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const callbackFunc = (data: any) => {
        setImgData(data);
    };

    return (
        <div>
            {progressData && progressData.id &&
                <div>
                    <Drawer
                        anchor="right"
                        open={isOpen}
                        onClose={toggleDrawer(false)}
                    >
                        <Box sx={{ width: 320 }} className="progress-drawer">
                            <Grid container direction="row" spacing={0}>
                                <Grid item xs={12} className="header">
                                    <Typography color="white" variant="h6" gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 9 }}>
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
                                            helperText={t(
                                                errors.title?.message?.toString() as string,
                                            )}
                                            {...register('title', {
                                                onChange: (e) => handleInputChange(e),
                                            })}
                                        />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.progressImg')}</div>
                                    <div className="content">
                                        <MultipleFileUpload callbackFunc={callbackFunc} imgData={imgData} isEditUpload={true} />
                                    </div>
                                </Grid>
                                <Grid item xs={12} className="item">
                                    <div className="item-header">{t('project.progress.date')}</div>
                                    <div className="content">
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.startDate)}
                                        >
                                            {t('project.progress.startDate')}{' '}
                                            <span className="input-required">*</span>
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
                                        <InputLabel
                                            htmlFor="outlined-adornment-amount"
                                            error={Boolean(errors.endDate)}
                                        >
                                            {t('project.progress.endDate')}{' '}
                                            <span className="input-required">*</span>
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
                                                {(progressStatus && progressStatus.length > 0) && progressStatus.map((value: any) => (
                                                    <MenuItem value={value.id.toString()} key={value.id}>
                                                        <em>{value.status}</em>
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                            {Boolean(errors.status) &&
                                                <FormHelperText id="component-error-text">
                                                    <span className="message-required">{errors?.status?.message as string}</span>
                                                </FormHelperText>
                                            }
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
                                    <ButtonGroup
                                        disableElevation
                                        variant="contained"
                                        aria-label="Disabled elevation buttons"
                                    >
                                        <Button onClick={handleCancel} variant="outlined">
                                            {t('button.btnCancel')}
                                        </Button>
                                        <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={handleSubmit(handleSubmitForm)}>
                                            {t('button.btnUpdate')}
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                        </Box>
                    </Drawer>

                    <ApiAlert
                        response={resForHandleMsg}
                    />
                </div>
            }
        </div>
    );
};

export default ProgressEdit;