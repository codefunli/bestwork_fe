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
import { ConfirmConstants, UrlFeApp } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { headProjectCol } from '../../core/types/project';
import { deleteProjects, getProjects } from '../../services/project-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import './project.scss';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

const initialValues = {
    keyword: '',
    status: '',
    page: 0,
    size: 5,
    sort: 'id, asc',
};

export default function ProjectSearch() {
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

    const { data, isLoading } = useQuery(['getProjects'], () => getProjects(formValues), {
        staleTime: 10000,
        onSuccess: (project: any) => {
            setState(project.data);
            project.data?.content?.forEach((companyEl: { id: any }) => {
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
        let data = await getProjects(formValues);
        if (data && data.data && data.data.content) {
            setState(data.data);
        }
    };
    const fetchData = async (obj: any) => {
        const resp = await getProjects(obj);
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
        nativgate(`${UrlFeApp.PROJECT.EDIT}/${id}`);
    };

    const handleAddUser = (e: any, id: number) => {
        alert('Add user function running...');
    };

    const alertOkFunc = () => {
        deleteProjects(ids)
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
        <Grid container direction="row" spacing={3}>
            <Grid item xs={12} sx={{ mt: 1 }}>
                <div className="row">
                    <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                        <Typography variant="h5" color="textSecondary" gutterBottom sx={{ textTransform: 'uppercase' }}>
                            {t('project.title')}
                        </Typography>
                    </div>
                    <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                        <Button
                            variant="contained"
                            color="primary"
                            component={Link}
                            to={UrlFeApp.PROJECT.CREATE}
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
            </Grid>
            <Grid item lg={3} xs={12}>
                <form>
                    <Grid container direction="row" alignItems="center">
                        <Grid item xs={12} sx={{ mt: 1, mb: 1 }}>
                            <Card w-full="true">
                                <CardHeader
                                    avatar={<Avatar aria-label="recipe">SC</Avatar>}
                                    title={t('project.search.title')}
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
                                                        <MenuItem value="">
                                                            <em>{t('message.status')}</em>
                                                        </MenuItem>
                                                        <MenuItem value={0}>
                                                            <Chip
                                                                color="secondary"
                                                                label={t('button.btnActive')}
                                                                size="small"
                                                                icon={<CheckIcon />}
                                                            />
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            <Chip
                                                                label={t('button.btnPending')}
                                                                size="small"
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
            </Grid>
            <Grid item lg={9} xs={12} sx={{ mt: 1, mb: 1 }}>
                <EnhancedTable
                    deleteCallBack={handleDeleteCallBack}
                    searchCallBack={handleSearchCallBack}
                    headCells={headProjectCol}
                    rows={
                        state || {
                            content: [],
                        }
                    }
                    isLoading={isLoading}
                    arrButton={arruBtton}
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