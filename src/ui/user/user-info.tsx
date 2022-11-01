import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    FormControlLabel,
    Grid,
    InputLabel,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
    AlertColor,
    FormControl,
    Select,
    MenuItem,
    FormHelperText,
} from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { UserResDto } from '../../models/user-res-dto';
import { getRoles, getUser, putUser } from '../../services/user-service';
import { UrlFeApp, AlertColorConstants, StatusCode, DefaultImage } from '../../core/constants/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateUserForm } from '../../core/constants/validate';
import MessageShow from '../../shared-components/message/message';
import { getCompanies, getCompaniesByUser } from '../../services/company-service';
import FileUpload from '../../shared-components/file-upload/file-upload';
import './user.scss';

const initialValues = {
    id: '',
    userName: '',
    password: 'hidden',
    firstName: '',
    lastName: '',
    uEmail: '',
    enabled: 0,
    uTelNo: '',
    role: {
        id: '',
    },
    avatar: DefaultImage.USER_AVATAR,
    updateDate: '',
    countLoginFailed: '',
    deleteFlag: 0,
    company: {
        id: '',
    },
};

export default function UserInfo() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [formValues, setFormValues] = useState(initialValues);
    const [companies, setCompanies] = useState<any>();
    const [userMsg, setUserMsg] = useState('');
    const [userMsgType, setUserMsgType] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [isShowMsg, setIsShowMsg] = useState(false);
    const [roles, setRoles] = useState([]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateUserForm),
    });

    useEffect(() => {
        getRoles().then((data: any) => {
            setRoles(data);
        });
    }, []);

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
        const fetchUserInfo = async () => {
            const data = await getUser(userId);
            if (data && data.data) {
                setFormValues(data.data);
                reset();
            }
        };

        fetchUserInfo();
    }, [reset, userId]);

    const handleCancelChange = () => {
        navigate(`${UrlFeApp.USER.SEARCH}`);
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
        putUser(userId, formValues)
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

    return (
        <div className="user-info">
            <div className="row">
                <div className="col-sm-12 col-md-6">
                    <Typography variant="h5">
                        <span className="font-weight-bold text-uppercase">{t('user.title')}</span>
                    </Typography>
                </div>
            </div>
            <form>
                <Grid container direction="row" spacing={3}>
                    <Grid item xs={12} md={5} lg={3} sx={{ mt: 1, mb: 1 }}>
                        <Card className="general-info">
                            <FileUpload defaultImage={formValues.avatar} callbackFunc={onChangeAvatar} />
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
                                            <InputLabel htmlFor="password" error={Boolean(errors.password)}>
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
                                            <InputLabel htmlFor="comapny" error={Boolean(errors.comapny)}>
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
                                                    displayEmpty
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    error={Boolean(errors.comapny)}
                                                    {...register('company', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <em>{t('user.search.selectCompanyName')}</em>
                                                    </MenuItem>
                                                    {companies &&
                                                        companies.length > 0 &&
                                                        companies.map((company: any) => {
                                                            return (
                                                                <MenuItem value={company.id} selected={true}>
                                                                    <em>{company.companyName}</em>
                                                                </MenuItem>
                                                            );
                                                        })}
                                                </Select>
                                                {Boolean(errors.comapny) && (
                                                    <FormHelperText id="component-error-text">
                                                        {errors?.comapny?.message as string}
                                                    </FormHelperText>
                                                )}
                                            </FormControl>
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="countLoginFailed">
                                                {t('user.info.countLoginFailed')}
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
                                                id="countLoginFailed"
                                                label=""
                                                placeholder=""
                                                name="countLoginFailed"
                                                value={formValues.countLoginFailed}
                                                disabled
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="enable">{t('user.info.enabled')}</InputLabel>
                                            <Switch
                                                checked={formValues.enabled == 1 ? true : false}
                                                name="enabled"
                                                onChange={handleSwitchChange}
                                            />
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
                                                        <em>{t('user.search.selectRole')}</em>
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
                                            <InputLabel htmlFor="deleteFlag">{t('user.info.deleted')}</InputLabel>
                                            <Switch
                                                checked={formValues.deleteFlag == 1 ? true : false}
                                                name="deleteFlag"
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
                                                {t('button.btnSave')}
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
