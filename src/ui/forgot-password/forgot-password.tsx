import {
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    OutlinedInput,
    Typography
} from '@mui/material';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { StatusCode, UrlFeApp } from '../../core/constants/common';
import { validateForgotPassword } from '../../core/constants/validate';
import { forgotPassword } from '../../services/user-service';
import { yupResolver } from '@hookform/resolvers/yup';
import ApiAlert from '../../shared-components/alert/api-alert';
import './forgot-password.scss';
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const [isSentEmail, setIsSentEmail] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateForgotPassword),
    });

    const handleChangeValue = (event: any) => {
        setEmail(event.target.value);
    };

    const handleSend = () => {
        forgotPassword({ email })
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });
                if (res.status === StatusCode.OK) setIsSentEmail(true);
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
                                {t('forgotPassword.title')}
                            </Typography>
                            {!isSentEmail ?
                                <div>
                                    {t('forgotPassword.description')}
                                    <div className="form-field">
                                        <FormControl variant="outlined">
                                            <InputLabel required htmlFor="outlined-adornment-password">
                                                {t('forgotPassword.email')}
                                            </InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type="email"
                                                value={email}
                                                autoComplete="false"
                                                label={t('forgotPassword.email')}
                                                error={Boolean(errors.email)}
                                                {...register('email', {
                                                    onChange: (e) => handleChangeValue(e),
                                                })}
                                            />
                                            {errors?.email && <FormHelperText error>{t(errors.email?.message?.toString() as string)}</FormHelperText>}
                                        </FormControl>
                                    </div>
                                    <Button variant="outlined" className="justify-center" onClick={handleSubmit(handleSend)} >
                                        {t('forgotPassword.btnSend')}
                                    </Button>
                                </div>
                                :
                                <div className="sent-email">
                                    <p>{t('forgotPassword.sentEmail')}.</p>
                                    <Link to={UrlFeApp.LOGIN_URL}>
                                        {t('login.title')}
                                    </Link>
                                    <p className="mt-4">
                                        {t('forgotPassword.notReceive')}? <span className="btn-resend" onClick={handleSubmit(handleSend)}>{t('forgotPassword.btnResend')}</span>
                                    </p>
                                </div>
                            }
                        </div>
                    </form>
                </div>
            </div >
            <ApiAlert
                response={resForHandleMsg}
            />
        </div >
    );
}
