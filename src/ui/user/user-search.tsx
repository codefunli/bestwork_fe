import { useEffect, useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    CardHeader,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    TextField,
    Typography,
    AlertColor,
    Grid,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AlertColorConstants, UrlFeApp, ConfirmConstants } from '../../core/constants/common';
import { useQuery, useQueryClient } from 'react-query';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';
import { headUserCol, RoleUser } from '../../core/types/user';
import { useTranslation } from 'react-i18next';
import { getUsers, deleteUsers, getRoles } from '../../services/user-service';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import MessageShow from '../../shared-components/message/message';
import { SUCCESS_MSG } from '../../core/constants/message';
import './user.scss';

const initialValues = {
    page: '0',
    size: '5',
    sortDirection: 'ASC',
    sortBy: 'id',
    keyword: '',
    role: '',
    status: '',
};

export default function UserSearch() {
    const { t } = useTranslation();
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [state, setState] = useState<any>();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [userMsg, setUserMsg] = useState('');
    const [typeUserMsg, setTypeUserMsg] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [selectedUserIdList, setSelectedUserIdList] = useState({});
    const [roles, setRoles] = useState([]);

    const navigate = useNavigate();

    const { data, isLoading } = useQuery(['getUsers'], () => getUsers(formValues), {
        staleTime: 10000,
        onSuccess: (user: any) => {
            setState(user.data);
            user.data?.content?.forEach((userEl: { id: any }) => {
                queryClient.setQueryData(['userEl', userEl.id], userEl);
            });
        },
    });

    useEffect(() => {
        getRoles().then((data: any) => {
            setRoles(data);
        });
    }, []);

    useEffect(() => {
        if (data && data.data && data.data.content) {
            setState(data.data);
        }
    }, [data]);

    const fetchData = async (obj: any) => {
        const res = await getUsers(obj);
        if (res && res.data && res.data.content) {
            setState(res.data);
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = () => {
        fetchData({
            ...formValues,
        });
    };

    const handleClearData = () => {
        setFormValues({
            ...initialValues,
        });
        fetchData({
            ...initialValues,
        });
    };

    const handleEditData = (e: any, id: number) => {
        e.preventDefault();
        navigate(`${UrlFeApp.USER.INFO}/${id}`);
    };

    const arrButton: ArrayAction[] = [
        {
            nameFn: 'Edit',
            acFn: handleEditData,
            iconFn: 'ModeEditIcon',
        },
    ];

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
        setUserMsg(msg);
        setTypeUserMsg(type);
    };

    const handleDeleteCallBack = (userIdList: any) => {
        setUserMsg(SUCCESS_MSG.S01_004);
        setTypeUserMsg(AlertColorConstants.SUCCESS);
        setIsOpenModal(true);
        setSelectedUserIdList({
            userIdList: [...userIdList.ids],
        });
    };

    const alertOkFunc = () => {
        deleteUsers(selectedUserIdList)
            .then((value) => {
                if (value.status === 'OK') {
                    handleMessage(true, value.message, AlertColorConstants.SUCCESS);
                    fetchData({
                        ...formValues,
                    });
                }
            })
            .catch((err) => {
                handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
            });
        setIsOpenModal(false);
    };

    const closeModal = () => {
        setIsOpenModal(false);
        setIsShowMessage(false);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    return (
        <div className="user-search">
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <div className="row">
                        <div className="col-sm-12 col-md-6 text-start d-none d-lg-block">
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t('user.search.title')}
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={UrlFeApp.USER.CREATE}
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t('button.btnCreate')}
                            </Button>
                        </div>
                        <div className="col-sm-12 text-start d-block d-lg-none">
                            <Button
                                variant="contained"
                                color="primary"
                                component={Link}
                                to={UrlFeApp.USER.CREATE}
                                sx={{ textTransform: 'uppercase' }}
                            >
                                {t('button.btnCreate')}
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} lg={3} sx={{ mt: 1, mb: 1 }}>
                    <Card w-full>
                        <CardHeader
                            avatar={<Avatar aria-label="recipe">SC</Avatar>}
                            title={t('user.search.subtitle')}
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
                                    <div className="col-12 d-block p-1">
                                        <InputLabel htmlFor="outlined-adornment-amount">
                                            {t('user.search.keyword')}
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
                                            name="keyword"
                                            label=""
                                            placeholder={t('common.placeholder')}
                                            value={formValues.keyword}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="col-12 d-block p-1">
                                        <InputLabel htmlFor="role">{t('user.info.role')}</InputLabel>
                                        <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
                                            <Select
                                                name="role"
                                                value={formValues.role}
                                                displayEmpty
                                                sx={{
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value="" selected={true}>
                                                    <em>{t('user.search.selectRole')}</em>
                                                </MenuItem>
                                                {roles.map((role: any) => (
                                                    <MenuItem value={role.id}>{role.roleName}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </div>
                                    <div className="col-12 d-block p-1">
                                        <InputLabel htmlFor="isBlocked">{t('user.search.status')}</InputLabel>
                                        <FormControl size="small" fullWidth sx={{ mt: 1, mb: 1 }} variant="outlined">
                                            <Select
                                                name="status"
                                                value={formValues.status}
                                                displayEmpty
                                                sx={{
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                onChange={handleInputChange}
                                            >
                                                <MenuItem value="" selected={true}>
                                                    <em>{t('user.search.selectStatus')}</em>
                                                </MenuItem>
                                                <MenuItem value="1">
                                                    <em>{t('user.search.enabled')}</em>
                                                </MenuItem>
                                                <MenuItem value="0">
                                                    <em>{t('user.search.notEnabled')}</em>
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
                                        <Button onClick={handleSubmit} sx={{ mr: 1 }} size="small" variant="contained">
                                            Search
                                        </Button>
                                        <Button onClick={handleClearData} variant="outlined">
                                            Clear
                                        </Button>
                                    </ButtonGroup>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} lg={9} sx={{ mt: 1, mb: 1 }}>
                    <EnhancedTable
                        deleteCallBack={handleDeleteCallBack}
                        searchCallBack={handleSearchCallBack}
                        headCells={headUserCol}
                        rows={
                            state || {
                                content: [],
                            }
                        }
                        isLoading={isLoading}
                        arrButton={arrButton}
                    />
                </Grid>
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
                message={userMsg}
                showMessage={isShowMessage}
                type={typeUserMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
}
