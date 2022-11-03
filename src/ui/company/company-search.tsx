import {
    AlertColor,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Chip,
    FormControl,
    Grid,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';
import { AlertColorConstants, ConfirmConstants, Item, UrlFeApp } from '../../core/constants/common';
import { ERROR_MSG, SUCCESS_MSG } from '../../core/constants/message';
import { headCompanyCol } from '../../core/types/company';
import { deleteCompanies, getCompanies } from '../../services/company-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import './company.scss';

const initialValues = {
    keyword: '',
    status: '2',
    page: 0,
    size: 5,
    sortDirection: 'ASC',
    sortBy: 'id',
};

const initialIds = {
    lstCompanyId: [],
};

export default function CompanySearch() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<any>();
    const { t } = useTranslation();
    const [ids, setIds] = useState<any>(initialIds);

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
        const data = {
            lstCompanyId: [...childData.ids],
        };

        setTypeCompanyMsg(AlertColorConstants.SUCCESS);
        setCompanyMsg(t(SUCCESS_MSG.S01_004));
        setIsOpenModal(true);
        setIds(data);
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
        nativgate(`${UrlFeApp.USER.CREATE_WITH_COMPANY}/${id}`);
    };

    const alertOkFunc = () => {
        deleteCompanies(ids)
            .then(() => {
                setIsOpenModal(false);
                setIsShowMessage(true);
                fetchData({
                    ...formValues,
                });
            })
            .catch(() => {
                handleMessage(true, t(ERROR_MSG.E01_011), AlertColorConstants.ERROR);
            });
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setIsShowMessage(false);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const arrButton: ArrayAction[] = [
        {
            nameFn: t(Item.TOOL_TIP.EDIT),
            acFn: handleEditData,
            iconFn: Item.ICON_BTN.MODE_EDIT_ICON,
        },
        {
            nameFn: t(Item.TOOL_TIP.ADD_USER),
            acFn: handleAddUser,
            iconFn: Item.ICON_BTN.MODE_ADD_USER_ICON,
        },
    ];

    return (
        <Grid container direction="row" spacing={3} className="company-search">
            <Grid item xs={12} sx={{ mt: 1 }}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                        <Typography variant="h5" color="textSecondary" gutterBottom sx={{ textTransform: 'uppercase' }}>
                            {t(Item.COMPANY.TITLE)}
                        </Typography>
                    </div>
                    <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                        <Button
                            className="btn-create"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={UrlFeApp.COMPANY.CREATE}
                            sx={{ textTransform: 'uppercase' }}
                        >
                            {t(Item.LABEL_BTN.CREATE)}
                        </Button>
                    </div>
                    <div className="col-sm-12 text-start d-block d-lg-none">
                        <Button
                            className="btn-create"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={UrlFeApp.COMPANY.CREATE}
                            sx={{ textTransform: 'uppercase' }}
                        >
                            {t(Item.LABEL_BTN.CREATE)}
                        </Button>
                    </div>
                </div>
            </Grid>
            <Grid item lg={3} xs={12}>
                <form>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
                            <Card w-full="true">
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">SC</Avatar>}
                                    title={t(Item.COMPANY.SEARCH_TITLE)}
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
                                            <div className="col-12 d-block p-1">
                                                <InputLabel htmlFor="keyword-search">
                                                    {t(Item.COMPANY.SEARCH_KEYWORD)}
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
                                                    id="keyword-search"
                                                    placeholder={t(Item.COMMON.PLACE_HOLDER)}
                                                    name="keyword"
                                                    value={formValues.keyword}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 d-block p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t(Item.COMPANY.SEARCH_STATUS)}
                                                </InputLabel>
                                                <FormControl
                                                    size="small"
                                                    fullWidth
                                                    sx={{ mt: 1, mb: 1 }}
                                                    variant="outlined"
                                                >
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
                                                    >
                                                        <MenuItem value={2}>
                                                            <em
                                                                style={{ margin: '0 auto' }}
                                                                className="placeholder-color"
                                                            >
                                                                {t(Item.COMMON.STATUS)}
                                                            </em>
                                                        </MenuItem>
                                                        <MenuItem value={0}>
                                                            <Chip
                                                                sx={{
                                                                    backgroundColor: green[400],
                                                                    width: '100%',
                                                                }}
                                                                className="btn btn-outline-success"
                                                                label={t(Item.LABEL_BTN.ACTIVE)}
                                                                size="small"
                                                                icon={<CheckIcon color="success" />}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            <Chip
                                                                sx={{ width: '100%' }}
                                                                label={t(Item.LABEL_BTN.PENDING)}
                                                                size="small"
                                                                className="btn btn-outline-secondary"
                                                                icon={<CloseIcon />}
                                                            />
                                                        </MenuItem>
                                                    </Select>
                                                </FormControl>
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
                                                    color="primary"
                                                    size="small"
                                                    variant="contained"
                                                    onClick={handleSubmit}
                                                >
                                                    {t(Item.LABEL_BTN.SEARCH)}
                                                </Button>
                                                <Button
                                                    sx={{
                                                        textTransform: 'uppercase',
                                                    }}
                                                    onClick={handleClearData}
                                                    variant="outlined"
                                                >
                                                    {t(Item.LABEL_BTN.CLEAR)}
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
            <Grid item lg={9} xs={12} sx={{ mt: 1, mb: 1 }}>
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
                    arrButton={arrButton}
                />
            </Grid>

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
        </Grid>
    );
}
