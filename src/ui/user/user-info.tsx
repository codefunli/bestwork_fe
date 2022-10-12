import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardContent, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Switch, TextField, Typography, AlertColor, FormControl, Select, MenuItem, FormHelperText } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { UserResDto } from '../../models/user-res-dto';
import { getUser, putUser } from '../../services/user-service';
import { UrlFeApp, AlertColorConstants, StatusCode, DefaultImage } from '../../core/constants/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateUserForm } from '../../core/constants/validate';
import MessageShow from '../../shared-components/message/message';
import { getCompanies } from '../../services/company-service';
import FileUpload from '../../shared-components/file-upload/file-upload';
import "./user.scss";

const initialValues: UserResDto = {
    id: 0,
    userId: "",
    currentCompanyId: "",
    enabled: false,
    role: "",
    userNm: "",
    email: "",
    firstNm: "",
    lastNm: "",
    isDeleted: false,
    isBlocked: false,
    countLoginFailed: 0,
    createdDt: "",
    updatedDt: "",
};

export default function UserInfo() {
    const { userId } = useParams();
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
        resolver: yupResolver(validateUserForm),
    });

    useEffect(() => {
        const fetchCompanies = async () => {
            const companies = await getCompanies({});
            if (companies && companies.data && companies.data.content) {
                setCompanies(companies?.data?.content);
            };
        };
        fetchCompanies();
    }, [])

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await getUser(userId);

            if (data && data.data) {
                setFormValues(data.data);
                reset();
            };
        }

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
        putUser(userId, formValues).then((res) => {
            handleResponse(res);
        }).catch((err) => {
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
            <div className='row'>
                <div className="col-sm-12 col-md-6">
                    <Typography variant="h5">
                        <span className="font-weight-bold text-uppercase">{t('user.title')}</span>
                    </Typography>
                </div>
            </div>
            <form>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                >
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
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="userNm" error={Boolean(errors.userNm)}>{t("user.info.userName")} <span className="input-required">*</span></InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 }
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
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="email" error={Boolean(errors.email)}>{t("user.info.email")} <span className="input-required">*</span></InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 }
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
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="firstNm" error={Boolean(errors.firstNm)}>{t("user.info.firstName")} <span className="input-required">*</span></InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 }
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
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="lastNm" error={Boolean(errors.lastNm)}>{t("user.info.lastName")} <span className="input-required">*</span></InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 }
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
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="currentCompanyId" error={Boolean(errors.currentCompanyId)}>{t("user.info.company")} <span className="input-required">*</span></InputLabel>
                                            <FormControl
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                variant="outlined"
                                                error
                                            >
                                                <Select
                                                    value={formValues.currentCompanyId}
                                                    displayEmpty
                                                    sx={{
                                                        '& legend': { display: 'none' },
                                                        '& fieldset': { top: 0 }
                                                    }}
                                                    error={Boolean(errors.currentCompanyId)}
                                                    {...register('currentCompanyId', {
                                                        onChange: (e) => handleInputChange(e),
                                                    })}
                                                >
                                                    <MenuItem value="" disabled>
                                                        <em>{t('user.search.selectCompanyName')}</em>
                                                    </MenuItem>
                                                    {companies && companies.length > 0 && companies.map((company: any) => (
                                                        <MenuItem
                                                            value={company.companyId}
                                                            selected={company.companyId === formValues.currentCompanyId}
                                                        >
                                                            {company.companyName}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                                {Boolean(errors.currentCompanyId) &&
                                                    <FormHelperText id="component-error-text">{errors?.currentCompanyId?.message as string}</FormHelperText>
                                                }
                                            </FormControl>
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="countLoginFailed">{t("user.info.countLoginFailed")}</InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 }
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
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="enabled">{t("user.info.enabled")}</InputLabel>
                                            <Switch
                                                checked={formValues.enabled}
                                                name="enabled"
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="role">{t("user.info.role")}</InputLabel>
                                            <RadioGroup
                                                row
                                                aria-label="role"
                                                name="role"
                                                value={formValues.role}
                                                defaultValue="ADMIN"
                                                onChange={handleInputChange}
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
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="isDeleted">{t("user.info.deleted")}</InputLabel>
                                            <Switch
                                                checked={formValues.isDeleted}
                                                name="isDeleted"
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="isBlocked">{t("user.info.blocked")}</InputLabel>
                                            <Switch
                                                checked={formValues.isBlocked}
                                                name="isBlocked"
                                                onChange={handleSwitchChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='text-center justify-center mt-4'>
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
                                                {t("button.btnSave")}
                                            </Button>
                                            <Button
                                                onClick={handleCancelChange}
                                                variant="outlined"
                                            >
                                                {t("button.btnBack")}
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
            <MessageShow
                message={userMsg}
                showMessage={isShowMsg}
                type={userMsgType}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
};
