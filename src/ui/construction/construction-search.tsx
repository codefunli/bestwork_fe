import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
    AlertColor,
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    Checkbox,
    FormControl,
    Grid,
    IconButton,
    InputLabel,
    Select,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { ConfirmConstants, Item, UrlFeApp } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { getUserInfo } from '../../core/redux/user-slice';
import { headConstructionCol } from '../../core/types/construction';
import { Permission } from '../../core/types/permission';
import {
    deleteConstructions,
    getCompaniesConstruction,
    getConstructions,
    getConstructionStatus,
    getNationalConstruction,
    getProjectsConstruction,
} from '../../services/construction-service';
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
    projectId: '0',
    nationId: '0',
    companyId: '0',
    location: '',
};

const initSearchItem = {
    isProject: false,
    isBrand: false,
    isNation: false,
    isLocation: false,
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
        ids: [],
    });
    const [constructionStatus, setConstructionStatus] = useState([]);
    const location = useLocation();
    const [permission, setPermission] = useState<Permission>();
    const userInfo = useSelector(getUserInfo);
    const [controlSearchItem, setContronlSearchItem] = useState<any>(initSearchItem);
    const [projects, setProjects] = useState<any>([]);
    const [companies, setCompanies] = useState<any>([]);
    const [nations, setNations] = useState<any>([]);

    useEffect(() => {
        if (userInfo && userInfo.permissions && userInfo.permissions[5][0]) setPermission(userInfo.permissions[5][0]);
        if (location.state && location.state.permission) setPermission(location.state.permission);
    }, [location]);

    useEffect(() => {
        getConstructionStatus().then((status: any) => {
            if (status && status.data) setConstructionStatus(status.data);
        });
        getCompaniesConstruction().then((res: any) => {
            if (res && res.data) setCompanies(res.data);
        });
        getProjectsConstruction().then((res: any) => {
            if (res && res.data) setProjects(res.data);
        });
        getNationalConstruction().then((res: any) => {
            if (res && res.data) setNations(res.data);
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
            ids: [...childData.ids],
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

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleChangeCheckbox = (event: any) => {
        setContronlSearchItem({
            ...controlSearchItem,
            [event.target.name]: event.target.checked,
        });
    };
    const handleChangeMenuItem = (event: any, name: string) => {
        setContronlSearchItem({
            ...controlSearchItem,
            [name]: !controlSearchItem[name],
        });
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
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
                                    action={
                                        <React.Fragment>
                                            <Tooltip title="Add more items search">
                                                <IconButton
                                                    onClick={handleClick}
                                                    aria-label="settings"
                                                    color="primary"
                                                    size="large"
                                                >
                                                    <MoreVertIcon color="primary" fontSize="inherit" />
                                                </IconButton>
                                            </Tooltip>
                                            <Menu
                                                anchorEl={anchorEl}
                                                id="account-menu"
                                                open={open}
                                                onClose={handleClose}
                                                PaperProps={{
                                                    elevation: 0,
                                                    sx: {
                                                        overflow: 'visible',
                                                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                        mt: 1.5,
                                                        '& .MuiAvatar-root': {
                                                            width: 32,
                                                            height: 32,
                                                            ml: -0.5,
                                                            mr: 1,
                                                        },
                                                        '&:before': {
                                                            content: '""',
                                                            display: 'block',
                                                            position: 'absolute',
                                                            top: 0,
                                                            right: 14,
                                                            width: 10,
                                                            height: 10,
                                                            bgcolor: 'background.paper',
                                                            transform: 'translateY(-50%) rotate(45deg)',
                                                            zIndex: 0,
                                                        },
                                                    },
                                                }}
                                                transformOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'top',
                                                }}
                                                anchorOrigin={{
                                                    horizontal: 'right',
                                                    vertical: 'bottom',
                                                }}
                                            >
                                                <MenuItem onClick={(e) => handleChangeMenuItem(e, 'isLocation')}>
                                                    <Checkbox
                                                        checked={controlSearchItem.isLocation}
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                        name="isLocation"
                                                    />
                                                    <Typography variant="h6">
                                                        {t('construction.search.constructionLocation')}
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={(e) => handleChangeMenuItem(e, 'isProject')}>
                                                    <Checkbox
                                                        checked={controlSearchItem.isProject}
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                        name="isProject"
                                                    />
                                                    <Typography variant="h6">
                                                        {t('construction.search.constructionProject')}
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={(e) => handleChangeMenuItem(e, 'isBrand')}>
                                                    <Checkbox
                                                        checked={controlSearchItem.isBrand}
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                        name="isBrand"
                                                    />
                                                    <Typography variant="h6">
                                                        {t('construction.search.constructionBrand')}
                                                    </Typography>
                                                </MenuItem>
                                                <MenuItem onClick={(e) => handleChangeMenuItem(e, 'isNation')}>
                                                    <Checkbox
                                                        checked={controlSearchItem.isNation}
                                                        onChange={(e) => handleChangeCheckbox(e)}
                                                        name="isNation"
                                                    />
                                                    <Typography variant="h6">
                                                        {t('construction.search.constructionNation')}
                                                    </Typography>
                                                </MenuItem>
                                            </Menu>
                                        </React.Fragment>
                                    }
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
                                        {controlSearchItem.isLocation && (
                                            <div className="row justify-center m-1">
                                                <div className="col-12 d-block p-1">
                                                    <InputLabel htmlFor="outlined-adornment-amount">
                                                        {t('construction.search.constructionLocation')}
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
                                                        name="location"
                                                        value={formValues.location}
                                                        onChange={handleInputChange}
                                                    />
                                                </div>
                                            </div>
                                        )}
                                        {controlSearchItem.isProject && (
                                            <div className="row justify-center m-1">
                                                <div className="col-12 d-block p-1">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        {t('construction.search.constructionProject')}
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
                                                            name="projectId"
                                                            displayEmpty
                                                            sx={{
                                                                '& legend': { display: 'none' },
                                                                '& fieldset': { top: 0 },
                                                            }}
                                                            value={formValues.projectId}
                                                            onChange={handleInputChange}
                                                        >
                                                            <MenuItem value="0">
                                                                <em className="m-auto color-label-select-box">
                                                                    {t('message.project')}
                                                                </em>
                                                            </MenuItem>
                                                            {projects &&
                                                                projects.length > 0 &&
                                                                projects.map((data: any, index: any) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={data.id}
                                                                            value={data.id}
                                                                            className="text-center"
                                                                        >
                                                                            {data.projectName}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        )}
                                        {controlSearchItem.isBrand && (
                                            <div className="row justify-center m-1">
                                                <div className="col-12 d-block p-1">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        {t('construction.search.constructionBrand')}
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
                                                            name="companyId"
                                                            displayEmpty
                                                            sx={{
                                                                '& legend': { display: 'none' },
                                                                '& fieldset': { top: 0 },
                                                            }}
                                                            value={formValues.companyId}
                                                            onChange={handleInputChange}
                                                        >
                                                            <MenuItem value="0">
                                                                <em className="m-auto color-label-select-box">
                                                                    {t('message.brand')}
                                                                </em>
                                                            </MenuItem>
                                                            {companies &&
                                                                companies.length > 0 &&
                                                                companies.map((data: any, index: any) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={data.id}
                                                                            value={data.id}
                                                                            className="text-center"
                                                                        >
                                                                            {data.companyName}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        )}
                                        {controlSearchItem.isNation && (
                                            <div className="row justify-center m-1">
                                                <div className="col-12 d-block p-1">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        {t('construction.search.constructionNation')}
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
                                                            name="nationId"
                                                            displayEmpty
                                                            sx={{
                                                                '& legend': { display: 'none' },
                                                                '& fieldset': { top: 0 },
                                                            }}
                                                            value={formValues.nationId}
                                                            onChange={handleInputChange}
                                                        >
                                                            <MenuItem value="0">
                                                                <em className="m-auto color-label-select-box">
                                                                    {t('message.nation')}
                                                                </em>
                                                            </MenuItem>
                                                            {nations &&
                                                                nations.length > 0 &&
                                                                nations.map((data: any, index: any) => {
                                                                    return (
                                                                        <MenuItem
                                                                            key={data.id}
                                                                            value={data.id}
                                                                            className="text-center"
                                                                        >
                                                                            {data.name}
                                                                        </MenuItem>
                                                                    );
                                                                })}
                                                        </Select>
                                                    </FormControl>
                                                </div>
                                            </div>
                                        )}
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
