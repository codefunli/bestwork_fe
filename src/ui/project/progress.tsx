import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box, Button, Drawer,
    FormControl, Grid,
    InputLabel, MenuItem, Select, TextField,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DefaultImage } from '../../core/constants/common';
import { ProjectProgressDTO } from '../../models/project-res-dto';
import { validateProjectProgress } from '../../core/constants/validate';
import MultipleFileUpload from '../../shared-components/file-upload/multiple-file-upload';

const progressInitValues: ProjectProgressDTO = {
    name: '',
    images: [],
    startDate: '',
    endDate: '',
    status: 1,
    report: '',
    note: ''
}

interface Props {
    isOpen: boolean,
    setIsOpen: Function
}

const progressStatus = [
    {
        id: 1,
        value: 'Todo'
    },
    {
        id: 2,
        value: 'Inprogress'
    },
    {
        id: 3,
        value: 'Pending'
    },
    {
        id: 4,
        value: 'Review'
    },
    {
        id: 5,
        value: 'Done'
    }
];

const Progress = (props: Props) => {
    const { isOpen, setIsOpen } = props;
    const { t } = useTranslation();
    const [progressData, setProgressData] = useState(progressInitValues);
    const [imgData, setImgData] = useState(DefaultImage.USER_AVATAR);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateProjectProgress),
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setProgressData({
            ...progressData,
            [name]: value,
        });
    };

    const handleSubmitForm = (event: any) => {
        // updateProject(formValues)
        //     .then((resp: any) => {
        //         handleResponse(resp);
        //     })
        //     .catch(() => {
        //         handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
        //     });
    };

    return (
        <div>
            <Drawer
                anchor="right"
                open={isOpen}
                onClose={setIsOpen(false)}
            >
                <Box sx={{ width: 380 }} className="progress-drawer">
                    <Grid container direction="row" spacing={0}>
                        <Grid item xs={12} className="header">
                            <Typography color="white" variant="h6" gutterBottom sx={{ textTransform: 'uppercase', textAlign: 'center', mt: 9 }}>
                                {t('project.progress.title')}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <div className="item-header">{t('project.progress.prjName')}</div>
                            <div className="content">...</div>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <div className="item-header">{t('project.progress.progressImg')}</div>
                            <div className="content">
                                <MultipleFileUpload callbackFunc={setImgData} />
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
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        '& input': { padding: '8.5px 14px' },
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
                                    fullWidth
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        '& input': { padding: '8.5px 14px' },
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
                                        name="status"
                                        displayEmpty
                                        value={progressData.status}
                                        onChange={handleInputChange}
                                    >
                                        <MenuItem value="" selected={true} disabled>
                                            <em>{t('message.statusLabel')}</em>
                                        </MenuItem>

                                        {progressStatus.map(status => (
                                            <MenuItem value={status.id} key={status.id}>
                                                <em>{status.value}</em>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </div>
                        </Grid>
                        <Grid item xs={12} className="item">
                            <div className="item-header">{t('project.progress.report')}</div>
                            <div className="content">
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={3}
                                    name="report"
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        '& input': { padding: '8.5px 14px' },
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
                                    fullWidth
                                    multiline
                                    rows={3}
                                    name="note"
                                    sx={{
                                        mt: 1,
                                        mb: 1,
                                        '& legend': { display: 'none' },
                                        '& fieldset': { top: 0 },
                                        '& input': { padding: '8.5px 14px' },
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
                            <Button variant="contained" color="primary" onClick={handleSubmit(handleSubmitForm)}>
                                {t('button.btnSave')}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Drawer>
        </div>
    );
};

export default Progress;