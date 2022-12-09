import { yupResolver } from '@hookform/resolvers/yup';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { renderChipAwbStatus, StatusCode } from '../../core/constants/common';
import { validateCreateAwbForm } from '../../core/constants/validate';
import { createAirWayBill, editAirWayBill, getAwbStatus } from '../../services/awb-service';
import ApiAlert from '../../shared-components/alert/api-alert';
import { AwbDataContext } from './awb-list';

interface CreateAwbProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleCreateNewAwb: Function;
    projectId: string;
}

const initialValues: any = {
    projectId: '',
    code: '',
    note: '',
    status: '',
};

export default function EditAwb(props: CreateAwbProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen, handleCreateNewAwb, projectId } = props;
    const [formValues, setFormValues] = useState(initialValues);
    const [status, setStatus] = useState<any>([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();
    const currentAwbData = useContext<any>(AwbDataContext);
    const [isSubmit, setIsSubmit] = useState(false);

    useEffect(() => {
        if (currentAwbData)
            setFormValues({
                projectId: projectId,
                id: currentAwbData.id,
                code: currentAwbData.code,
                note: currentAwbData.note,
                status: currentAwbData.status,
            });
        reset();
    }, [currentAwbData]);

    useEffect(() => {
        getAwbStatus().then((value: any) => {
            if (value && value.status === 'OK' && value.data) setStatus(value.data);
        });
    }, []);

    useEffect(() => {
        if (currentAwbData)
            setFormValues({
                projectId: projectId,
                id: currentAwbData.id,
                code: currentAwbData.code,
                note: currentAwbData.note,
                status: currentAwbData.status,
            });
        reset();
    }, [isOpen]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validateCreateAwbForm),
    });

    const handleSubmitForm = () => {
        setIsSubmit(true);
        editAirWayBill(formValues)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        setFormValues(initialValues);
                        toggleOpen(false);
                        handleCreateNewAwb();
                        reset();
                        setIsSubmit(false);
                    }, 1000);
                }
            })
            .catch(() => {
                setResForHandleMsg({
                    status: StatusCode.ERROR,
                    message: t('message.error'),
                });
            });
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
            <Dialog open={isOpen} onClose={handleCancel} keepMounted fullWidth maxWidth="sm">
                <DialogTitle className="text-uppercase">{t('awb.edit.title')}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel htmlFor="code" error={Boolean(errors.code)}>
                            {t('awb.AWBNo')} <span className="input-required">*</span>
                        </InputLabel>
                        <TextField
                            size="small"
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                                width: '100%',
                            }}
                            required
                            id="code"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.code}
                            error={Boolean(errors.code)}
                            helperText={t(errors.code?.message?.toString() as string)}
                            {...register('code', {
                                onChange: (e) => handleInputChange(e),
                            })}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="note">{t('awb.create.note')}</InputLabel>
                        <TextField
                            size="small"
                            sx={{
                                mt: 1,
                                mb: 1,
                                '& legend': { display: 'none' },
                                '& fieldset': { top: 0 },
                                width: '100%',
                            }}
                            required
                            id="note"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.note}
                            name="note"
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="row justify-center">
                        <div className="col-12 d-block">
                            <InputLabel id="demo-simple-select-outlined-label">{t('company.search.status')}</InputLabel>
                            {status && status.length > 0 && (
                                <FormControl size="small" fullWidth={true} sx={{ mt: 1, mb: 1 }} variant="outlined">
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        name="status"
                                        displayEmpty
                                        sx={{
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        value={formValues.status}
                                        onChange={handleInputChange}
                                        className="text-center"
                                    >
                                        {status &&
                                            status.length > 0 &&
                                            status.map((s: any) => (
                                                <MenuItem value={s.id} key={s.id}>
                                                    <em className="m-auto w-100">{renderChipAwbStatus(s.status)}</em>
                                                </MenuItem>
                                            ))}
                                    </Select>
                                </FormControl>
                            )}
                        </div>
                        <ApiAlert response={resForHandleMsg} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" disabled={isSubmit} onClick={handleSubmit(handleSubmitForm)}>
                        {t('button.btnEdit')}
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                        {t('button.btnCancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
