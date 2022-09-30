import { AccountCircle, PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { AlertColor, Button, ClickAwayListener, FormControl, FormHelperText, Grid, Grow, IconButton, InputAdornment, InputLabel, MenuItem, MenuList, OutlinedInput, Paper, Popper, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { FieldConstants, UrlFeApp } from "../../core/constants/common";
import { getMessage, ERROR_MSG } from "../../core/constants/message";
import { isObjectEmpty } from "../../core/utils/object-utils";
import MessageShow from "../../shared-components/message/message";
import "./login.scss";

const initialValues = {
    userName: "",
    password: "",
};

type Language = {
    key:string;
    name:string;
}

const options:Language[] = [{
        key:'en',
        name:'English'
    }, 
    {
        key:'vi',
        name:'VietNamese'
    }];

export default function Login() {
    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorUserName, setIsErrorUserName] = useState(false);
    const [msgUserName, setMsgUserName] = useState("");
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const [msgPassword, setMsgPassword] = useState("");
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState("");
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('error');
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleChangeValue = (event: any) => {
        const { name, value } = event.target;

        if (FieldConstants.USER_NAME === name) {
            setIsErrorUserName(false);
        }

        if (FieldConstants.PASSWORD === name) {       
            setIsErrorPassword(false)
        }

        setFormValues({
          ...formValues,
          [name]: value,
        });
    }
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = () => {
        if (isObjectEmpty(formValues.userName)) {
            setIsErrorUserName(true);
            setMsgUserName(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        }

        if (isObjectEmpty(formValues.password)) {
            setIsErrorPassword(true);
            setMsgPassword(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        }

        if ("admin" === formValues.userName && "123456" === formValues.password) {
            navigate(UrlFeApp.DASH_BOARD);
        } else {
            setIsShowMessage(true);
            setTypeCompanyMsg("error");
            setCompanyMsg("The username or password is incorrect.");
        }
    }

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    }

    return (
        <div className="login-form-wrapper">
            <form>
                <div className="login-form">
                    <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem', textTransform: 'uppercase' }}
                    >
                        {t('login.title')}
                    </Typography>
                    <div className="login-form-field">
                        <AccountCircle sx={{ mr: 1, my: 0.5}} />
                        <FormControl sx={{ m: 1, width: '30ch', color:red }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">
                                {t('login.userName')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                name="userName"
                                value={formValues.userName}
                                onChange={handleChangeValue}
                                error={isErrorUserName}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton aria-label="toggle password visibility"
                                        edge="end">
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="account"
                            />
                            {isErrorUserName && (
                                <FormHelperText error>
                                    {msgUserName}
                                </FormHelperText>)}
                        </FormControl>
                    </div>
                    <div className="login-form-field">
                        <PasswordOutlined sx={{ mr: 1, my: 0.5 }} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel  required htmlFor="outlined-adornment-password">
                                {t('login.password')}
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                onChange={handleChangeValue}
                                error={isErrorPassword}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                            {isErrorPassword && (
                                <FormHelperText error>
                                    {msgPassword}
                                </FormHelperText>)}
                        </FormControl>
                    </div>
                    <Button variant="outlined" className="justify-center" onClick={handleLogin}>
                        {t('login.btnLogin')}
                    </Button>
                </div>
            </form>
            <MessageShow
                message={companyMsg}
                showMessage={isShowMessage}
                type={typeCompanyMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    )
}
