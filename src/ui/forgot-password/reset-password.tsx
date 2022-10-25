import {
    Button,
    FormControl,
    FormHelperText,
    IconButton,
    InputAdornment,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StatusCode } from '../../core/constants/common';
import { validateResetPassword } from '../../core/constants/validate';
import { resetPassword } from '../../services/user-service';
import { yupResolver } from '@hookform/resolvers/yup';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import ApiAlert from '../../shared-components/alert/api-alert';
import './forgot-password.scss';

const initialValues = {
    password: '',
    confirmPassword: '',
};

export default function ResetPassword() {
    const [formValues, setFormValues] = useState<any>(initialValues);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);
    const [token, setToken] = useState('');
    const { t } = useTranslation();

    const pathNameArr = window.location.pathname.split('/');

    useEffect(() => {
        setToken(pathNameArr[pathNameArr.length - 1]);
    }, [pathNameArr]);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateResetPassword),
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleChangeValue = (event: any) => {
        const { name, value } = event.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSend = () => {
        resetPassword(formValues, token)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
    };

    return (
        <div className="auth-wrapper">
            <div className="forgot-password-wrapper">
                <div className="forgot-password-form-wrapper">
                    <form>
                        <div className="forgot-password-form">
                            <Typography
                                variant="h6"
                                component="h1"
                                sx={{ textAlign: 'center', mb: '1.5rem', textTransform: 'uppercase' }}
                            >
                                {t('forgotPassword.resetTitle')}
                            </Typography>
                            <div className="form-field">
                                <FormControl variant="outlined">
                                    <InputLabel required htmlFor="outlined-adornment-password">
                                        {t('forgotPassword.password')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formValues.password}
                                        error={Boolean(errors.password)}
                                        {...register('password', {
                                            onChange: (e) => handleChangeValue(e),
                                        })}
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
                                        label={t('forgotPassword.password')}
                                    />
                                    {errors?.password && <FormHelperText error>{t(errors.password?.message?.toString() as string)}</FormHelperText>}
                                </FormControl>
                            </div>
                            <div className="form-field">
                                <FormControl variant="outlined">
                                    <InputLabel required htmlFor="outlined-adornment-password">
                                        {t('forgotPassword.confirmPassword')}
                                    </InputLabel>
                                    <OutlinedInput
                                        id="outlined-adornment-password"
                                        type={showPassword ? 'text' : 'password'}
                                        value={formValues.confirmPassword}
                                        error={Boolean(errors.confirmPassword)}
                                        {...register('confirmPassword', {
                                            onChange: (e) => handleChangeValue(e),
                                        })}
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
                                        label={t('forgotPassword.confirmPassword')}
                                    />
                                    {errors?.confirmPassword && <FormHelperText error>{t(errors.confirmPassword?.message?.toString() as string)}</FormHelperText>}
                                </FormControl>
                            </div>
                            <Button variant="outlined" className="justify-center" onClick={handleSubmit(handleSend)} >
                                {t('forgotPassword.btnConfirm')}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
            <ApiAlert
                response={resForHandleMsg}
            />
        </div>
    );
}
