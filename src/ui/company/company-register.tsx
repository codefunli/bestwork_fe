import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {
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
    FormHelperText,
    FormLabel,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Item, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateForm } from '../../core/constants/validate';
import { District, Ward } from '../../core/types/administrative';
import { formatDateTimeReq, formatDateTimeRes } from '../../core/utils/get-current-datetime';
import { registerCompany } from '../../services/company-service';
import ApiAlert from '../../shared-components/alert/api-alert';

const initialValues = {
    company: {
        companyName: '',
        cpEmail: '',
        cpTelNo: '',
        taxNo: '',
        national: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        startDate: '',
        expiredDate: '',
    },
    user: {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        uTelNo: '',
        uEmail: '',
        enabled: true,
        role: {
            id: 1,
        },
    },
};

export default function CompanyRegister() {
    const [formValues, setFormValues] = useState({
        ...initialValues,
        company: {
            ...initialValues.company,
            startDate: formatDateTimeRes(new Date()),
            expiredDate: formatDateTimeRes(new Date()),
        },
    });
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [showPassword, setShowPassword] = useState(false);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateForm),
    });

    const handleInputChangeCompany = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            },
        });
    };

    const handleInputChangeUser = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            user: {
                ...formValues.user,
                [name]: value,
            },
        });
    };

    const handleAllowLoginChange = (event: any) => {
        const { name, value } = event.target;

        setFormValues({
            ...formValues,
            user: {
                ...formValues.user,
                [name]: !formValues.user.enabled,
            },
        });
    };

    const handleClearCompany = () => {
        setFormValues({
            ...formValues,
            company: initialValues.company,
        });
        reset();
    };

    const handleClearUser = () => {
        setFormValues({
            ...formValues,
            user: initialValues.user,
        });
        reset();
    };

    const handleSubmitForm = () => {
        let objValue: any = {
            company: {
                ...formValues.company,
                startDate: formatDateTimeReq(formValues.company.startDate),
                expiredDate: formatDateTimeReq(formValues.company.expiredDate),
            },
            user: {
                ...formValues.user,
                enabled: formValues.user.enabled ? 1 : 0,
            },
        };

        registerCompany(objValue)
            .then((res) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        navigate(UrlFeApp.COMPANY.SEARCH);
                    }, 1000);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleBack = () => {
        navigate(`${UrlFeApp.COMPANY.SEARCH}`);
    };

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <div className="p-label-header">
                    <Typography
                        variant="h5"
                        className="btn disabled text-white bg-light opacity-100 border-customTheme"
                        color="textSecondary"
                        gutterBottom
                        sx={{ textTransform: 'uppercase' }}
                    >
                        <div className="particletext">{t(Item.COMPANY.REGISTER_TITLE)}</div>
                        <Divider />
                    </Typography>
                </div>
                <Grid container>
                    <Card style={{ width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">C</Avatar>}
                                    title={t(Item.COMPANY.REGISTER_TITLE_CARD)}
                                    subheader={new Date().toLocaleDateString()}
                                    action={
                                        <Button variant="outlined" onClick={handleClearCompany}>
                                            {t(Item.LABEL_BTN.CLEAR)}
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
                                                <InputLabel htmlFor="companyName" error={Boolean(errors.companyName)}>
                                                    {t(Item.COMPANY.REGISTER_NAME)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.companyName}
                                                    fullWidth
                                                    required
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    id="companyName"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.companyName)}
                                                    helperText={t(errors.companyName?.message?.toString() as string)}
                                                    {...register('companyName', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="cpEmail" error={Boolean(errors.cpEmail)}>
                                                    {t(Item.COMPANY.REGISTER_EMAIL)}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpEmail}
                                                    fullWidth
                                                    required
                                                    id="cpEmail"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.cpEmail)}
                                                    helperText={errors.cpEmail?.message?.toString()}
                                                    {...register('cpEmail', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="cpTelNo" error={Boolean(errors.cpTelNo)}>
                                                    {t(Item.COMPANY.REGISTER_TELNO)}{' '}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpTelNo}
                                                    fullWidth
                                                    required
                                                    id="cpTelNo"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.cpTelNo)}
                                                    helperText={errors.cpTelNo?.message?.toString()}
                                                    {...register('cpTelNo', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="taxNo" error={Boolean(errors.taxNo)}>
                                                    {t(Item.COMPANY.REGISTER_TAX_NO)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.taxNo}
                                                    fullWidth
                                                    required
                                                    id="taxNo"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.taxNo)}
                                                    helperText={errors.taxNo?.message?.toString()}
                                                    {...register('taxNo', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-12 d-block p-1">
                                                <InputLabel id="national">
                                                    {t(Item.COMPANY.REGISTER_NATIONAL)}{' '}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.national}
                                                    fullWidth
                                                    required
                                                    id="national"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.national)}
                                                    helperText={errors.national?.message?.toString()}
                                                    {...register('national', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="city">{t(Item.COMPANY.REGISTER_CITY)}</InputLabel>
                                                <TextField
                                                    name="city"
                                                    size="small"
                                                    value={formValues.company.city}
                                                    fullWidth
                                                    required
                                                    id="city"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeCompany}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="district">
                                                    {t(Item.COMPANY.REGISTER_DISTRICT)}
                                                </InputLabel>
                                                <TextField
                                                    name="district"
                                                    size="small"
                                                    value={formValues.company.district}
                                                    fullWidth
                                                    required
                                                    id="district"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeCompany}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel id="ward">{t(Item.COMPANY.REGISTER_WARD)}</InputLabel>
                                                <TextField
                                                    name="ward"
                                                    size="small"
                                                    value={formValues.company.ward}
                                                    fullWidth
                                                    required
                                                    id="ward"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    label=""
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeCompany}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="street">
                                                    {t(Item.COMPANY.REGISTER_STREET)}
                                                </InputLabel>
                                                <TextField
                                                    name="street"
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="street"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeCompany}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="startDate" error={Boolean(errors.startDate)}>
                                                    {t(Item.COMPANY.REGISTER_START_DATE)}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    value={formValues.company.startDate}
                                                    id="startDate"
                                                    type="datetime-local"
                                                    defaultValue="2017-05-23T10:30"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={Boolean(errors.startDate)}
                                                    helperText={errors.startDate?.message?.toString()}
                                                    {...register('startDate', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="expiredDate" error={Boolean(errors.expiredDate)}>
                                                    {t(Item.COMPANY.REGISTER_END_DATE)}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    size="small"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    value={formValues.company.expiredDate}
                                                    id="expiredDate"
                                                    type="datetime-local"
                                                    defaultValue="2017-05-24T10:30"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={Boolean(errors.expiredDate)}
                                                    helperText={errors.expiredDate?.message?.toString()}
                                                    {...register('expiredDate', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">U</Avatar>}
                                    title={t(Item.USER.REGISTER_TITLE_CARD)}
                                    subheader={new Date().toLocaleDateString()}
                                    action={
                                        <Button variant="outlined" onClick={handleClearUser}>
                                            {t(Item.LABEL_BTN.CLEAR)}
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
                                                <InputLabel htmlFor="userName" error={Boolean(errors.userName)}>
                                                    {t(Item.USER.REGISTER_USER_NAME)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.userName}
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
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.userName)}
                                                    helperText={errors.userName?.message?.toString()}
                                                    {...register('userName', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="password" error={Boolean(errors.password)}>
                                                    {t(Item.USER.REGISTER_PASSWORD)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <OutlinedInput
                                                    id="password"
                                                    type={showPassword ? 'text' : 'password'}
                                                    value={formValues.user.password}
                                                    autoComplete="false"
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                        width: '100%',
                                                        height: '2.4375em',
                                                    }}
                                                    endAdornment={
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                edge="end"
                                                            >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    }
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    {...register('password', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                    label="Password"
                                                />
                                                {Boolean(errors.password) && (
                                                    <FormHelperText error>
                                                        {errors.password?.message?.toString()}
                                                    </FormHelperText>
                                                )}
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="firstName">
                                                    {t(Item.USER.REGISTER_FIRST_NAME)}
                                                </InputLabel>
                                                <TextField
                                                    name="firstName"
                                                    value={formValues.user.firstName}
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="firstName"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeUser}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="lastName">
                                                    {t(Item.USER.REGISTER_LAST_NAME)}
                                                </InputLabel>
                                                <TextField
                                                    name="lastName"
                                                    value={formValues.user.lastName}
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="lastName"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeUser}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-12 d-block p-1">
                                                <InputLabel htmlFor="uTelNo" error={Boolean(errors.uTelNo)}>
                                                    {t(Item.USER.REGISTER_TELNO)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.uTelNo}
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="uTelNo"
                                                    required
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.uTelNo)}
                                                    helperText={errors.uTelNo?.message?.toString()}
                                                    {...register('uTelNo', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-12 d-block p-1">
                                                <InputLabel htmlFor="uEmail" error={Boolean(errors.uEmail)}>
                                                    {t(Item.USER.REGISTER_EMAIL)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.uEmail}
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="uEmail"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.uEmail)}
                                                    helperText={errors.uEmail?.message?.toString()}
                                                    {...register('uEmail', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-lg-6 d-block p-3">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">
                                                        {t(Item.USER.REGISTER_ALLOW_LOGIN)}
                                                    </FormLabel>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={formValues.user.enabled}
                                                                name="enabled"
                                                                onChange={handleAllowLoginChange}
                                                            />
                                                        }
                                                        label={t(Item.COMMON.RADIO_ENABLED)}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-md-6 d-block p-3">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">
                                                        {t(Item.USER.REGISTER_ROLE_ASSIGNED)}
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="role"
                                                        name="role"
                                                        value={formValues.user.role.id}
                                                        defaultValue="1"
                                                    >
                                                        <FormControlLabel
                                                            value="1"
                                                            control={<Radio color="primary" />}
                                                            label={t(Item.COMMON.RADIO_ADMIN)}
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} sm={12} className="text-center pb-4 pt-0">
                                <ButtonGroup
                                    disableElevation
                                    variant="contained"
                                    aria-label="Disabled elevation buttons"
                                >
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        sx={{ mr: 1 }}
                                        disabled={isSubmitting}
                                        onClick={handleSubmit(handleSubmitForm)}
                                    >
                                        {t(Item.LABEL_BTN.CREATE)}
                                    </Button>
                                    <Button variant="outlined" onClick={handleBack}>
                                        {t(Item.LABEL_BTN.BACK)}
                                    </Button>
                                </ButtonGroup>
                            </Grid>
                        </Grid>
                    </Card>
                </Grid>
            </form>

            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
