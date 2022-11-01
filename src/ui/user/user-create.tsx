import { yupResolver } from '@hookform/resolvers/yup';
import {
    AlertColor,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    FormControlLabel,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Radio,
    RadioGroup,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertColorConstants, DefaultImage, UrlFeApp } from '../../core/constants/common';
import { validateCreateUserForm } from '../../core/constants/validate';
import { getCompaniesByUser } from '../../services/company-service';
import { createUsers, getRoles } from '../../services/user-service';
import FileUpload from '../../shared-components/file-upload/file-upload';
import MessageShow from '../../shared-components/message/message';
import './user.scss';

const initialValues: any = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    uEmail: '',
    uTelNo: '',
    company: {
        id: '',
    },
    enabled: 1,
    role: {
        id: '',
    },
    avatar: '',
};

export default function UserAdd() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [formValues, setFormValues] = useState(initialValues);
    const [imgData, setImgData] = useState(DefaultImage.USER_AVATAR);
    const [companies, setCompanies] = useState<any>();
    const [userMsg, setUserMsg] = useState('');
    const [userMsgType, setUserMsgType] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [isShowMsg, setIsShowMsg] = useState(false);
    const [roles, setRoles] = useState([]);
    const params = useParams();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateUserForm),
    });

    useEffect(() => {
        if (params.id) {
            setFormValues({
                ...formValues,
                company: {
                    id: params.id,
                },
            });
        }
    }, [params]);

    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await getCompaniesByUser();
            if (companies) {
                setCompanies(companies);
            }
        };
        fetchCompanies();
    }, []);

    useEffect(() => {
        getRoles().then((data: any) => {
            setRoles(data);
        });
    }, []);

    const handleClearForm = () => {
        setFormValues(initialValues);
        reset();
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMsg(showMsg);
        setUserMsg(msg);
        setUserMsgType(type);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        if (name === 'role') {
            setFormValues({
                ...formValues,
                [name]: {
                    id: value,
                },
            });
        } else if (name === 'company') {
            setFormValues({
                ...formValues,
                [name]: {
                    id: value,
                },
            });
        } else {
            setFormValues({
                ...formValues,
                [name]: value,
            });
        }
    };

    const handleSwitchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, checked } = e.target;
        setFormValues({
            ...formValues,
            [name]: checked ? 1 : 0,
        });
    };
    const handleSubmitForm = () => {
        createUsers(formValues)
            .then((res: any) => {
                if (res.status === 'OK') {
                    handleMessage(true, res.message, AlertColorConstants.SUCCESS);
                    setTimeout(() => {
                        navigate(UrlFeApp.USER.SEARCH);
                    }, 1000);
                } else {
                    handleMessage(true, res.data[0].defaultMessage, AlertColorConstants.ERROR);
                }
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const onChangeAvatar = (event: any) => {
        setImgData(event.target.files[0]);
        if (event.target.files[0]) {
            const reader: any = new FileReader();
            reader.addEventListener('load', () => {
                setFormValues({
                    ...formValues,
                    avatar: reader.result,
                });
            });
            reader.readAsDataURL(event.target.files[0]);
        }
    };

    const handleCloseMsg = () => {
        setIsShowMsg(false);
    };

    const handleCancelChange = () => {
        navigate(`${UrlFeApp.USER.SEARCH}`);
    };

    return (
        <div className="user-info">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <Typography variant="h5">
                        <span className="font-weight-bold text-uppercase">{t('user.create.title')}</span>
                    </Typography>
                </div>
            </div>
            <form>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} md={5} lg={3} sx={{ mt: 1, mb: 1 }}>
                        <Card className="general-info">
                            <FileUpload defaultImage={DefaultImage.USER_AVATAR} callbackFunc={onChangeAvatar} />
                            <CardContent className="info">
                                <Typography gutterBottom variant="h5" component="div">
                                    {formValues.firstName} {formValues.lastName}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {formValues.userName}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={7} lg={9} sx={{ mt: 1, mb: 1 }}>
                        <Card>
                            <CardHeader
                                action={
                                    <Button onClick={handleClearForm} variant="outlined">
                                        {t('button.btnClear')}
                                    </Button>
                                }
                            ></CardHeader>

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
                                            <InputLabel htmlFor="userName" error={Boolean(errors.userName)}>
                                                {t('user.info.userName')} <span className="input-required">*</span>
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
                                                required
                                                id="userName"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.userName}
                                                error={Boolean(errors.userName)}
                                                helperText={t(errors.userName?.message?.toString() as string)}
                                                {...register('userName', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="userName" error={Boolean(errors.password)}>
                                                {t('login.password')} <span className="input-required">*</span>
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
                                                required
                                                id="password"
                                                type="password"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.password}
                                                error={Boolean(errors.password)}
                                                helperText={t(errors.password?.message?.toString() as string)}
                                                {...register('password', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="uEmail" error={Boolean(errors.uEmail)}>
                                                {t('user.info.email')} <span className="input-required">*</span>
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
                                                required
                                                id="uEmail"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.uEmail}
                                                error={Boolean(errors.uEmail)}
                                                helperText={t(errors.uEmail?.message?.toString() as string)}
                                                {...register('uEmail', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="uTelNo" error={Boolean(errors.uTelNo)}>
                                                {t('company.search.telNo')} <span className="input-required">*</span>
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
                                                required
                                                id="uTelNo"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.uTelNo}
                                                error={Boolean(errors.uTelNo)}
                                                helperText={t(errors.uTelNo?.message?.toString() as string)}
                                                {...register('uTelNo', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="firstName" error={Boolean(errors.firstName)}>
                                                {t('user.info.firstName')} <span className="input-required">*</span>
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
                                                required
                                                id="firstName"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.firstName}
                                                error={Boolean(errors.firstName)}
                                                helperText={t(errors.firstName?.message?.toString() as string)}
                                                {...register('firstName', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="lastName" error={Boolean(errors.lastName)}>
                                                {t('user.info.lastName')} <span className="input-required">*</span>
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
                                                required
                                                id="lastName"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.lastName}
                                                error={Boolean(errors.lastName)}
                                                helperText={t(errors.lastName?.message?.toString() as string)}
                                                {...register('lastName', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="company" error={Boolean(errors.company)}>
                                                {t('user.info.company')} <span className="input-required">*</span>
                                            </InputLabel>
                                            <FormControl
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                variant="outlined"
                                                error
                                            >
                                                <Select
                                                    value={formValues.company.id}
                                                    disabled={formValues.company.id ? true : false}
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    error={Boolean(errors.company)}
                                                    {...register('company', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                >
                                                    <MenuItem value="" selected={true} disabled>
                                                        <em style={{ color: '#bdbdbd', margin: '0 auto' }}>
                                                            {t('user.search.selectCompanyName')}
                                                        </em>
                                                    </MenuItem>
                                                    {companies &&
                                                        companies.length > 0 &&
                                                        companies.map((company: any) => (
                                                            <MenuItem value={company.id}>
                                                                {company.companyName}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                                {Boolean(errors.company) && (
                                                    <FormHelperText id="component-error-text">
                                                        {errors?.company?.message as string}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="role" error={Boolean(errors.role)}>
                                                {t('user.info.role')} <span className="input-required">*</span>
                                            </InputLabel>
                                            <FormControl
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                variant="outlined"
                                                error
                                            >
                                                <Select
                                                    value={formValues.role.id}
                                                    displayEmpty
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    error={Boolean(errors.role)}
                                                    {...register('role', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <em style={{ color: '#bdbdbd', margin: '0 auto' }}>
                                                            {t('user.search.selectRole')}
                                                        </em>
                                                    </MenuItem>
                                                    {roles &&
                                                        roles.length > 0 &&
                                                        roles.map((role: any) => {
                                                            return (
                                                                <MenuItem value={role.id} selected={true}>
                                                                    <em>{role.roleName}</em>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                                {Boolean(errors.role) && (
                                                    <FormHelperText id="component-error-text">
                                                        {errors?.role?.message as string}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="enabled">{t('user.info.enabled')}</InputLabel>
                                            <Switch
                                                checked={formValues.enabled}
                                                name="enabled"
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center justify-center mt-4">
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button
                                                sx={{ mr: 1 }}
                                                variant="contained"
                                                disabled={isSubmitting}
                                                onClick={handleSubmit(handleSubmitForm)}
                                            >
                                                {t('button.btnCreate')}
                                            </Button>
                                            <Button onClick={handleCancelChange} variant="outlined">
                                                {t('button.btnBack')}
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
            <MessageShow message={userMsg} showMessage={isShowMsg} type={userMsgType} handleCloseMsg={handleCloseMsg} />
        </div>
    );
}
