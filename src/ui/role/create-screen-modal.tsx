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
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { CommentConstant } from '../../core/constants/constant';
import { validateCreateScreenForm } from '../../core/constants/validate';

interface CreateRoleModalProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleCreateNewScreen: Function;
}

const initialValues: any = {
    name: '',
    icon: '',
};

export default function CreateScreenModal(props: CreateRoleModalProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen, handleCreateNewScreen } = props;
    const [formValues, setFormValues] = useState(initialValues);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateScreenForm),
    });

    const handleSubmitForm = () => {
        handleCreateNewScreen(formValues.name, formValues.icon);
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
        window.open('https://fontawesome.com/icons', '_blank');
    };

    const handleKeyDown = (event: any) => {
        if (event.key === CommentConstant.ENTER) {
            event.preventDefault();
        }
    };

    return (
        <form>
            <Dialog open={isOpen} onClose={handleCancel} keepMounted fullWidth maxWidth="sm">
                <DialogTitle>{t('create_screen.title')}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel htmlFor="name" error={Boolean(errors.name)}>
                            {t('create_screen.modal.name')} <span className="input-required">*</span>
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
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="icon" error={Boolean(errors.description)}>
                            {t('create_screen.modal.icon')}
                        </InputLabel>
                        <Box
                            w-fullWidth
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
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
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleCancel}>
                        {t('button.btnCancel')}
                    </Button>
                    <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit(handleSubmitForm)}>
                        {t('button.btnCreate')}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
