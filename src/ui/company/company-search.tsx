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
import { deleteCompanies, getCompanies } from '../../services/company-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import './company.scss';

const initialValues = {
    companyName: '',
    cpEmail: '',
    cpTelNo: '',
    taxNo: '',
    page: 0,
    size: 5,
    sort: 'id, asc',
};

export default function CompanySearch() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<any>();
    const { t } = useTranslation();
    const [ids, setIds] = useState({});

    const nativgate = useNavigate();

    const { data, isLoading } = useQuery(['getCompanies'], () => getCompanies(formValues), {
        staleTime: 10000,
        onSuccess: (company: any) => {
            setState(company.data);
            company.data?.content?.forEach((companyEl: { id: any }) => {
                queryClient.setQueryData(['companyEl', companyEl.id], companyEl);
            });
        },
    });

    useEffect(() => {
        // do some checking here to ensure data exist
        if (data && data.data && data.data.content) {
            // mutate data if you need to
            setState(data.data);
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
        let data = await getCompanies(formValues);
        if (data && data.data && data.data.content) {
            setState(data.data);
        }
    };
    const fetchData = async (obj: any) => {
        const resp = await getCompanies(obj);
        if (resp && resp.data && resp.data.content) {
            setState(resp.data);
        }
    };

    const handleSearchCallBack = (childData: any) => {
        fetchData({
            ...formValues,
            ...childData,
        });
        setFormValues({
            ...formValues,
            ...childData,
        });
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleDeleteCallBack = (childData: any) => {
        setTypeCompanyMsg('success');
        setCompanyMsg(SUCCESS_MSG.S01_004);
        setIsOpenModal(true);
        setIds(childData);
    };

    const handleClearData = (e: any) => {
        setFormValues({
            ...initialValues,
        });
        fetchData({
            ...initialValues,
        });
    };

    // miss pass id with url
    const handleEditData = (e: any, id: number) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.COMPANY.EDIT}/${id}`);
    };

    const handleAddUser = (e: any, id: number) => {
        alert('Add user func running...');
    };

    const alertOkFunc = () => {
        deleteCompanies(ids)
            .then((value) => {
                setIsOpenModal(false);
                setIsShowMessage(true);
                fetchData({
                    ...formValues,
                });
            })
            .catch((err) => {
                handleMessage(true, t('message.someThingWrong'), 'error');
            });
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
            nameFn: t('tooltip.edit'),
            acFn: handleEditData,
            iconFn: 'ModeEditIcon',
        },
        {
            nameFn: t('tooltip.addUser'),
            acFn: handleAddUser,
            iconFn: 'AddUser',
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
                        <Card w-full="true">
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">SC</Avatar>}
                                title={t('company.search.title')}
                                subheader={new Date().toLocaleDateString()}
                            />
                            <CardContent>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': {
                                            m: 1,
                                        },
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
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                                name="companyName"
                                                value={formValues.companyName}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.email')}:
                                            </InputLabel>
                                            <TextField
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                }}
                                                size="small"
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                                name={'cpEmail'}
                                                value={formValues.cpEmail}
                                                onChange={handleInputChange}
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
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                                name={'cpTelNo'}
                                                value={formValues.cpTelNo}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                        <div className="col-12 col-sm-6 d-block p-1">
                                            <InputLabel htmlFor="outlined-adornment-amount">
                                                {t('company.search.taxNo')}:
                                            </InputLabel>
                                            <TextField
                                                size="small"
                                                fullWidth
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                }}
                                                id="outlined-required"
                                                label={t('common.nonRequired')}
                                                placeholder={t('common.placeholder')}
                                                name={'taxNo'}
                                                value={formValues.taxNo}
                                                onChange={handleInputChange}
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
                                                sx={{
                                                    mr: 1,
                                                    textTransform: 'uppercase',
                                                }}
                                                size="small"
                                                variant="contained"
                                                onClick={handleSubmit}
                                            >
                                                {t('button.btnSearch')}
                                            </Button>
                                            <Button
                                                sx={{
                                                    textTransform: 'uppercase',
                                                }}
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

            <EnhancedTable
                deleteCallBack={handleDeleteCallBack}
                searchCallBack={handleSearchCallBack}
                headCells={headCompanyCol}
                rows={
                    state || {
                        content: [],
                    }
                }
                isLoading={isLoading}
                arrButton={arruBtton}
            />

            <AlertDialogSlide
                isOpen={isOpenModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title={t(ConfirmConstants.DELETE.title)}
                content={t(ConfirmConstants.DELETE.content)}
                noBtn={t(ConfirmConstants.NO_BTN)}
                okBtn={t(ConfirmConstants.OK_BTN)}
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
