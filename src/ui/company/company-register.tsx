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
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import cities from 'hanhchinhvn/dist/tinh_tp.json';
import { useState } from 'react';
import { District, Ward } from '../../core/types/administrative';
import { getDistrictsByCityCode, getWardsByDistrictCode } from '../../core/utils/administrative-utils';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { AlertColorConstants, Item, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateForm } from '../../core/constants/validate';
import { currentDateTime, formatDateTimeReq } from '../../core/utils/get-current-datetime';
import { registerCompany } from '../../services/company-service';
import MessageShow from '../../shared-components/message/message';
import { SUCCESS_MSG } from '../../core/constants/message';

const initialValues = {
    company: {
        companyName: '',
        cpEmail: '',
        cpTelNo: '',
        taxNo: '',
        city: '',
        district: '',
        ward: '',
        street: '',
        startDate: currentDateTime,
        expiredDate: currentDateTime,
    },
    user: {
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        uTelNo: '',
        uEmail: '',
        enabled: false,
        role: {
            id: 1,
        },
    },
};

export default function CompanyRegister() {
    const [formValues, setFormValues] = useState(initialValues);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const navigate = useNavigate();
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateForm),
    });

    const handleInputChangeCompany = (event: any) => {
        const { name, value } = event.target;
        console.log({ name, value });
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
        console.log({ name, value });
        setFormValues({
            ...formValues,
            user: {
                ...formValues.user,
                [name]: value,
            },
        });
    };

    const handleCityChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            },
        });

        setDistricts(getDistrictsByCityCode(value));
    };

    const handleDistrictChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
                [name]: value,
            },
        });

        setWards(getWardsByDistrictCode(value));
    };

    const handleWardChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
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

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleResponse = (resp: any) => {
        switch (resp.status) {
            case StatusCode.OK:
                handleMessage(true, t(SUCCESS_MSG.S01_002), AlertColorConstants.SUCCESS);
                navigate(UrlFeApp.COMPANY.SEARCH);
                break;
            case StatusCode:
                handleMessage(true, resp.message, AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, resp.message, AlertColorConstants.WARNING);
                break;
        }
    };

    const handleSubmitForm = () => {
        let objValue: any = {};

        if (formValues.user.enabled) {
            objValue = {
                company: {
                    ...formValues.company,
                    startDate: formatDateTimeReq(formValues.company.startDate),
                    expiredDate: formatDateTimeReq(formValues.company.expiredDate),
                },
                user: {
                    ...formValues.user,
                    enabled: 1,
                },
            };
        } else {
            objValue = {
                company: {
                    ...formValues.company,
                    startDate: formatDateTimeReq(formValues.company.startDate),
                    expiredDate: formatDateTimeReq(formValues.company.expiredDate),
                },
                user: {
                    ...formValues.user,
                    enabled: 0,
                },
            };
        }

        registerCompany(objValue)
            .then((resp) => {
                handleResponse(resp);
            })
            .catch(() => {
                handleMessage(true, t(Item.MESSAGE.ERROR), AlertColorConstants.ERROR);
            });
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    return (
        <div>
            <form onSubmit={handleSubmitForm}>
                <Typography
                    variant="h5"
                    className="mb-4"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    {t(Item.COMPANY.REGISTER_TITLE)}
                    <Divider />
                </Typography>
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
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.companyName)}
                                                >
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
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.companyName)}
                                                    helperText={t(errors.companyName?.message?.toString() as string)}
                                                    {...register('companyName', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.cpEmail)}
                                                >
                                                    {t(Item.COMPANY.REGISTER_EMAIL)}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpEmail}
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
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.cpTelNo)}
                                                >
                                                    {t(Item.COMPANY.REGISTER_TELNO)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpTelNo}
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
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.cpTelNo)}
                                                    helperText={errors.cpTelNo?.message?.toString()}
                                                    {...register('cpTelNo', {
                                                        onChange: (e) => handleInputChangeCompany(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.taxNo)}
                                                >
                                                    {t(Item.COMPANY.REGISTER_TAX_NO)}{' '}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.taxNo}
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
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t(Item.COMPANY.REGISTER_CITY)}
                                                </InputLabel>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    variant="outlined"
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        name="city"
                                                        displayEmpty
                                                        value={formValues.company.city}
                                                        onChange={handleCityChange}
                                                    >
                                                        <MenuItem value="" selected={true} disabled>
                                                            <em>{t(Item.MESSAGE.CITY_LABEL)}</em>
                                                        </MenuItem>
                                                        {Object.values(cities).map((city) => (
                                                            <MenuItem value={city.code}>{city.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t(Item.COMPANY.REGISTER_DISTRICT)}
                                                </InputLabel>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    variant="outlined"
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        name="district"
                                                        displayEmpty
                                                        value={formValues.company.district}
                                                        onChange={handleDistrictChange}
                                                    >
                                                        <MenuItem value="">
                                                            <em>{t(Item.MESSAGE.DISTRICT_LABEL)}</em>
                                                        </MenuItem>
                                                        {districts.map((dis) => (
                                                            <MenuItem value={dis.code}>{dis.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t(Item.COMPANY.REGISTER_WARD)}
                                                </InputLabel>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    variant="outlined"
                                                >
                                                    <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        name="ward"
                                                        displayEmpty
                                                        value={formValues.company.ward}
                                                        onChange={handleInputChangeCompany}
                                                    >
                                                        <MenuItem value="">
                                                            <em>{t(Item.MESSAGE.WARD_LABEL)}</em>
                                                        </MenuItem>
                                                        {wards.map((ward) => (
                                                            <MenuItem value={ward.code}>{ward.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t(Item.COMPANY.REGISTER_STREET)}
                                                </InputLabel>
                                                <TextField
                                                    name="street"
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeCompany}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.startDate)}
                                                >
                                                    {t(Item.COMPANY.REGISTER_END_DATE)}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    value={formValues.company.startDate}
                                                    id="dateStart"
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
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.expiredDate)}
                                                >
                                                    {t(Item.COMPANY.REGISTER_START_DATE)}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    value={formValues.company.expiredDate}
                                                    id="dateEnd"
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
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.userName)}
                                                >
                                                    {t(Item.USER.REGISTER_USER_NAME)}
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
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.userName)}
                                                    helperText={errors.userName?.message?.toString()}
                                                    {...register('userName', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.password)}
                                                >
                                                    {t(Item.USER.REGISTER_PASSWORD)}
                                                    <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    type={'password'}
                                                    value={formValues.user.password}
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    required
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    error={Boolean(errors.password)}
                                                    helperText={errors.password?.message?.toString()}
                                                    {...register('password', {
                                                        onChange: (e) => handleInputChangeUser(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t(Item.USER.REGISTER_FRIST_NAME)}
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
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeUser}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
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
                                                    id="outlined-required"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    onChange={handleInputChangeUser}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-12 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.uTelNo)}
                                                >
                                                    {t(Item.USER.REGISTER_TELNO)}
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
                                                    id="outlined-required"
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
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.uEmail)}
                                                >
                                                    {t(Item.USER.REGISTER_EMAIL)}
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
                                                    id="outlined-required"
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
                                                        label={t(Item.COMMON.RADIO_ENBLED)}
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
                                                        <FormControlLabel
                                                            value="2"
                                                            control={<Radio color="primary" />}
                                                            label={t(Item.COMMON.RADIO_USER)}
                                                            disabled
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                            <Grid item xs={12} sm={12} className="text-center pb-4 pt-0">
                                <Button variant="contained" color="primary" onClick={handleSubmit(handleSubmitForm)}>
                                    {t(Item.LABEL_BTN.SAVE)}
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
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
