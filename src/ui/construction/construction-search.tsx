import {
    AlertColor,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
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
import { ConfirmConstants, Item, UrlFeApp } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { headConstructionCol } from '../../core/types/construction';
import { deleteConstructions, getConstructions, getConstructionStatus } from '../../services/construction-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import HandleConstructionStatus from '../../shared-components/status-handle/construction-status-handle';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import './construction.scss';

const initialValues = {
    page: '0',
    size: '5',
    sortDirection: 'ASC',
    sortBy: 'id',
    keyword: '',
    status: '-1',
};

export default function ConstructionSearch() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<any>();
    const { t } = useTranslation();
    const [listId, setListId] = useState<any>({
        listId: [],
    });
    const [constructionStatus, setConstructionStatus] = useState([]);

    useEffect(() => {
        getConstructionStatus().then((status: any) => {
            if (status && status.data) setConstructionStatus(status.data);
        });
    }, []);

    const nativgate = useNavigate();

    const { data, isLoading } = useQuery(['getConstruction'], () => getConstructions(formValues), {
        staleTime: 10000,
        onSuccess: (construction: any) => {
            setState(construction.data);
            construction.data?.content?.forEach((constructionEl: { id: any }) => {
                queryClient.setQueryData(['constructionEl', constructionEl.id], constructionEl);
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
        let data = await getConstructions(formValues);
        if (data && data.data && data.data.content) {
            setState(data.data);
        }
    };

    const fetchData = async (obj: any) => {
        const resp = await getConstructions(obj);
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
        setCompanyMsg(t(SUCCESS_MSG.S01_004));
        setIsOpenModal(true);
        setListId({
            listId: [...childData.ids],
        });
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
        nativgate(`${UrlFeApp.CONSTRUCTION.EDIT}/${id}`);
    };

    const handleAddProjectDetail = (e: any, id: string) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.CONSTRUCTION.DETAIL}/${id}`);
    };

    const alertOkFunc = () => {
        deleteConstructions(listId)
            .then((value) => {
                setIsOpenModal(false);
                setIsShowMessage(true);
                fetchData({
                    ...formValues,
                });
            })
            .catch((err) => {
                handleMessage(true, t('message.error'), 'error');
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
            nameFn: t('tooltip.edit'),
            acFn: handleEditData,
            iconFn: 'ModeEditIcon',
        },
        {
            nameFn: t('tooltip.projectDetail'),
            acFn: handleAddProjectDetail,
            iconFn: 'AddProjectDetail',
        },
    ];

    return (
        <Grid container direction="row" spacing={3} className="project-search">
            <Grid item xs={12} sx={{ mt: 1 }}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                        <Typography
                            variant="h5"
                            color="textSecondary"
                            gutterBottom
                            sx={{ textTransform: 'uppercase' }}
                            className="btn disabled text-white bg-light opacity-100 border-customTheme"
                        >
                            <div className="particletext">{t('construction.search.title')}</div>
                        </Typography>
                    </div>
                    <div className="col-sm-12 text-start d-block d-lg-none">
                        <Button
                            className="btn-create"
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={UrlFeApp.CONSTRUCTION.CREATE}
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
                                    title={t('construction.search.title_card')}
                                    subheader={new Date().toLocaleDateString()}
                                />
                                <CardContent>
                                    <Box
                                        // component="form"
                                        sx={{
                                            '& > :not(style)': {
                                                m: 1,
                                            },
                                        }}
                                        // noValidate
                                        // autoComplete="off"
                                    >
                                        <div className="row justify-center m-1">
                                            <div className="col-12 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t('company.search.keyword')}
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
                                                    id="outlined-required"
                                                    placeholder={t('common.placeholder')}
                                                    name="keyword"
                                                    value={formValues.keyword}
                                                    onChange={handleInputChange}
                                                />
                                            </div>
                                        </div>
                                        <div className="row justify-center m-1">
                                            <div className="col-12 d-block p-1">
                                                <InputLabel id="demo-simple-select-outlined-label">
                                                    {t('company.search.status')}
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
                                                        <MenuItem value="-1">
                                                            <em className="m-auto color-label-select-box">
                                                                {t('message.status')}
                                                            </em>
                                                        </MenuItem>
                                                        {constructionStatus &&
                                                            constructionStatus.length > 0 &&
                                                            constructionStatus.map((data: any, index: any) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={data.id}
                                                                        value={index}
                                                                        className="text-center"
                                                                    >
                                                                        <HandleConstructionStatus
                                                                            isSearch={true}
                                                                            statusList={constructionStatus}
                                                                            statusId={data.id.toString()}
                                                                        />
                                                                    </MenuItem>
                                                                );
                                                            })}
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
                    headCells={headConstructionCol}
                    rows={
                        state || {
                            content: [],
                        }
                    }
                    isLoading={false}
                    arrButton={arrButton}
                    statusList={constructionStatus}
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
