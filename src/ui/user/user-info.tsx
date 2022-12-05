import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Divider,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { DefaultImage, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateUserEditForm } from '../../core/constants/validate';
import { getUserInfo } from '../../core/redux/user-slice';
import { getCompaniesByUser } from '../../services/company-service';
import { getRoles, getUser, putUser } from '../../services/user-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import FileUpload from '../../shared-components/file-upload/file-upload';
import './user.scss';

const initialValues = {
    id: '',
    userName: '',
    firstName: '',
    lastName: '',
    uEmail: '',
    enabled: 0,
    uTelNo: '',
    role: '',
    avatar: DefaultImage.USER_AVATAR,
    updateDate: '',
    deleteFlag: 0,
    company: '',
};

export default function UserInfo() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { t } = useTranslation();

    const [formValues, setFormValues] = useState(initialValues);
    const [companies, setCompanies] = useState<any>();
    const [roles, setRoles] = useState([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const userInfo = useSelector(getUserInfo);
    const [isLogedInUser, setIsLogedInUser] = useState(false);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateUserEditForm),
    });

    useEffect(() => {
        getCompaniesByUser().then((companies) => {
            if (companies) setCompanies(companies);
        });

        getRoles().then((data: any) => {
            if (data) setRoles(data);
        });
    }, []);

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await getUser(userId);
            if (data && data.data) {
                setFormValues({
                    ...data.data,
                    role: data.data.role.id,
                    company: data.data.company.id,
                });
                reset();
            }
        };

        fetchUserInfo();

        if (userInfo.id === Number(userId)) {
            setIsLogedInUser(true);
        }
    }, [reset, userId]);

    const handleCancelChange = () => {
        navigate(`${UrlFeApp.USER.SEARCH}`);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
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
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        navigate(UrlFeApp.USER.SEARCH);
                    }, 1000);
                }
            })
            .catch((err) => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
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

    const getCompanyName = (companyId: any) => {
        const company =
            companies &&
            companies.length > 0 &&
            companies.find((company: any) => company.id.toString() === companyId.toString());
        return company ? company.companyName : '';
    };

    return (
        <div className="user-info">
            <div className="p-label-header-1">
                <Typography
                    variant="h5"
                    className="btn disabled text-white bg-light opacity-100 border-customTheme"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    <div className="particletext">{t('user.title')}</div>
                    <Divider />
                </Typography>
            </div>
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} md={5} lg={3} sx={{ mt: 1, mb: 1 }}>
                    <Card className="general-info">
                        <FileUpload
                            defaultImage={formValues.avatar}
                            callbackFunc={onChangeAvatar}
                            isDisabled={isLogedInUser}
                        />
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
                                            disabled={isLogedInUser}
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
                                            disabled={isLogedInUser}
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
                                            disabled={isLogedInUser}
                                        />
                                    </div>
                                    <div className="col-12 col-sm-6 d-block p-1">
                                        <InputLabel htmlFor="company" error={Boolean(errors.company)}>
                                            {t('user.info.company')} <span className="input-required">*</span>
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
                                            id="company"
                                            label=""
                                            placeholder=""
                                            name="company"
                                            value={getCompanyName(formValues.company)}
                                            disabled
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
                                            disabled={isLogedInUser}
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
                                            disabled={isLogedInUser}
                                        />
                                    </div>
                                </div>
                                <div className="row justify-center m-1">
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
                                                value={formValues.role}
                                                displayEmpty
                                                sx={{
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                error={Boolean(errors.role)}
                                                {...register('role', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                                disabled={isLogedInUser}
                                            >
                                                <MenuItem value="" disabled>
                                                    <em className="placeholder-color">{t('user.search.selectRole')}</em>
                                                </MenuItem>
                                                {roles &&
                                                    roles.length > 0 &&
                                                    roles.map((role: any) => (
                                                        <MenuItem key={role.id} value={role.id} selected={true}>
                                                            <em>{role.roleName}</em>
                                                        </MenuItem>
                                                    ))}
                                            </Select>
                                            {Boolean(errors.role) && (
                                                <FormHelperText id="component-error-text">
                                                    {errors?.role?.message as string}
                                                </FormHelperText>
                                            )}
                                        </FormControl>
                                    </div>
                                    <div className="col-12 col-sm-6 d-block p-1">
                                        <InputLabel htmlFor="enable">{t('user.info.enabled')}</InputLabel>
                                        <Switch
                                            checked={formValues.enabled === 1 ? true : false}
                                            name="enabled"
                                            onChange={handleSwitchChange}
                                            disabled={isLogedInUser}
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
                                            hidden={isLogedInUser}
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

            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
