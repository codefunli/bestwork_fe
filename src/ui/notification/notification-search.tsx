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
import { green } from '@mui/material/colors';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery, useQueryClient } from 'react-query';
import { ConfirmConstants, Item } from '../../core/constants/common';
import { SUCCESS_MSG } from '../../core/constants/message';
import { headNotiCol } from '../../core/types/notifications';
import { changeStatus, deleteNotifications, getNotifications } from '../../services/notifications-service';
import MessageShow from '../../shared-components/message/message';
import AlertDiaLogInform from '../../shared-components/modal/alert-dialog-inform';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import EnhancedTable, { ArrayAction } from '../../shared-components/table-manager/table-data';

const initialValues = {
    page: '0',
    size: '5',
    sortDirection: 'desc',
    sortBy: 'id',
    keyword: '',
    status: '-1',
};

export default function NotificationsSearch() {
    const [state, setState] = useState<any>();
    const { t } = useTranslation();
    const [formValues, setFormValues] = useState(initialValues);
    const queryClient = useQueryClient();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');
    const [listId, setListId] = useState<any>({
        listId: [],
    });
    const [isOpenModalNotification, setIsOpenModalNotification] = useState(false);
    const [id, setId] = useState(0);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');

    const { data, isLoading } = useQuery(['getConstruction'], () => getNotifications(formValues), {
        staleTime: 10000,
        onSuccess: (noti: any) => {
            setState(noti.data);
            noti.data?.content?.forEach((notiEl: { id: any }) => {
                queryClient.setQueryData(['notiEl', notiEl.id], notiEl);
            });
        },
    });

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (e: any) => {
        fetchData({
            ...formValues,
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

    const fetchData = async (obj: any) => {
        const resp = await getNotifications(obj);
        if (resp && resp.data) {
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

    const closeModal = () => {
        setIsOpenModal(false);
        setIsShowMessage(false);
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

    const alertOkFunc = () => {
        deleteNotifications(listId)
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

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const alertOkFuncNotification = () => {
        changeStatus(id)
            .then((res) => {
                setIsOpenModalNotification(false);
                fetchData({
                    ...formValues,
                });
            })
            .catch((err) => {
                handleMessage(true, t('message.error'), 'error');
            });
    };

    const handleReadNotification = (e: any, id: string) => {
        state.content.map((target: any) => {
            if (target.id === id) {
                setId(Number(id));
                setTitle(target.title);
                setContent(target.content);
            }
        });
        setIsOpenModalNotification(true);
    };

    const arrButton: ArrayAction[] = [
        {
            nameFn: t('tooltip.readMore'),
            acFn: handleReadNotification,
            iconFn: 'ReadMoreIcon',
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
                            <div className="particletext">Notifications Search</div>
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
                                                                    width: '100%',
                                                                }}
                                                                className="btn btn-outline-success"
                                                                label={t(Item.LABEL_BTN.UNREAD)}
                                                                size="small"
                                                            />
                                                        </MenuItem>
                                                        <MenuItem value={1}>
                                                            <Chip
                                                                sx={{ backgroundColor: green[400], width: '100%' }}
                                                                label={t(Item.LABEL_BTN.READ)}
                                                                size="small"
                                                                className="btn btn-outline-secondary"
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
                    headCells={headNotiCol}
                    rows={
                        state || {
                            content: [],
                        }
                    }
                    isLoading={false}
                    arrButton={arrButton}
                    statusList={() => {
                        console.log();
                    }}
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

            <AlertDiaLogInform
                isOpen={isOpenModalNotification}
                title={title}
                content={content}
                okFunc={alertOkFuncNotification}
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
