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
import { useSelector } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ConfirmConstants, UrlFeApp, Item } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { getUserInfo } from '../../core/redux/user-slice';
import { Permission } from '../../core/types/permission';
import { headProjectCol } from '../../core/types/project';
import { deleteProjects, getProjects, getProjectStatus } from '../../services/project-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import HandleProjectStatus from '../../shared-components/status-handle/project-status-handle';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import './project.scss';

const initialValues = {
    page: '0',
    size: '5',
    sortDirection: 'ASC',
    sortBy: 'id',
    keyword: '',
    status: '-1',
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
    const [id, setId] = useState<any>({
        id: [],
    });
    const [projectStatus, setProjectStatus] = useState([]);
    const location = useLocation();
    const [permission, setPermission] = useState<Permission>();
    const userInfo = useSelector(getUserInfo);

    useEffect(() => {
        if (userInfo && userInfo.permissions && userInfo.permissions[4][0]) setPermission(userInfo.permissions[4][0]);
        if (location.state && location.state.permission) setPermission(location.state.permission);
    }, [location]);

    useEffect(() => {
        getProjectStatus().then((status: any) => {
            if (status && status.data) setProjectStatus(status.data);
        });
    }, []);

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
        setCompanyMsg(t(SUCCESS_MSG.S01_004));
        setIsOpenModal(true);
        setId({
            id: [...childData.ids],
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
        nativgate(`${UrlFeApp.PROJECT.EDIT}/${id}`);
    };

    const handleAddMaterialStatus = (e: any, id: string) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.AWB.LIST}/${id}`);
    };

    const handleAddProjectDetail = (e: any, id: string) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.PROJECT.DETAIL}/${id}`);
    };

    const alertOkFunc = () => {
        deleteProjects(id)
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
            nameFn: t('tooltip.customsClearance'),
            acFn: handleAddMaterialStatus,
            iconFn: 'AddMaterialStatus',
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
                            <div className="particletext">{t('project.title')}</div>
                        </Typography>
                    </div>
                    {permission && permission.canAdd && (
                        <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={UrlFeApp.PROJECT.CREATE}
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t(Item.LABEL_BTN.CREATE)}
                            </Button>
                        </div>
                    )}
                    {permission && permission.canAdd && (
                        <div className="col-sm-12 text-start d-block d-lg-none">
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={UrlFeApp.PROJECT.CREATE}
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t(Item.LABEL_BTN.CREATE)}
                            </Button>
                        </div>
                    )}
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
                                        sx={{
                                            '& > :not(style)': {
                                                m: 1,
                                            },
                                        }}
                                    >
                                        <div className="row justify-center m-1">
                                            <div className="col-12 d-block p-1">
                                                <InputLabel htmlFor="outlined-adornment-amount">
                                                    {t('company.search.keyword')}
                                                </InputLabel>
                                                <TextField
                                                    size="small"
                                                    fullWidth={true}
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
                                                    autoComplete="off"
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
                                                    fullWidth={true}
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
                                                        {projectStatus &&
                                                            projectStatus.length > 0 &&
                                                            projectStatus.map((data: any, index: any) => {
                                                                return (
                                                                    <MenuItem
                                                                        key={data.id}
                                                                        value={index}
                                                                        className="text-center"
                                                                    >
                                                                        <HandleProjectStatus
                                                                            isSearch={true}
                                                                            statusList={projectStatus}
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
                    headCells={headProjectCol}
                    rows={
                        state
                            ? { ...state, isProject: true }
                            : {
                                  content: [],
                              }
                    }
                    isLoading={isLoading}
                    arrButton={arrButton}
                    statusList={projectStatus}
                    permission={permission}
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
