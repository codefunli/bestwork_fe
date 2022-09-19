import { AccountCircle, PasswordOutlined } from "@mui/icons-material";
import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import "./login.scss";

export default function Login() {
    return (
        <div className="login-form">
             <Typography
                variant='h6'
                component='h1'
                sx={{ textAlign: 'center', mb: '1.5rem' }}
            >
                LOG INTO YOUR ACCOUNT
            </Typography>
            <div className="login-form-field">
                <AccountCircle sx={{ color: 'action.active', mr: 1, my: 0.5}} />
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-password">Account</InputLabel>
                    <OutlinedInput
                        className="ab"
                        id="outlined-adornment-password"
                        //type={values.showPassword ? 'text' : 'password'}
                        //value={values.password}
                        //onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            //onClick={handleClickShowPassword}
                            //onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            </IconButton>
                        </InputAdornment>
                        }
                        label="account"
                    />
                </FormControl>
            </div>
            <div className="login-form-field">
                <PasswordOutlined sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                <FormControl sx={{ m: 1, width: '30ch' }} variant="outlined">
                    <InputLabel required htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        //type={values.showPassword ? 'text' : 'password'}
                        //value={values.password}
                        //onChange={handleChange('password')}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            //onClick={handleClickShowPassword}
                            //onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
            </div>
            <Button variant="contained" className="justify-center">Login</Button>
        </div>
    )
}