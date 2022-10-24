import {
    AlertColor,
    Avatar,
    Box,
    Button,
    ButtonGroup,
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
    Tab,
    Tabs,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertColorConstants, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateProjectRegisterForm } from '../../core/constants/validate';
import { createProject, getProjectStatus, getProjectTypes } from '../../services/project-service';
import MessageShow from '../../shared-components/message/message';
import TabPanel from '../../shared-components/tab-manager/tab-panel';
import Role from './project-role';

const currentDateTime = new Date().toISOString().substring(0, 11).concat(new Date().toLocaleTimeString());

const initialValues = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        createDate: currentDateTime,
        notificationFlag: '1',
        isPaid: '0',
        status: '',
    },
};
const initCompanyListValue = [
    {
        companyId: 1,
        companyName: 'Ỷ Thiên Đồ Long Ký',
        userList: [
            {
                userId: 1,
                name: 'Trương Vô Kỵ',
                canView: false,
                canEdit: false,
            },
            {
                userId: 2,
                name: 'Thiết Bất Đắc',
                canView: false,
                canEdit: false,
            },
            {
                userId: 3,
                name: 'Bạch Mi Ưng Vương',
                canView: false,
                canEdit: false,
            },
        ],
    },
    {
        companyId: 1,
        companyName: 'Thần Điêu Đại Bịp',
        userList: [
            {
                userId: 1,
                name: 'Dương Quá',
                canView: false,
                canEdit: false,
            },
            {
                userId: 2,
                name: 'Tiểu Long Nữ',
                canView: false,
                canEdit: false,
            },
            {
                userId: 3,
                name: 'Hoàng Dược Sư',
                canView: false,
                canEdit: false,
            },
        ],
    },
];

export default function ProjectRegister() {
    const [formValues, setFormValues] = useState(initialValues);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [value, setValue] = useState(0);
    const [roleData, setRoleData] = useState(initCompanyListValue);
    const [projectStatus, setProjectStatus] = useState([]);
    const [projectTypes, setProjectType] = useState([]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateProjectRegisterForm),
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

    useEffect(() => {
        getProjectStatus().then((status: any) => {
            setProjectStatus(status);
        });
        getProjectTypes().then((type: any) => {
            setProjectType(type);
        });
        if (Object.keys(errors).length > 0) {
            setValue(0);
        }
    }, [errors]);

    const handleIsPaidChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
            },
        });
    };

    const handleNotificationFlagChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            project: {
                ...formValues.project,
                [name]: value,
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
        createProject({
            ...formValues,
            roleData,
        })
            .then((resp) => {
                handleResponse(resp);
            })
            .catch(() => {
                handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
            });
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleResetProjectRole = () => {};

    const callBackProjectRole = (roleData: any) => {
        setRoleData(roleData);
    };

    return (
        <div className="project">
            <Grid container direction="row" spacing={3} className="project-register">
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <div className="row">
                        <div className="col-12">
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t('project.registerTitle')}
                            </Typography>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmitForm}>
                        <Grid container direction="row" alignItems="center">
                            <Grid item xs={12}>
                                <Tabs value={value} onChange={handleChange} aria-label="" className="custom-tab">
                                    <Tab
                                        label="Register project"
                                        {...a11yProps(0)}
                                        tabIndex={0}
                                        onFocus={() => setValue(0)}
                                    />
                                    <Tab
                                        label="Assign user"
                                        {...a11yProps(1)}
                                        tabIndex={1}
                                        onFocus={() => setValue(0)}
                                    />
                                </Tabs>

                                <div className="custom-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={0}>
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
                                                                helperText={t(
                                                                    errors.projectName?.message?.toString() as string,
                                                                )}
                                                                {...register('projectName', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
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
                                                                helperText={t(
                                                                    errors.description?.message?.toString() as string,
                                                                )}
                                                                {...register('description', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
                                                        </div>
                                                    </div>
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-sm-6 p-1">
                                                            <InputLabel
                                                                htmlFor="outlined-adornment-amount"
                                                                error={Boolean(errors.createDate)}
                                                            >
                                                                {t('project.register.createDate')}{' '}
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
                                                                value={formValues.project.createDate}
                                                                id="dateEnd"
                                                                type="datetime-local"
                                                                InputLabelProps={{
                                                                    shrink: true,
                                                                }}
                                                                error={Boolean(errors.createDate)}
                                                                helperText={t(
                                                                    errors.createDate?.message?.toString() as string,
                                                                )}
                                                                {...register('createDate', {
                                                                    onChange: (e) => handleInputChange(e),
                                                                })}
                                                            />
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
                                                                    {projectTypes.map((s: any) => (
                                                                        <MenuItem value={s.id}>{s.name}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
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
                                                                    {projectStatus.map((s: any, index: any) => (
                                                                        <MenuItem value={index}>{s}</MenuItem>
                                                                    ))}
                                                                </Select>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-12 col-sm-6 d-block p-1 mt-1">
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
                                                                                value="1"
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.accept')}
                                                                            />
                                                                            <FormControlLabel
                                                                                value="0"
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
                                                                                value="1"
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.paid')}
                                                                            />
                                                                            <FormControlLabel
                                                                                value="0"
                                                                                control={<Radio color="primary" />}
                                                                                label={t('radio.unPaid')}
                                                                            />
                                                                        </RadioGroup>
                                                                    </FormControl>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="text-center justify-center mt-4">
                                                        <ButtonGroup
                                                            disableElevation
                                                            variant="contained"
                                                            aria-label="Disabled elevation buttons"
                                                        >
                                                            <Button
                                                                variant="contained"
                                                                color="primary"
                                                                sx={{ mr: 1 }}
                                                                onClick={handleSubmit(handleSubmitForm)}
                                                            >
                                                                {t('button.btnSave')}
                                                            </Button>
                                                            <Button variant="outlined" onClick={handleClearCompany}>
                                                                {t('button.btnClear')}
                                                            </Button>
                                                        </ButtonGroup>
                                                    </div>
                                                </Box>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>

                                <div className="assign-user-tab">
                                    <Card w-full="true">
                                        <TabPanel value={value} index={1}>
                                            <CardContent>
                                                <Role
                                                    companyList={initCompanyListValue}
                                                    callBackFn={callBackProjectRole}
                                                />
                                                <div className="text-center justify-center mt-4">
                                                    <ButtonGroup
                                                        disableElevation
                                                        variant="contained"
                                                        aria-label="Disabled elevation buttons"
                                                    >
                                                        <Button
                                                            variant="contained"
                                                            color="primary"
                                                            sx={{ mr: 1 }}
                                                            onClick={handleSubmit(handleSubmitForm)}
                                                        >
                                                            {t('button.btnSave')}
                                                        </Button>
                                                        <Button variant="outlined" onClick={handleResetProjectRole}>
                                                            {t('button.btnReset')}
                                                        </Button>
                                                    </ButtonGroup>
                                                </div>
                                            </CardContent>
                                        </TabPanel>
                                    </Card>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </Grid>

                <MessageShow
                    message={companyMsg}
                    showMessage={isShowMessage}
                    type={typeCompanyMsg}
                    handleCloseMsg={handleCloseMsg}
                />
            </Grid>
        </div>
    );
}
