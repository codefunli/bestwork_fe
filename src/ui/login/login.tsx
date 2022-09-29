import { AccountCircle, PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { Trans, Translation, useTranslation } from "react-i18next";
import { FieldConstants } from "../../core/constants/common";
import { getMessage, ERROR_MSG } from "../../core/constants/message";
import { isObjectEmpty } from "../../core/utils/object-utils";
import i18n from "../../transaction/i18n";
import "./login.scss";

const initialValues = {
    userName: "",
    password: "",
};
// https://www.bezkoder.com/react-hook-form-material-ui-validation/
// https://dev.to/omardiaa48/how-to-make-a-robust-form-validation-in-react-with-material-ui-fields-1kb0
// https://angularfixing.com/onchange-is-specified-more-than-once-so-this-usage-will-be-overwritten/
export default function Login() {
    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const [isErrorUserName, setIsErrorUserName] = useState(false);
    const [msgUserName, setMsgUserName] = useState("");
    const [isErrorPassword, setIsErrorPassword] = useState(false);
    const [msgPassword, setMsgPassword] = useState("");
    const { t } = useTranslation()

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
                        <Trans i18nKey='login.title' />
                    </Typography>
                    <div className="login-form-field">
                        <AccountCircle sx={{ mr: 1, my: 0.5}} />
                        <FormControl sx={{ m: 1, width: '30ch', color:red }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password">
                                <Trans i18nKey='login.userName' />
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
                                <Trans i18nKey='login.password' />
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
                            <Trans i18nKey='login.btnLogin' />
                        </Button>
                    </div>
            </form>
        </div>
    )
}
