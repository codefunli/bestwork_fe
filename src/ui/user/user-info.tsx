import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, ButtonGroup, Card, CardContent, FormControlLabel, Grid, InputLabel, Radio, RadioGroup, Switch, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { useTranslation } from 'react-i18next';
import { UserResDto } from '../../models/user-res-dto';
import { getUserInfo } from '../../services/user-service';
import { UrlFeApp } from '../../core/constants/common';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateForm } from '../../core/constants/validate';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
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
    const [imgData, setImgData] = useState("https://scontent.fdad3-4.fna.fbcdn.net/v/t1.6435-9/82387386_3107327976158024_841015533552795648_n.jpg?stp=dst-jpg_s1080x2048&_nc_cat=111&ccb=1-7&_nc_sid=454319&_nc_ohc=07KAinhqPpEAX-ckh3f&_nc_ht=scontent.fdad3-4.fna&oh=00_AT_1j38NHBWL_Zvp6F2vfoDd8wWjWh3mfmc9A7MOGq95FA&oe=6363B991");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateForm),
    });

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await getUserInfo(userId);

            if (data && data.data) {
                setFormValues(data.data);
            };
        }

        fetchUserInfo();
    }, [userId]);

    const handleCancelChange = (e: any) => {
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
            [name]: checked,
        });
    };

    const handleSubmitChange = (e: any) => {
        e.preventDefault();
        console.log(formValues);
    };

    const onChangePicture = (e: any) => {
        if (e.target.files[0]) {
            console.log("picture: ", e.target.files);
            const reader: any = new FileReader();
            reader.addEventListener("load", () => {
                setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
        }
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
            <form onSubmit={handleSubmitChange}>
                <Grid
                    container
                    direction="row"
                    spacing={3}
                >
                    <Grid item xs={12} md={3} sx={{ mt: 1, mb: 1 }}>
                        <Card className="general-info">
                            <label htmlFor="chosen-avatar" className="avatar">
                                <img
                                    alt="Avatar"
                                    src={imgData}
                                />
                                <span>
                                    <LocalSeeIcon />
                                </span>
                            </label>
                            <input
                                accept="image/*"
                                id="chosen-avatar"
                                type="file"
                                hidden
                                onChange={onChangePicture}
                            />
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
                    <Grid item xs={12} md={9} sx={{ mt: 1, mb: 1 }}>
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
                                            <InputLabel htmlFor="userNm">{t("user.info.userName")} <span className="input-required">*</span></InputLabel>
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
                                                placeholder="Please input your username"
                                                name="userNm"
                                                value={formValues.userNm}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="email">{t("user.info.email")} <span className="input-required">*</span></InputLabel>
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
                                                placeholder="Please input your username"
                                                name="email"
                                                value={formValues.email}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="firstNm">{t("user.info.firstName")} <span className="input-required">*</span></InputLabel>
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
                                                placeholder="Please input your username"
                                                name="firstNm"
                                                value={formValues.firstNm}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="lastNm">{t("user.info.lastName")} <span className="input-required">*</span></InputLabel>
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
                                                placeholder="Please input your username"
                                                name="lastNm"
                                                value={formValues.lastNm}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    </div>
                                    <div className='row justify-center m-1'>
                                        <div className='col-12 col-sm-6 d-block p-1'>
                                            <InputLabel htmlFor="currentCompanyId">{t("user.info.company")} <span className="input-required">*</span></InputLabel>
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
                                                id="currentCompanyId"
                                                label=""
                                                placeholder="Please input your username"
                                                name="currentCompanyId"
                                                value={formValues.currentCompanyId}
                                                onChange={handleInputChange}
                                            />
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
                                                placeholder="Please input your username"
                                                name="countLoginFailed"
                                                value={formValues.countLoginFailed}
                                                onChange={handleInputChange}
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
                                    <div className='text-center justify-center m-1'>
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button sx={{ mr: 1 }} size="small" variant="contained" type="submit">{t("button.btnSave")}</Button>
                                            <Button onClick={handleCancelChange} variant="outlined">{t("button.btnCancel")}</Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};
