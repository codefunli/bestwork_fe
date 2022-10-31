import { useState } from 'react';
import { Button, ButtonGroup, Dialog, DialogActions, DialogContent, DialogTitle, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateChangePassword } from '../../core/constants/validate';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { changePassword } from '../../services/auth-service';
import { StatusCode } from '../../core/constants/common';
import ApiAlert from '../../shared-components/alert/api-alert';
import './change-password.scss';

interface ChangePasswordModalProps {
    isOpen: boolean;
    toggleOpen: Function;
}

const initialValues: any = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
};

export default function ChangePassword(props: ChangePasswordModalProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen } = props;
    const [formValues, setFormValues] = useState(initialValues);
    const [showPassword, setShowPassword] = useState(false);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateChangePassword),
    });

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleCancel = () => {
        toggleOpen(false);
        setFormValues(initialValues);
        reset();
    };

    const handleSubmitForm = () => {
        changePassword(formValues).then((res: any) => {
            setResForHandleMsg({
                status: res.status,
                message: res.message,
            });

            toggleOpen(false);
            setFormValues(initialValues);
            reset();
        }).catch(() => {
            setResForHandleMsg({
                status: StatusCode.ERROR,
                message: t('message.error'),
            });
        });
    };

    return (
        <form>
            <Dialog open={isOpen} onClose={handleCancel} keepMounted fullWidth maxWidth="xs" className="change-password">
                <DialogTitle>{t('changePassword.title')}</DialogTitle>
                <DialogContent>
                    <div className="text-field-item">
                        <InputLabel htmlFor="currentPassword" error={Boolean(errors.currentPassword)}>
                            {t('changePassword.currentPassword')} <span className="input-required">*</span>
                        </InputLabel>
                        <OutlinedInput
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                            required
                            placeholder={t('common.placeholder')}
                            value={formValues.currentPassword}
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(errors.currentPassword)}
                            {...register('currentPassword', {
                                onChange: (e) => handleInputChange(e),
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
                        />
                        {errors?.currentPassword && <FormHelperText error>{t(errors.currentPassword?.message?.toString() as string)}</FormHelperText>}
                    </div>
                    <div className="text-field-item">
                        <InputLabel htmlFor="newPassword" error={Boolean(errors.newPassword)}>
                            {t('changePassword.newPassword')} <span className="input-required">*</span>
                        </InputLabel>
                        <OutlinedInput
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                            required
                            placeholder={t('common.placeholder')}
                            value={formValues.newPassword}
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(errors.newPassword)}
                            {...register('newPassword', {
                                onChange: (e) => handleInputChange(e),
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
                        />
                        {errors?.newPassword && <FormHelperText error>{t(errors.newPassword?.message?.toString() as string)}</FormHelperText>}
                    </div>
                    <div className="text-field-item">
                        <InputLabel htmlFor="newPassword" error={Boolean(errors.newPassword)}>
                            {t('changePassword.confirmPassword')} <span className="input-required">*</span>
                        </InputLabel>
                        <OutlinedInput
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                            required
                            placeholder={t('common.placeholder')}
                            value={formValues.confirmPassword}
                            type={showPassword ? 'text' : 'password'}
                            error={Boolean(errors.confirmPassword)}
                            {...register('confirmPassword', {
                                onChange: (e) => handleInputChange(e),
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
                        />
                        {errors?.confirmPassword && <FormHelperText error>{t(errors.confirmPassword?.message?.toString() as string)}</FormHelperText>}
                    </div>
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <ButtonGroup
                        disableElevation
                        variant="contained"
                        aria-label="Disabled elevation buttons"
                        sx={{ alignItems: 'center' }}
                    >
                        <Button variant="outlined" sx={{ mr: 1 }} onClick={handleCancel}>
                            {t('button.btnCancel')}
                        </Button>
                        <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit(handleSubmitForm)}>
                            {t('button.btnSave')}
                        </Button>
                    </ButtonGroup>
                </DialogActions>
            </Dialog>

            <ApiAlert response={resForHandleMsg} />
        </form>
    );
}
