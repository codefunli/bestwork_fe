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
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { renderChipAwbStatus, StatusCode } from '../../core/constants/common';
import { validateCreateAwbForm } from '../../core/constants/validate';
import { createAirWayBill, getAwbStatus } from '../../services/awb-service';
import ApiAlert from '../../shared-components/alert/api-alert';

interface CreateAwbProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleCreateNewAwb: Function;
    projectId: string;
}

const initialValues: any = {
    projectId: '',
    airWayBillCode: '',
    note: '',
    status: '',
};

export default function CreateAwb(props: CreateAwbProps) {
    const { t } = useTranslation();
    const { isOpen, toggleOpen, handleCreateNewAwb, projectId } = props;
    const [formValues, setFormValues] = useState(initialValues);
    const [status, setStatus] = useState<any>([]);
    const [resForHandleMsg, setResForHandleMsg] = useState<any>();

    useEffect(() => {
        getAwbStatus().then((value: any) => {
            if (value && value.status === 'OK' && value.data) setStatus(value.data);
        });
    }, []);

    useEffect(() => {
        setFormValues({
            ...formValues,
            projectId: props.projectId,
        });
    }, [props.projectId]);

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validateCreateAwbForm),
    });

    const handleSubmitForm = () => {
        createAirWayBill(formValues)
            .then((res: any) => {
                setResForHandleMsg({
                    status: res.status,
                    message: res.message,
                });

                if (res.status === StatusCode.OK) {
                    setTimeout(() => {
                        toggleOpen(false);
                        setFormValues(initialValues);
                        handleCreateNewAwb();
                        reset();
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
                <DialogTitle className="text-uppercase">{t('awb.create.title')}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel htmlFor="airWayBillCode" error={Boolean(errors.airWayBillCode)}>
                            {t('awb.AWBNo')} <span className="input-required">*</span>
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
                            id="airWayBillCode"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.airWayBillCode}
                            error={Boolean(errors.airWayBillCode)}
                            helperText={t(errors.airWayBillCode?.message?.toString() as string)}
                            {...register('airWayBillCode', {
                                onChange: (e) => handleInputChange(e),
                            })}
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="note">{t('awb.create.note')}</InputLabel>
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
                            <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
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
                        </div>
                        <ApiAlert response={resForHandleMsg} />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" disabled={isSubmitting} onClick={handleSubmit(handleSubmitForm)}>
                        {t('button.btnCreate')}
                    </Button>
                    <Button variant="outlined" onClick={handleCancel}>
                        {t('button.btnCancel')}
                    </Button>
                </DialogActions>
            </Dialog>
        </form>
    );
}
