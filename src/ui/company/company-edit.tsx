import { yupResolver } from '@hookform/resolvers/yup';
import {
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
    Radio,
    RadioGroup,
    Switch,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { Item, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateEditCompanyForm } from '../../core/constants/validate';
import { formatDateTimeReq, formatDateTimeResNoneSuffixes } from '../../core/utils/get-current-datetime';
import { getCompanyById, updateCompany } from '../../services/company-service';
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
        enabled: false,
        role: {
            id: 1,
        },
    },
};
export default function CompanyEdit() {
    const params = useParams();
    const [formValues, setFormValues] = useState(initialValues);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateEditCompanyForm),
    });

    useEffect(() => {
        if (params.id !== undefined) {
            getCompanyById(params.id).then((value: any) => {
                if (value && value.data) {
                    setFormValues({
                        company: {
                            ...value.data.company,
                            startDate: formatDateTimeResNoneSuffixes(value.data.company.startDate),
                            expiredDate: formatDateTimeResNoneSuffixes(value.data.company.expiredDate),
                        },
                        user: {
                            ...value.data.user,
                            enabled: value.data.user.enabled,
                        },
                    });
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

    const handleAllowLoginChange = (event: any) => {
        const { name } = event.target;
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

    const handleEdit = () => {
        const companyValue: any = {
            ...formValues.company,
            startDate: formatDateTimeReq(formValues.company.startDate),
            expiredDate: formatDateTimeReq(formValues.company.expiredDate),
        };
        updateCompany(companyValue)
            .then((res: any) => {
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

    return (
        <div>
            <div className="p-label-header">
                <Typography
                    variant="h5"
                    className="btn disabled text-white bg-light opacity-100 border-customTheme"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    <div className="particletext">{t('edit.title')}</div>
                    <Divider />
                </Typography>
            </div>
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
                                                {t('edit.company.name')} <span className="input-required">*</span>
                                            </InputLabel>
                                            <TextField
                                                size="small"
                                                value={formValues.company.companyName}
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-12 d-block p-1">
                                            <InputLabel id="outlined-adornment-amount">
                                                {t(Item.COMPANY.REGISTER_NATIONAL)}{' '}
                                            </InputLabel>
                                            <TextField
                                                name="national"
                                                size="small"
                                                value={formValues.company.national}
                                                fullWidth={true}
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
                                                error={Boolean(errors.national)}
                                                helperText={errors.national?.message?.toString()}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 p-1">
                                            <InputLabel id="outlined-adornment-amount">
                                                {t(Item.COMPANY.REGISTER_CITY)}
                                            </InputLabel>
                                            <TextField
                                                name="city"
                                                size="small"
                                                value={formValues.company.city}
                                                fullWidth={true}
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
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 p-1">
                                            <InputLabel id="outlined-adornment-amount">
                                                {t(Item.COMPANY.REGISTER_DISTRICT)}
                                            </InputLabel>
                                            <TextField
                                                name="district"
                                                size="small"
                                                value={formValues.company.district}
                                                fullWidth={true}
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
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel id="outlined-adornment-amount">
                                                {t(Item.COMPANY.REGISTER_WARD)}
                                            </InputLabel>
                                            <TextField
                                                name="ward"
                                                size="small"
                                                value={formValues.company.ward}
                                                fullWidth={true}
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
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t(Item.COMPANY.REGISTER_STREET)}
                                            </InputLabel>
                                            <TextField
                                                name="street"
                                                size="small"
                                                fullWidth={true}
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                id="outlined-required"
                                                placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                onChange={handleInputChange}
                                                autoComplete="off"
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
                                                fullWidth={true}
                                                size="small"
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
                                                size="small"
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                value={formValues.user.firstName}
                                                disabled
                                                size="small"
                                                fullWidth={true}
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                id="outlined-required"
                                                placeholder={t('common.placeholder')}
                                                onChange={handleInputChange}
                                                autoComplete="off"
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('edit.user.lastName')}:
                                            </InputLabel>
                                            <TextField
                                                name="lastName"
                                                value={formValues.user.lastName}
                                                disabled
                                                size="small"
                                                fullWidth={true}
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                id="outlined-required"
                                                placeholder={t('common.placeholder')}
                                                onChange={handleInputChange}
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
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
                                                fullWidth={true}
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
                                                autoComplete="off"
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-lg-6 d-block p-3">
                                            <FormControl component="fieldset">
                                                <FormLabel component="legend">{t('edit.user.allowLogin')}</FormLabel>
                                                <FormControlLabel
                                                    control={
                                                        <Switch
                                                            checked={formValues.user.enabled}
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
                                                <FormLabel component="legend">{t('edit.user.roleAssigned')}:</FormLabel>
                                                <RadioGroup
                                                    row
                                                    aria-label="role"
                                                    name="role"
                                                    value={formValues.user.role.id}
                                                >
                                                    <FormControlLabel
                                                        value="2"
                                                        control={<Radio color="primary" />}
                                                        label={t('radio.admin')}
                                                        disabled
                                                    />
                                                    <FormControlLabel
                                                        value="1"
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
                        <Grid item xs={12} sm={12} className="text-center pb-4 pt-0 mt-0" marginTop={3}>
                            <Button
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                onClick={handleSubmit(handleEdit)}
                            >
                                {t('button.btnSave')}
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Grid>

            <ApiAlert response={resForHandleMsg} />
        </div>
    );
}
