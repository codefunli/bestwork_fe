import { AccountCircle, PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, ClickAwayListener, FormControl, FormHelperText, Grid, Grow, IconButton, InputAdornment, InputLabel, MenuItem, MenuList, OutlinedInput, Paper, Popper, Tooltip, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useEffect, useRef, useState } from "react";
import { Trans } from "react-i18next";
import { FieldConstants } from "../../core/constants/common";
import { getMessage, ERROR_MSG } from "../../core/constants/message";
import { isObjectEmpty } from "../../core/utils/object-utils";
import i18n from "../../transaction/i18n";
import LanguageIcon from '@mui/icons-material/Language';
import "./login.scss";
import { useNavigate } from "react-router-dom";

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
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(0);
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
    }
    
    useEffect(() => {
        navigate("/login")
    },[])


    const handleMenuItemClick = (index:any, key:string) => {
        setSelectedIndex(index);
        setOpen(false);
        i18n.changeLanguage(key);
    };

    const handleClose = (event:any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className="auth-wrapper">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title="Chọn ngôn ngữ" placement="top-start" ref={anchorRef}>
                        <IconButton size="small" color="primary" aria-label="change other language" onClick={handleToggle}>
                            <LanguageIcon sx={{ mr: 2 }}/>
                        </IconButton>
                    </Tooltip>
                </Grid>
            </Grid>
            <div className="login-wrapper">
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
            </div>
            <Popper
                sx={{
                    zIndex: 1,
                }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="bottom-start"
            >
                {({ TransitionProps, placement }) => (
                <Grow
                    {...TransitionProps}
                    style={{
                    transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                >
                    <Paper>
                        <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id="split-button-menu" autoFocusItem>
                                {options.map((option, index) => (
                                    <MenuItem
                                        key={option.key}
                                        disabled={index === 2}
                                        selected={index === selectedIndex}
                                        onClick={() => handleMenuItemClick(index, option.key)}
                                    >
                                        {option.name}
                                    </MenuItem>
                                ))}
                            </MenuList>
                        </ClickAwayListener>
                    </Paper>
                </Grow>
                )}
            </Popper>
        </div>
    )
}
