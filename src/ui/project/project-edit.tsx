import {
    AlertColor,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertColorConstants, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateProjectEditForm } from '../../core/constants/validate';
import { getProject, updateProject } from '../../services/project-service';
import MessageShow from '../../shared-components/message/message';

const currentDateTime = new Date().toISOString().substring(0, 11).concat(new Date().toLocaleTimeString());

const initialValues = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        comment: '',
        updateDate: currentDateTime,
        notificationFlag: true,
        isPaid: false,
        status: '',
    },
};

const statusValues = [
    {
        name: 'Cancel',
        value: '0',
    },
    {
        name: 'Processing',
        value: '1',
    },
    {
        name: 'Done and waiting for checking',
        value: '2',
    },
    {
        name: 'Checked and waiting for payment',
        value: '3',
    },
];

const projectType = [
    {
        name: 'Type 1',
        value: '0',
    },
    {
        name: 'Type 2',
        value: '1',
    },
];

export default function ProjectEdit() {
    const [formValues, setFormValues] = useState(initialValues);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const params = useParams();

    useEffect(() => {
        if (params.id != undefined) {
            getProject(params.id).then((value: any) => {
                if (value != undefined && value.data != undefined) {
                    const project = {
                        ...value.data,
                    };
                    setFormValues({ project });
                }
                reset();
            });
        }
    }, [params.id]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateProjectEditForm),
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
            },
        });
    };

    const handleIsPaidChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: !formValues.project.isPaid,
            },
        });
    };

    const handleNotificationFlagChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: !formValues.project.notificationFlag,
            },
        });
    };

    const handleClearCompany = () => {
        setFormValues({
            ...formValues,
            project: initialValues.project,
        });
        reset();
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleResponse = (resp: any) => {
        switch (resp.status) {
            case StatusCode.OK:
                handleMessage(true, resp.message, AlertColorConstants.SUCCESS);
                navigate(UrlFeApp.PROJECT.SEARCH);
                break;
            case StatusCode:
                handleMessage(true, resp.message, AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, resp.message, AlertColorConstants.WARNING);
                break;
        }
    };

    const handleSubmitForm = (event: any) => {
        updateProject(formValues)
            .then((resp: any) => {
                handleResponse(resp);
            })
            .catch(() => {
                handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
            });
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    return (
        <div className="project">
            <form onSubmit={handleSubmitForm}>
                <Typography
                    variant="h5"
                    className="mb-4"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    {t('project.editTitle')}
                    <Divider />
                </Typography>
                <Grid container>
                    <Card style={{ width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">C</Avatar>}
                                    title={t('project.edit.title')}
                                    subheader={new Date().toLocaleDateString()}
                                    action={
                                        <Button variant="outlined" onClick={handleClearCompany}>
                                            {t('button.btnClear')}
                                        </Button>
                                    }
                                />
                                <CardContent>
                                    <Box
                                        component="form"
                                        sx={{
                                            '& > :not(style)': { m: 1 },
                                        }}
                                        noValidate
                                        autoComplete="off"
                                    >
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.projectName)}
                                                >
                                                    {t('project.register.name')}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.project.projectName}
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
                                                    error={Boolean(errors.projectName)}
                                                    helperText={t(errors.projectName?.message?.toString() as string)}
                                                    {...register('projectName', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.comment)}
                                                >
                                                    {t('project.register.comment')}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.project.comment}
                                                    fullWidth
                                                    required
                                                    id="outlined-required"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.comment)}
                                                    helperText={errors.comment?.message?.toString()}
                                                    {...register('comment', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.description)}
                                                >
                                                    {t('project.register.description')}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.project.description}
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
                                                    error={Boolean(errors.description)}
                                                    helperText={t(errors.description?.message?.toString() as string)}
                                                    {...register('description', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 p-1" style={{ padding: 0 }}>
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.updateDate)}
                                                >
                                                    {t('project.edit.updateDate')}{' '}
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
                                                    value={formValues.project.updateDate}
                                                    id="dateEnd"
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={Boolean(errors.updateDate)}
                                                    helperText={t(errors.updateDate?.message?.toString() as string)}
                                                    {...register('updateDate', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t('project.register.status')}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
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
                                                        value={formValues.project.status}
                                                        onChange={handleInputChange}
                                                    >
                                                        <MenuItem value="" selected={true} disabled>
                                                            <em>{t('message.statusLabel')}</em>
                                                        </MenuItem>
                                                        {statusValues.map((s) => (
                                                            <MenuItem value={s.value}>{s.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t('project.register.type')}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
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
                                                        name="projectType"
                                                        displayEmpty
                                                        value={formValues.project.projectType}
                                                        onChange={handleInputChange}
                                                    >
                                                        <MenuItem value="" selected={true} disabled>
                                                            <em>{t('message.statusLabel')}</em>
                                                        </MenuItem>
                                                        {projectType.map((s) => (
                                                            <MenuItem value={s.value}>{s.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1 mt-3">
                                                <div className="row justify-center m-1">
                                                    <div className="col-12 col-md-6 d-block">
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">
                                                                {t('project.register.notificationFlag')}
                                                            </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="notificationFlag"
                                                                name="notificationFlag"
                                                                value={formValues.project.notificationFlag}
                                                                onChange={handleNotificationFlagChange}
                                                                defaultValue="1"
                                                            >
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio color="primary" />}
                                                                    label={t('radio.accept')}
                                                                />
                                                                <FormControlLabel
                                                                    value="false"
                                                                    control={<Radio color="primary" />}
                                                                    label={t('radio.deny')}
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-12 col-md-6 d-block">
                                                        <FormControl component="fieldset">
                                                            <FormLabel component="legend">
                                                                {t('project.register.isPaid')}
                                                            </FormLabel>
                                                            <RadioGroup
                                                                row
                                                                aria-label="isPaid"
                                                                name="isPaid"
                                                                value={formValues.project.isPaid}
                                                                onChange={handleIsPaidChange}
                                                                defaultValue="1"
                                                            >
                                                                <FormControlLabel
                                                                    value="true"
                                                                    control={<Radio color="primary" />}
                                                                    label={t('radio.paid')}
                                                                />
                                                                <FormControlLabel
                                                                    value="false"
                                                                    control={<Radio color="primary" />}
                                                                    label={t('radio.unPaid')}
                                                                />
                                                            </RadioGroup>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid item xs={12} sm={12} className="text-center" marginTop={3}>
                        <Button variant="contained" color="primary" onClick={handleSubmit(handleSubmitForm)}>
                            {t('button.btnSave')}
                        </Button>
                    </Grid>
                </Grid>
            </form>
            <MessageShow
                message={companyMsg}
                showMessage={isShowMessage}
                type={typeCompanyMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
}
