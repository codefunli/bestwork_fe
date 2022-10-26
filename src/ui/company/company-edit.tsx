import { yupResolver } from '@hookform/resolvers/yup';
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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { AlertColorConstants, UrlFeApp } from '../../core/constants/common';
import { validateEditCompanyForm } from '../../core/constants/validate';
import { District, Ward } from '../../core/types/administrative';
import { getDistrictsByCityCode, getWardsByDistrictCode } from '../../core/utils/administrative-utils';
import { getCompanyById, updateCompany } from '../../services/company-service';
import MessageShow from '../../shared-components/message/message';

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
        startDate: '',
        expiredDate: '',
    },
    user: {
        userName: '',
        password: '',
        firstNm: '',
        lastNm: '',
        uTelNo: '',
        uEmail: '',
        enable: false,
        role: 'admin',
    },
};
export default function CompanyEdit() {
    const params = useParams();
    const [formValues, setFormValues] = useState(initialValues);
    const [districts, setDistricts] = useState<District[]>([]);
    const [wards, setWards] = useState<Ward[]>([]);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateEditCompanyForm),
    });

    useEffect(() => {
        if (params.id != undefined) {
            getCompanyById(params.id).then((value: any) => {
                if (value != undefined && value.data != undefined) {
                    let objValue: any = {};
                    if (value.data.user.isEnable === 1) {
                        objValue = {
                            ...value.data,
                            company: {
                                ...value.data.company,
                                startDate: `${value.data.company.startDate.substring(0, 16)}`,
                                expiredDate: `${value.data.company.expiredDate.substring(0, 16)}`,
                            },
                            user: {
                                ...value.data.user,
                                enabled: true,
                            },
                        };
                    } else if (value.data.user.isEnable === 0) {
                        objValue = {
                            ...value.data,
                            company: {
                                ...value.data.company,
                                startDate: `${value.data.company.startDate.substring(0, 16)}`,
                                expiredDate: `${value.data.company.expiredDate.substring(0, 16)}`,
                            },
                            user: {
                                ...value.data.user,
                                enabled: false,
                            },
                        };
                    }

                    console.log(objValue);

                    setFormValues(objValue);
                    setDistricts(getDistrictsByCityCode(value.data.company.city || ''));
                    setWards(getWardsByDistrictCode(value.data.company.district || ''));
                }

                reset();
            });
        }
    }, [params.id]);

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            company: {
                ...formValues.company,
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
        const { name } = event.target;
        setFormValues({
            ...formValues,
            user: {
                ...formValues.user,
                [name]: !formValues.user.enable,
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

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const handleEdit = () => {
        const companyValue = {
            ...formValues.company,
        };
        updateCompany(companyValue)
            .then((data: any) => {
                handleMessage(true, data.message, 'success');
                if (data.status === 'OK') {
                    setTimeout(() => {
                        navigate(UrlFeApp.COMPANY.SEARCH);
                    }, 1000);
                }
            })
            .catch(() => {
                handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
            });
    };

    return (
        <>
            <form>
                <Typography
                    variant="h5"
                    className="mb-4"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    {t('edit.title')}
                    <Divider />
                </Typography>
                <Grid container>
                    <Card style={{ width: '100%' }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={6}>
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">C</Avatar>}
                                    title={t('edit.company.title')}
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
                                                    error={Boolean(errors.companyName)}
                                                >
                                                    {t('edit.company.name')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.companyName}
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    required
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.companyName)}
                                                    helperText={t(errors.companyName?.message?.toString() as string)}
                                                    {...register('companyName', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.cpEmail)}
                                                >
                                                    {t('edit.company.email')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpEmail}
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    required
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.cpEmail)}
                                                    helperText={errors.cpEmail?.message?.toString()}
                                                    {...register('cpEmail', {
                                                        onChange: (e) => handleInputChange(e),
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
                                                    {t('edit.company.telNo')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.cpTelNo}
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.cpTelNo)}
                                                    helperText={errors.cpTelNo?.message?.toString()}
                                                    {...register('cpTelNo', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.taxNo)}
                                                >
                                                    {t('edit.company.taxNo')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    value={formValues.company.taxNo}
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    required
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.taxNo)}
                                                    helperText={errors.taxNo?.message?.toString()}
                                                    {...register('taxNo', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t('edit.company.city')}
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
                                                            <em>{t('message.cityLabel')}</em>
                                                        </MenuItem>
                                                        {Object.values(cities).map((city) => (
                                                            <MenuItem value={city.code}>{city.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-sm-6 p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t('edit.company.district')}
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
                                                        <MenuItem value="" selected={true} disabled>
                                                            <em>{t('message.districtLabel')}</em>
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
                                                    {t('edit.company.ward')}
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
                                                        onChange={handleWardChange}
                                                    >
                                                        <MenuItem value="" selected={true} disabled>
                                                            <em>{t('message.wardLabel')}</em>
                                                        </MenuItem>
                                                        {wards.map((ward) => (
                                                            <MenuItem value={ward.code}>{ward.name}</MenuItem>
                                                        ))}
                                                    </Select>
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t('edit.company.street')}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    name="street"
                                                    value={formValues.company.street}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.startDate)}
                                                >
                                                    {t('edit.company.startDate')}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    value={formValues.company.startDate}
                                                    id="dateStart"
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={Boolean(errors.startDate)}
                                                    helperText={errors.startDate?.message?.toString()}
                                                    {...register('startDate', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.expiredDate)}
                                                >
                                                    {t('edit.company.endDate')}
                                                </InputLabel>
                                                <TextField
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    value={formValues.company.expiredDate}
                                                    id="dateEnd"
                                                    type="datetime-local"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                    error={Boolean(errors.expiredDate)}
                                                    helperText={errors.expiredDate?.message?.toString()}
                                                    {...register('expiredDate', {
                                                        onChange: (e) => handleInputChange(e),
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
                                    title={t('edit.user.title')}
                                    subheader={new Date().toLocaleDateString()}
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
                                                    {t('edit.user.userName')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.userName}
                                                    disabled
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
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.userName)}
                                                    helperText={errors.userName?.message?.toString()}
                                                    {...register('userName', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.password)}
                                                >
                                                    {t('edit.user.password')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    type={'password'}
                                                    disabled
                                                    value="hidden"
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    required
                                                    id="outlined-r equired"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.password)}
                                                    helperText={errors.password?.message?.toString()}
                                                    {...register('password', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t('edit.user.firstName')}
                                                </InputLabel>
                                                <TextField
                                                    name="firstName"
                                                    value={formValues.user.firstNm}
                                                    disabled
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-6 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t('edit.user.lastName')}:
                                                </InputLabel>
                                                <TextField
                                                    name="lastName"
                                                    value={formValues.user.lastNm}
                                                    disabled
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-sm-12 d-block p-1">
                                                <InputLabel
                                                    htmlFor="outlined-adornment-amount"
                                                    error={Boolean(errors.uTelNo)}
                                                >
                                                    {t('edit.user.telNo')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.uTelNo}
                                                    disabled
                                                    size="small"
                                                    fullWidth
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    error={Boolean(errors.uTelNo)}
                                                    helperText={errors.uTelNo?.message?.toString()}
                                                    {...register('uTelNo', {
                                                        onChange: (e) => handleInputChange(e),
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
                                                    {t('edit.user.email')} <span className="input-required">*</span>
                                                </InputLabel>
                                                <TextField
                                                    value={formValues.user.uEmail}
                                                    size="small"
                                                    fullWidth
                                                    disabled
                                                    sx={{
                                                        mt: 1,
                                                        mb: 1,
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    id="outlined-required"
                                                    error={Boolean(errors.uEmail)}
                                                    placeholder={t('common.placeholder')}
                                                    helperText={errors.uEmail?.message?.toString()}
                                                    {...register('uEmail', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 col-lg-6 d-block p-3">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">
                                                        {t('edit.user.allowLogin')}
                                                    </FormLabel>
                                                    <FormControlLabel
                                                        control={
                                                            <Switch
                                                                checked={formValues.user.enable}
                                                                disabled
                                                                name="enable"
                                                                onChange={handleAllowLoginChange}
                                                            />
                                                        }
                                                        label={t('radio.enabled')}
                                                    />
                                                </FormControl>
                                            </div>
                                            <div className="col-12 col-md-6 d-block p-3">
                                                <FormControl component="fieldset">
                                                    <FormLabel component="legend">
                                                        {t('edit.user.roleAssigned')}:
                                                    </FormLabel>
                                                    <RadioGroup
                                                        row
                                                        aria-label="role"
                                                        name="role"
                                                        value={formValues.user.role}
                                                        defaultValue="companyadmin"
                                                    >
                                                        <FormControlLabel
                                                            value="companyadmin"
                                                            control={<Radio color="primary" />}
                                                            label={t('radio.admin')}
                                                            disabled
                                                        />
                                                        <FormControlLabel
                                                            value="companyuser"
                                                            control={<Radio color="primary" />}
                                                            label={t('radio.user')}
                                                            disabled
                                                        />
                                                    </RadioGroup>
                                                </FormControl>
                                            </div>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Grid>
                        </Grid>
                    </Card>
                    <Grid item xs={12} sm={12} className="text-center" marginTop={3} onClick={handleSubmit(handleEdit)}>
                        <Button variant="contained" color="primary">
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
        </>
    );
}
