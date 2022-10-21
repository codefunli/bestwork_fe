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
                view: false,
                edit: false,
            },
            {
                userId: 2,
                name: 'Thiết Bất Đắc',
                view: false,
                edit: false,
            },
            {
                userId: 3,
                name: 'Bạch Mi Ưng Vương',
                view: false,
                edit: false,
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
                view: false,
                edit: false,
            },
            {
                userId: 2,
                name: 'Tiểu Long Nữ',
                view: false,
                edit: false,
            },
            {
                userId: 3,
                name: 'Hoàng Dược Sư',
                view: false,
                edit: false,
            },
        ],
    },
];

const initProjectTypes = [
    {
        id: 0,
        name: '',
        description: '',
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
    const [projectTypes, setProjectTypes] = useState(initProjectTypes);
    const [projectStatus, setProjectStatus] = useState([]);

    useEffect(() => {
        getProjectTypes().then((types: any) => {
            setProjectTypes(types);
        });

        getProjectStatus().then((status: any) => {
            setProjectStatus(status);
        });
    }, []);

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
            <form onSubmit={handleSubmitForm}>
                <Typography
                    variant="h5"
                    className="mb-4"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    {t('project.registerTitle')}
                    <Divider />
                </Typography>
                <Grid container direction="row" spacing={3}>
                    <Box sx={{ width: '100%' }}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', p: '0 24px' }}>
                            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                <Tab
                                    label="Register project"
                                    {...a11yProps(0)}
                                    tabIndex={0}
                                    onFocus={() => setValue(0)}
                                />
                                <Tab label="Assign user" {...a11yProps(1)} tabIndex={1} onFocus={() => setValue(0)} />
                            </Tabs>
                        </Box>
                        <TabPanel value={value} index={0}>
                            <Card style={{ width: '100%' }} className="register">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CardHeader
                                            avatar={<Avatar aria-label="recipe">C</Avatar>}
                                            title={t('project.register.title')}
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
                                                    <div className="col-12 col-md-6 p-1">
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
                                                    <div className="col-12 col-md-6 p-1">
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
                                                    <div className="col-12 col-md-6 p-1">
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
                                                    <div className="col-12 col-md-6 p-1">
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
                                                                    <em className="color-label-select-box">
                                                                        {t('message.statusLabel')}
                                                                    </em>
                                                                </MenuItem>
                                                                {projectStatus.map((s: any) => (
                                                                    <MenuItem value={s}>{s}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                </div>
                                                <div className="row justify-center m-1">
                                                    <div className="col-12 col-md-6 p-1">
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
                                                                    <em className="color-label-select-box">
                                                                        {t('message.statusLabel')}
                                                                    </em>
                                                                </MenuItem>
                                                                {projectTypes.map((s) => (
                                                                    <MenuItem value={s.id}>{s.name}</MenuItem>
                                                                ))}
                                                            </Select>
                                                        </FormControl>
                                                    </div>
                                                    <div className="col-12 col-md-6 p-1 mt-2 text-center">
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
                                            </Box>
                                        </CardContent>
                                    </Grid>
                                </Grid>
                            </Card>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Card style={{ width: '100%' }}>
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CardHeader
                                            avatar={<Avatar aria-label="recipe">P</Avatar>}
                                            title="Assign user to project"
                                            subheader={new Date().toLocaleDateString()}
                                            action={
                                                <Button variant="outlined" onClick={handleResetProjectRole}>
                                                    Reset
                                                </Button>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Role companyList={initCompanyListValue} callBackFn={callBackProjectRole} />
                                    </Grid>
                                </Grid>
                            </Card>
                        </TabPanel>
                    </Box>

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
