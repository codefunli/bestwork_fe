import { AccountCircle, PasswordOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Typography } from "@mui/material";
import { red } from "@mui/material/colors";
import { useState } from "react";
import "./login.scss";

const initialValues = {
    user: "",
    password: "",
};

export default function Login() {
    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const handleChangeValue = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
          ...formValues,
          [name]: value,
        });
    }
    
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = () => {
        alert("Login in here")
    }
    return (
        <div className="login-wrapper">
            <div className="login-form-wrapper">
            <form>
                <div className="login-form">
                    <Typography
                        variant='h6'
                        component='h1'
                        sx={{ textAlign: 'center', mb: '1.5rem' }}
                    >
                        LOG INTO YOUR ACCOUNT
                    </Typography>
                    <div className="login-form-field">
                        <AccountCircle sx={{ mr: 1, my: 0.5}} />
                        <FormControl sx={{ m: 1, width: '30ch', color:red }} variant="outlined">
                            <InputLabel required htmlFor="outlined-adornment-password" sx={{color:"white"}}>Account</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type='text'
                                name="user"
                                value={formValues.user}
                                onChange={handleChangeValue}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton aria-label="toggle password visibility"
                                    edge="end">
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="account"
                            />
                        </FormControl>
                    </div>
                    <div className="login-form-field">
                        <PasswordOutlined sx={{ mr: 1, my: 0.5 }} />
                        <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                            <InputLabel  required htmlFor="outlined-adornment-password" sx={{color:"white"}}>
                                Password
                            </InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                value={formValues.password}
                                onChange={handleChangeValue}
                                endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    edge="end"
                                    >
                                        {showPassword ? <VisibilityOff sx={{color:"white"}}/> : <Visibility sx={{color:"white"}}/>}
                                    </IconButton>
                                </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </div>
                        <Button variant="outlined" sx={{color:"white"}} className="justify-center" onClick={handleLogin}>Login</Button>
                    </div>
            </form>
            </div>
        </div>
        
    )
}