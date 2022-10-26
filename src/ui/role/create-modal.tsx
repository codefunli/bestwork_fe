import { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateCreateRoleForm } from '../../core/constants/validate';

interface CreateRoleModalProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleCreateNewRole: Function;
};

const initialValues: any = {
    roleName: '',
    description: ''
};

export default function CreateRoleModal(props: CreateRoleModalProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen, handleCreateNewRole } = props;

    const [formValues, setFormValues] = useState(initialValues);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateRoleForm),
    });

    const handleSubmitForm = () => {
        handleCreateNewRole(formValues.roleName, formValues.description);
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

    return (
        <form>
            <Dialog
                open={isOpen}
                onClose={handleCancel}
                keepMounted
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle>{t('role.modal.title')}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel
                            htmlFor="roleName"
                            error={Boolean(errors.roleName)}
                        >
                            {t("role.modal.roleName")} <span className="input-required">*</span>
                        </InputLabel>
                        <TextField
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 }
                            }}
                            required
                            id="roleName"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.roleName}
                            error={Boolean(errors.roleName)}
                            helperText={t(errors.roleName?.message?.toString() as string)}
                            {...register('roleName', {
                                onChange: (e) => handleInputChange(e),
                            })}
                        />
                    </div>
                    <div>
                        <InputLabel
                            htmlFor="description"
                            error={Boolean(errors.description)}
                        >
                            {t("role.modal.description")} <span className="input-required">*</span>
                        </InputLabel>
                        <TextField
                            size="small"
                            fullWidth
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 }
                            }}
                            required
                            id="description"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.description}
                            error={Boolean(errors.description)}
                            helperText={t(errors.description?.message?.toString() as string)}
                            {...register('description', {
                                onChange: (e) => handleInputChange(e),
                            })}
                        />
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
