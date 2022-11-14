import { useEffect, useState } from 'react';
import {
    AlertColor,
    Avatar,
    Box,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    Grid,
    MenuItem,
    Select,
    Typography,
} from '@mui/material';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { validateCreateAwbForm, validateCreateRoleForm } from '../../core/constants/validate';
import { createAirWayBill, getAwbStatus } from '../../services/awb-service';
import Chip from '@mui/material/Chip';
import ApiAlert from '../../shared-components/alert/api-alert';
import { StatusCode } from '../../core/constants/common';

interface CreateAwbProps {
    isOpen: boolean;
    toggleOpen: Function;
    handleCreateNewAwb: Function;
    projectId: string;
}

const initialValues: any = {
    projectId: '',
    aWBcode: '',
    note: '',
    status: 0,
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
        console.log(formValues);

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

    const renderChip = (value: any) => {
        switch (value) {
            case 'Not yet customs clearance':
                return (
                    <Chip
                        label="Not yet customs clearance"
                        color="primary"
                        size="small"
                        className="btn"
                        sx={{ width: '100%' }}
                    />
                );
            case 'In Customs Clearance Progess':
                return (
                    <Chip
                        label="In Customs Clearance Progess"
                        color="secondary"
                        size="small"
                        className="btn"
                        sx={{ width: '100%' }}
                    />
                );
            case 'Done':
                return <Chip label="Done" color="success" size="small" className="btn" sx={{ width: '100%' }} />;
            default:
                break;
        }
    };

    return (
        <form>
            <Dialog open={isOpen} onClose={handleCancel} keepMounted fullWidth maxWidth="sm">
                <DialogTitle className="text-uppercase">{t('awb.create.title')}</DialogTitle>
                <DialogContent>
                    <div>
                        <InputLabel htmlFor="aWBcode" error={Boolean(errors.aWBcode)}>
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
                            id="aWBcode"
                            label=""
                            placeholder={t('common.placeholder')}
                            value={formValues.aWBcode}
                            error={Boolean(errors.aWBcode)}
                            helperText={t(errors.aWBcode?.message?.toString() as string)}
                            {...register('aWBcode', {
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
                                                <em className="m-auto w-100">{renderChip(s.status)}</em>
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
