import {
    AlertColor,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Grid,
    InputLabel,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { ConfirmConstants, UrlFeApp } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { headCompanyCol } from '../../core/types/company';
import { CompanyResDTO } from '../../models/company-res-dto';
import { postCompany } from '../../services/company-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import './company.scss';

const initialValues = {
    name: '',
    address1: '',
};

export default function CompanySearch() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<CompanyResDTO[]>([]);
    const { t } = useTranslation();

    const nativgate = useNavigate();

    const { data, isLoading } = useQuery(['postCompany'], () => postCompany(formValues), {
        staleTime: 10000,
        onSuccess: (company: any) => {
            company.data?.content?.forEach((companyEl: { id: any }) => {
                queryClient.setQueryData(['companyEl', companyEl.id], companyEl);
            });
        },
    });

    useEffect(() => {
        // do some checking here to ensure data exist
        if (data && data.data && data.data.content) {
            // mutate data if you need to
            setState(data.data?.content);
        }
        setIsShowMessage(false);
    }, [data]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        let data = await postCompany(formValues);
        if (data && data.data && data.data.content) {
            setState(data.data?.content);
        }
    };

    const handleClearData = (e: any) => {
        setFormValues({
            ...initialValues,
        });
    };

    // miss pass id with url
    const handleEditData = (e: any, id: number) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.COMPANY.EDIT}/${id}`);
    };

    const handleDeleteRecord = (e: any, id: number) => {
        setTypeCompanyMsg('success');
        setCompanyMsg(SUCCESS_MSG.S01_004);
        setIsOpenModal(true);
    };

    const alertOkFunc = () => {
        setIsOpenModal(false);
        setIsShowMessage(true);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setIsShowMessage(false);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const arruBtton: ArrayAction[] = [
        {
            nameFn: 'edit',
            acFn: handleEditData,
            iconFn: 'ModeEditIcon',
        },
        {
            nameFn: 'delete',
            acFn: handleDeleteRecord,
            iconFn: 'Delete',
        },
    ];

    return (
        <div>
            <div className="row">
                <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                    <Typography variant="h5" color="textSecondary" gutterBottom sx={{ textTransform: 'uppercase' }}>
                        {t('company.title')}
                    </Typography>
                </div>
                <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={UrlFeApp.COMPANY.CREATE}
                        sx={{ textTransform: 'uppercase' }}
                    >
                        {t('button.btnRegister')}
                    </Button>
                </div>
                <div className="col-sm-12 text-start d-block d-lg-none">
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={UrlFeApp.COMPANY.CREATE}
                        sx={{ textTransform: 'uppercase' }}
                    >
                        {t('button.btnRegister')}
                    </Button>
                </div>
            </div>
            <form>
                <Grid container direction="row" alignItems="center">
                    <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
                        <Card w-full>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">SC</Avatar>}
                                title={t('company.search.title')}
                                subheader={new Date().toLocaleDateString()}
                            />
                            <CardContent>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1 },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                >
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.name')}:
                                            </InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                                name="name"
                                                value={formValues.name}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.email')}:
                                            </InputLabel>
                                            <TextField
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                size="small"
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                            />
                                        </div>
                                    </div>
                                    <div className="row justify-center m-1">
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.telNo')}:
                                            </InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.taxNo')}:
                                            </InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{ mt: 1, mb: 1 }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                            />
                                        </div>
                                    </div>
                                    <div className="text-center justify-center m-1">
                                        <ButtonGroup
                                            disableElevation
                                            variant="contained"
                                            aria-label="Disabled elevation buttons"
                                        >
                                            <Button
                                                sx={{ mr: 1, textTransform: 'uppercase' }}
                                                size="small"
                                                variant="contained"
                                                onClick={handleSubmit}
                                            >
                                                {t('button.btnSearch')}
                                            </Button>
                                            <Button
                                                sx={{ textTransform: 'uppercase' }}
                                                onClick={handleClearData}
                                                variant="outlined"
                                            >
                                                {t('button.btnClear')}
                                            </Button>
                                        </ButtonGroup>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </form>

            <EnhancedTable headCells={headCompanyCol} rows={state} isLoading={isLoading} arrButton={arruBtton} />

            <AlertDialogSlide
                isOpen={isOpenModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title={ConfirmConstants.DELETE.title}
                content={ConfirmConstants.DELETE.content}
                noBtn={ConfirmConstants.NO_BTN}
                okBtn={ConfirmConstants.OK_BTN}
            />

            <MessageShow
                message={companyMsg}
                showMessage={isShowMessage}
                type={typeCompanyMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
}
