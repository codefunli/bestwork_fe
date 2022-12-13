import { yupResolver } from '@hookform/resolvers/yup';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Divider,
    InputLabel,
    TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { CommentConstant } from '../../core/constants/constant';
import { validateCreateScreenForm } from '../../core/constants/validate';
import { getMonitorRedux } from '../../core/redux/monitor-slice';
import IconGuide from './icon-guide';
import { ScreenContext } from './role';

interface CreateRoleModalProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleUpdateNewScreen: Function;
}

const initialValues: any = {
    name: '',
    icon: '',
    url: '',
};

export default function UpdateScreenModal(props: CreateRoleModalProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen, handleUpdateNewScreen } = props;
    const [formValues, setFormValues] = useState(initialValues);
    const screenValue = useContext(ScreenContext);
    const monitorRedux = useSelector(getMonitorRedux);

    useEffect(() => {
        if (monitorRedux.length > 0) {
            if (screenValue) {
                const monitor = monitorRedux.find((data: any) => {
                    return data.id === screenValue.monitorId;
                });
                setFormValues(monitor);
                reset();
            }
        }
    }, [screenValue, isOpen]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateScreenForm),
    });

    const handleSubmitForm = () => {
        handleUpdateNewScreen(formValues);
        toggleOpen(false);
        setFormValues(initialValues);
        reset();
    };

    const handleCancel = () => {
        toggleOpen(false);
        setFormValues(initialValues);
        reset();
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const goToFontAnwesomePage = (e: any) => {
        window.open('https://fontawesome.com/search?o=r&m=free&s=solid&f=classic', '_blank');
    };

    const handleKeyDown = (event: any) => {
        if (event.key === CommentConstant.ENTER) {
            event.preventDefault();
        }
    };

    return (
        <Dialog open={isOpen} onClose={handleCancel} keepMounted fullWidth maxWidth="sm">
            <DialogTitle>{t('edit_screen.title')}</DialogTitle>
            <Box
                sx={{
                    p: '0 24px 20px 24px',
                    overflowY: 'auto',
                }}
            >
                <div>
                    <InputLabel htmlFor="name" error={Boolean(errors.name)}>
                        {t('edit_screen.modal.name')} <span className="input-required">*</span>
                    </InputLabel>
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            mt: 1,
                            mb: 1,
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                        }}
                        required
                        id="name"
                        label=""
                        placeholder={t('common.placeholder')}
                        value={formValues.name}
                        error={Boolean(errors.name)}
                        helperText={t(errors.name?.message?.toString() as string)}
                        {...register('name', {
                            onChange: (e) => handleInputChange(e),
                        })}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="name" error={Boolean(errors.url)}>
                        {t('create_screen.modal.url')} <span className="input-required">*</span>
                    </InputLabel>
                    <TextField
                        size="small"
                        fullWidth
                        sx={{
                            mt: 1,
                            mb: 1,
                            '& legend': { display: 'none' },
                            '& fieldset': { top: 0 },
                        }}
                        required
                        id="url"
                        label=""
                        placeholder={t('common.urlPlacholder')}
                        value={formValues.url}
                        error={Boolean(errors.url)}
                        helperText={t(errors.url?.message?.toString() as string)}
                        {...register('url', {
                            onChange: (e) => handleInputChange(e),
                        })}
                        autoComplete="off"
                    />
                </div>
                <div>
                    <InputLabel htmlFor="icon" error={Boolean(errors.description)}>
                        {t('create_screen.modal.icon')}
                    </InputLabel>
                    <Box
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >
                        <TextField
                            size="small"
                            value={formValues.icon}
                            error={Boolean(errors.icon)}
                            helperText={t(errors.icon?.message?.toString() as string)}
                            {...register('icon', {
                                onChange: (e) => handleInputChange(e),
                            })}
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                            }}
                            autoComplete="off"
                            label=""
                            placeholder={t('common.placeholder')}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                        <Button variant="outlined" onClick={goToFontAnwesomePage}>
                            FontAwesome
                        </Button>
                    </Box>
                    <Box>
                        <IconGuide />
                    </Box>
                </div>
            </Box>
            <DialogActions>
                <Button variant="outlined" onClick={handleCancel}>
                    {t('button.btnCancel')}
                </Button>
                <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit(handleSubmitForm)}>
                    {t('button.btnUpdate')}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
