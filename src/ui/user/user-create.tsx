import { yupResolver } from '@hookform/resolvers/yup';
import {
    AlertColor,
    Button,
    ButtonGroup,
    Card,
    CardContent,
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
import { useNavigate } from 'react-router-dom';
import { AlertColorConstants, DefaultImage, StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateCreateUserForm } from '../../core/constants/validate';
import { getCompanies } from '../../services/company-service';
import { createUsers } from '../../services/user-service';
import FileUpload from '../../shared-components/file-upload/file-upload';
import MessageShow from '../../shared-components/message/message';
import './user.scss';

const initialValues: any = {
    userNm: '',
    companyId: '',
    role: 'ADMIN',
    email: '',
    firstNm: '',
    lastNm: '',
    enabled: false,
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

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateUserForm),
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await getCompanies({});
            if (companies && companies.data && companies.data.content) {
                setCompanies(companies?.data?.content);
            }
        };
        fetchCompanies();
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

    const handleResponse = (resp: any) => {
        switch (resp.status) {
            case StatusCode.OK:
                handleMessage(true, resp.message, AlertColorConstants.SUCCESS);
                navigate(UrlFeApp.USER.SEARCH);
                break;
            case StatusCode:
                handleMessage(true, resp.message, AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, resp.message, AlertColorConstants.WARNING);
                break;
        }
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
            [name]: checked,
        });
    };

    const handleSubmitForm = () => {
        createUsers(formValues)
            .then((res) => {
                handleResponse(res);
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const onChangeAvatar = (event: any) => {
        setImgData(event.target.files[0]);
    };

    const handleCloseMsg = () => {
        setIsShowMsg(false);
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
                                    {formValues.firstNm} {formValues.lastNm}
                                </Typography>
                                <Typography variant="body1" color="text.secondary">
                                    {formValues.userNm}
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
                                            <InputLabel htmlFor="userNm" error={Boolean(errors.userNm)}>
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
                                                id="userNm"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.userNm}
                                                error={Boolean(errors.userNm)}
                                                helperText={t(errors.userNm?.message?.toString() as string)}
                                                {...register('userNm', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="email" error={Boolean(errors.email)}>
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
                                                id="email"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.email}
                                                error={Boolean(errors.email)}
                                                helperText={t(errors.email?.message?.toString() as string)}
                                                {...register('email', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="firstNm" error={Boolean(errors.firstNm)}>
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
                                                id="firstNm"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.firstNm}
                                                error={Boolean(errors.firstNm)}
                                                helperText={t(errors.firstNm?.message?.toString() as string)}
                                                {...register('firstNm', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="lastNm" error={Boolean(errors.lastNm)}>
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
                                                id="lastNm"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={formValues.lastNm}
                                                error={Boolean(errors.lastNm)}
                                                helperText={t(errors.lastNm?.message?.toString() as string)}
                                                {...register('lastNm', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="companyId" error={Boolean(errors.companyId)}>
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
                                                    value={formValues.companyId}
                                                    displayEmpty
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 },
                                                    }}
                                                    error={Boolean(errors.companyId)}
                                                    {...register('companyId', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                >
                                                    <MenuItem value="" selected={true} disabled>
                                                        <em>{t('user.search.selectCompanyName')}</em>
                                                    </MenuItem>
                                                    {companies &&
                                                        companies.length > 0 &&
                                                        companies.map((company: any) => (
                                                            <MenuItem value={company.companyId}>
                                                                {company.companyName}
                                                            </MenuItem>
                                                        ))}
                                                </Select>
                                                {Boolean(errors.companyId) && (
                                                    <FormHelperText id="component-error-text">
                                                        {errors?.companyId?.message as string}
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
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="role">
                                                {t('user.info.role')} <span className="input-required">*</span>
                                            </InputLabel>
                                            <RadioGroup
                                                row
                                                aria-label="role"
                                                value={formValues.role}
                                                defaultValue="ADMIN"
                                                {...register('role', {
                                                    onChange: (e) => handleInputChange(e),
                                                })}
                                            >
                                                <FormControlLabel
                                                    value="ADMIN"
                                                    control={<Radio color="primary" />}
                                                    label={t('radio.admin')}
                                                />
                                                <FormControlLabel
                                                    value="USER"
                                                    control={<Radio color="primary" />}
                                                    label={t('radio.user')}
                                                />
                                            </RadioGroup>
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
                                                size="small"
                                                variant="contained"
                                                disabled={isSubmitting}
                                                onClick={handleSubmit(handleSubmitForm)}
                                            >
                                                {t('button.btnCreate')}
                                            </Button>
                                            <Button onClick={handleClearForm} variant="outlined">
                                                {t('button.btnClear')}
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
