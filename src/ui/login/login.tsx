import { AccountCircle, PasswordOutlined, Visibility, VisibilityOff } from '@mui/icons-material';
import {
    AlertColor,
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography,
} from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { AlertColorConstants, FieldConstants, HttpStatusCode, UrlFeApp } from '../../core/constants/common';
import { ERROR_MSG, getMessage } from '../../core/constants/message';
import { useAppDispatch } from '../../core/hook/redux';
import { userActions } from '../../core/redux/user-slice';
import { isObjectEmpty } from '../../core/utils/object-utils';
import { login } from '../../services/login-service';
import MessageShow from '../../shared-components/message/message';
import './login.scss';

const initialValues = {
    userName: '',
    password: '',
};

export default function Login() {
    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorUserName, setIsErrorUserName] = useState(false);
    const [msgUserName, setMsgUserName] = useState('');
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const [msgPassword, setMsgPassword] = useState('');
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('error');
    const { t } = useTranslation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleChangeValue = (event: any) => {
        const { name, value } = event.target;

        if (FieldConstants.USER_NAME === name) {
            setIsErrorUserName(false);
        }

        if (FieldConstants.PASSWORD === name) {
            setIsErrorPassword(false);
        }

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleResponse = (resp: any) => {
        switch (resp.status) {
            case HttpStatusCode.OK:
                handleMessage(true, resp.message, AlertColorConstants.SUCCESS);
                dispatch(userActions.setIsLogined(true));
                navigate(UrlFeApp.MAIN_APP);
                break;
            case HttpStatusCode.ERROR:
                handleMessage(true, t('message.loginFailed'), AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, t('message.loginFailed'), AlertColorConstants.WARNING);
                break;
        }
    };

    const handleLogin = () => {
        let isStopLogin = false;
        if (isObjectEmpty(formValues.userName)) {
            isStopLogin = true;
            setIsErrorUserName(true);
            setMsgUserName(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]));
        } else {
            setIsErrorUserName(false);
        }

        if (isObjectEmpty(formValues.password)) {
            isStopLogin = true;
            setIsErrorPassword(true);
            setMsgPassword(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]));
        } else {
            setIsErrorPassword(false);
        }

        if (isStopLogin) {
            return;
        } else {
            let objectLogin = {
                username: formValues.userName,
                password: formValues.password,
            };

            login(objectLogin)
                .then((resp) => {
                    handleResponse(resp);
                })
                .catch(() => {
                    handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
                });
        }
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    return (
        <div className="login-form-wrapper">
            <form>
                <div className="login-form">
                    <Typography
                        variant="h6"
                        component="h1"
                        sx={{ textAlign: 'center', mb: '1.5rem', textTransform: 'uppercase' }}
                    >
                        {t('login.title')}
                    </Typography>
                    <div className="login-form-field">
                        <AccountCircle sx={{ mr: 1, my: 0.5 }} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">
                                {t('login.userName')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type="text"
                                name="userName"
                                value={formValues.userName}
                                onChange={handleChangeValue}
                                error={isErrorUserName}
                                autoComplete="false"
                                label="Password"
                            />
                            {isErrorUserName && <FormHelperText error>{msgUserName}</FormHelperText>}
                        </FormControl>
                    </div>
                    <div className="login-form-field">
                        <PasswordOutlined sx={{ mr: 1, my: 0.5 }} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">
                                {t('login.password')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                onChange={handleChangeValue}
                                error={isErrorPassword}
                                autoComplete="false"
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
                                label="Password"
                            />
                            {isErrorPassword && <FormHelperText error>{msgPassword}</FormHelperText>}
                        </FormControl>
                    </div>
                    <Button variant="outlined" className="justify-center" onClick={handleLogin}>
                        {t('login.btnLogin')}
                    </Button>
                </div>
            </form>

            <div className="forgot-password-btn mt-4">
                <Link to={UrlFeApp.FORGOT_PASSWORD.FORGOT}>
                    {t('forgotPassword.title')}?
                </Link>
            </div>

            <MessageShow
                message={companyMsg}
                showMessage={isShowMessage}
                type={typeCompanyMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
}
