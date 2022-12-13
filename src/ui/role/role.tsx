import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import {
    AlertColor,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    Grid,
    IconButton,
    Paper,
    Tab,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tabs,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { createContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AlertColorConstants, ConfirmConstants, Item, StatusCode } from '../../core/constants/common';
import { CommentConstant } from '../../core/constants/constant';
import { SUCCESS_MSG } from '../../core/constants/message';
import { useAppDispatch } from '../../core/hook/redux';
import { monitorActions } from '../../core/redux/monitor-slice';
import { PermissionResDTO } from '../../models/permission-res-dto';
import { RoleHasPermissionResDto, RoleResDto } from '../../models/role-res-dto';
import { getMonitor } from '../../services/monitor-service';
import {
    createRole,
    createScreen,
    deleteRole,
    deleteScreen,
    getPermissionsList,
    getRoles,
    updatePermissions,
    updateRole,
    updateScreen,
} from '../../services/role-service';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import CreateRoleModal from './create-modal';
import CreateScreenModal from './create-screen-modal';
import './role.scss';
import UpdateRoleModal from './update-modal';
import UpdateScreenModal from './update-screen-modal';
import DeleteIcon from '@mui/icons-material/Delete';

const initRoleList = [
    {
        id: -1,
        roleName: '',
        description: '',
        permissions: [
            {
                id: -1,
                canAccess: false,
                canAdd: false,
                canEdit: false,
                canDelete: false,
                status: -1,
                monitorId: -1,
                monitorName: '',
                roleId: -1,
            },
        ],
    },
];

export const ScreenContext = createContext<any>({});

export default function Role() {
    const { t } = useTranslation();
    const [roleList, setRoleList] = useState<RoleResDto[]>();
    const [rolePrimitiveList, setRolePrimitiveList] = useState<RoleResDto[]>();

    const [roleRegisterList, setRoleRegisterList] = useState<RoleHasPermissionResDto[]>();

    const [currentTab, setCurrentTab] = useState(0);
    const [currentRole, setCurrentRole] = useState<RoleHasPermissionResDto>(initRoleList[0]);

    const [searchKeyword, setSearchKeyword] = useState('');
    const [roleMsg, setRoleMsg] = useState('');
    const [roleMsgType, setRoleMsgType] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [isShowMsg, setIsShowMsg] = useState(false);

    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenCreateScreenModal, setIsOpenCreateScreenModal] = useState(false);
    const [isOpenUpdateScreenModal, setIsOpenUpdateScreenModal] = useState(false);
    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const [targetScreen, setTargetScreen] = useState<any>();
    const dispatch = useAppDispatch();

    const [isSubmitting, setIsSubmitting] = useState(false);

    const toggleCreateScreenModal = (value: boolean) => setIsOpenCreateScreenModal(value);
    const toggleUpdateScreenModal = (value: boolean) => setIsOpenUpdateScreenModal(value);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);
    const toggleUpdateModal = (value: boolean) => setIsOpenUpdateModal(value);

    const handleGetScreenValue = (data: any) => {
        setTargetScreen(() => {
            toggleUpdateScreenModal(true);
            return data;
        });
    };

    const handleDeleteScreen = (data: any) => {
        setTargetScreen(() => {
            setIsOpenDeleteModal(true);
            return data;
        });
    };

    const fetchData = () => {
        getRoles().then((res: any) => {
            if (res) {
                let tmpRoleList: RoleResDto[] = [];
                let tmpRoleRegisterList: RoleHasPermissionResDto[] = [];
                res.data.map((target: RoleResDto) => {
                    tmpRoleList.push({
                        id: target.id,
                        roleName: target.roleName,
                        description: target.description,
                    });

                    tmpRoleRegisterList.push({
                        id: target.id,
                        roleName: target.roleName,
                        description: target.description,
                        permissions: [],
                    });
                });

                setRoleList(tmpRoleList);
                setRolePrimitiveList(tmpRoleList);

                setRoleRegisterList(tmpRoleRegisterList);

                if (tmpRoleList && tmpRoleList.length > 0) {
                    getPermissionsList(tmpRoleList[0].id)
                        .then((res) => {
                            if (res.status === StatusCode.OK && res.data) {
                                setCurrentRole({
                                    ...currentRole,
                                    id: tmpRoleList[0].id,
                                    roleName: tmpRoleList[0].roleName,
                                    description: tmpRoleList[0].description,
                                    permissions: res.data,
                                });
                            }
                        })
                        .catch((err) => {
                            handleMessage(true, err.message, AlertColorConstants.ERROR);
                        });
                }
            }
        });
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleChangeCurrentTab = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
    };

    const handleChangeTab = (id: number) => {
        if (roleRegisterList) {
            roleRegisterList.map((target, index) => {
                if (target.id === id) {
                    let currId = target.id;
                    let currRoleName = target.roleName;
                    let description = target.description;

                    if (target.permissions && target.permissions.length > 0) {
                        setCurrentRole(target);
                    } else {
                        getPermissionsList(currId)
                            .then((res) => {
                                if (res.status === StatusCode.OK && res.data) {
                                    setCurrentRole({
                                        id: currId,
                                        roleName: currRoleName,
                                        description: description,
                                        permissions: res.data,
                                    });
                                }
                            })
                            .catch((err) => {
                                handleMessage(true, err.message, AlertColorConstants.ERROR);
                            });
                    }
                }

                return;
            });
        }
    };

    const handleChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>,
        screenId: any,
        index: number,
        activeAll?: boolean,
        allStatus?: boolean,
    ) => {
        // Change selected screen in current role (tab)
        let selectedScreen = currentRole?.permissions.find((permission) => permission.monitorId === parseInt(screenId));
        let tempPermission: PermissionResDTO;

        // If select all permissions
        if (selectedScreen) {
            if (activeAll) {
                if (allStatus) {
                    tempPermission = {
                        ...selectedScreen,
                        canAccess: false,
                        canAdd: false,
                        canEdit: false,
                        canDelete: false,
                    };
                } else {
                    tempPermission = {
                        ...selectedScreen,
                        canAccess: true,
                        canAdd: true,
                        canEdit: true,
                        canDelete: true,
                    };
                }
            } else {
                tempPermission = {
                    ...selectedScreen,
                    [event.target.name]: event.target.checked,
                };

                if (event.target.name === 'canAccess' && event.target.checked === false) {
                    tempPermission = {
                        ...tempPermission,
                        canAccess: false,
                        canAdd: false,
                        canEdit: false,
                        canDelete: false,
                    };
                }
            }

            // Update permissions of selected screen
            if (currentRole) {
                let permissions: any = [...currentRole.permissions];
                permissions[index] = tempPermission;
                setCurrentRole({
                    ...currentRole,
                    permissions,
                });

                let tmpRoleList = roleRegisterList;
                if (tmpRoleList) {
                    tmpRoleList.map((tmpTarget, index) => {
                        if (tmpRoleList && tmpTarget.id === currentRole.id) {
                            tmpRoleList[index] = {
                                ...currentRole,
                                permissions,
                            };
                            setRoleRegisterList(tmpRoleList);
                        }
                    });
                }
            }
        }
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMsg(showMsg);
        setRoleMsg(msg);
        setRoleMsgType(type);
    };

    const handleResponse = (resp: any) => {
        switch (resp.status) {
            case StatusCode.OK:
                handleMessage(true, resp.message, AlertColorConstants.SUCCESS);
                break;
            case StatusCode:
                handleMessage(true, resp.message, AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, resp.message, AlertColorConstants.WARNING);
                break;
        }
    };

    const handleCloseMsg = () => {
        setIsShowMsg(false);
    };

    const handleCreateNewRole = (roleName: string, description: string) => {
        createRole({ name: roleName, description })
            .then((res) => {
                handleResponse(res);
                fetchData();
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const handleCreateNewScreen = (name: string, icon: string, url: string) => {
        createScreen({ name, icon, url })
            .then((res) => {
                handleResponse(res);
                fetchData();
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };
    const handleUpdateNewScreen = (data: any) => {
        updateScreen({
            id: data.id,
            name: data.name,
            icon: data.icon,
            url: data.url,
        })
            .then((res) => {
                handleResponse(res);
                fetchMonitorData();
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const fetchMonitorData = () => {
        getMonitor().then((data: any) => {
            dispatch(monitorActions.setMonitor(data.data));
        });
    };

    const handleUpdateRole = (id: number, roleName: string, description: string) => {
        updateRole({ id: id, name: roleName, description })
            .then((res) => {
                handleResponse(res);
                if (roleList) {
                    roleList.map((target, index) => {
                        if (target.id === id) {
                            roleList[index] = {
                                id: id,
                                roleName: roleName,
                                description: description,
                            };
                        }
                    });
                }
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const handleSaveChange = (e: any) => {
        setIsSubmitting(true);
        updatePermissions(roleRegisterList)
            .then((res) => {
                handleResponse(res);
                setIsSubmitting(false);
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
                setIsSubmitting(false);
            });
    };

    const handleResetCurrentRoleChange = () => {
        if (currentRole) {
            getPermissionsList(currentRole.id)
                .then((res) => {
                    if (res.status === StatusCode.OK && res.data) {
                        setCurrentRole({
                            id: currentRole.id,
                            roleName: currentRole.roleName,
                            description: currentRole.description,
                            permissions: res.data,
                        });

                        let tmpRoleList = roleRegisterList;
                        if (tmpRoleList) {
                            tmpRoleList.map((tmpTarget, index) => {
                                if (tmpRoleList && tmpTarget.id === currentRole.id && res.data) {
                                    tmpRoleList[index] = {
                                        ...currentRole,
                                        permissions: res.data,
                                    };
                                    setRoleRegisterList(tmpRoleList);
                                }
                            });
                        }
                    }
                })
                .catch((err) => {
                    handleMessage(true, err.message, AlertColorConstants.ERROR);
                });
        }
    };

    const handleResetAllChange = () => {
        fetchData();
        setCurrentTab(0);
    };

    const handleSearch = () => {
        if (searchKeyword.trim() === '') {
            setRoleList(rolePrimitiveList);
        } else {
            const filterItems = roleList?.filter(
                (role: RoleResDto) => role.roleName.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1,
            );
            setRoleList(filterItems);
            if (filterItems && filterItems.length > 0) {
                let currId = filterItems[0].id;
                let currRoleName = filterItems[0].roleName;
                let description = filterItems[0].description;
                getPermissionsList(currId)
                    .then((res) => {
                        if (res.status === StatusCode.OK && res.data) {
                            setCurrentRole({
                                id: currId,
                                roleName: currRoleName,
                                description: description,
                                permissions: res.data,
                            });
                        }
                    })
                    .catch((err) => {
                        handleMessage(true, err.message, AlertColorConstants.ERROR);
                    });
            }
        }
    };

    const handleDeleteRole = (event: any) => {
        event.preventDefault();
        setRoleMsg(SUCCESS_MSG.S01_004);
        setRoleMsgType(AlertColorConstants.SUCCESS);
        setIsOpenDeleteModal(true);
    };

    const alertConfirmDelete = () => {
        deleteScreen(targetScreen.monitorId)
            .then((res) => {
                handleResponse(res);
                setIsOpenDeleteModal(false);
                fetchData();
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const closeDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setIsShowMsg(false);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === CommentConstant.ENTER) {
            event.preventDefault();
        }
    };

    return (
        <div className="role">
            <Grid container direction="row" spacing={3}>
                <Grid item xs={12} sx={{ mt: 1 }}>
                    <div className="row">
                        <div className="col-sm-12 col-md-4 text-start d-none d-lg-block">
                            <Typography
                                variant="h5"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase' }}
                                className="btn disabled text-white bg-light opacity-100 border-customTheme"
                            >
                                <div className="particletext">{t('role.title')}</div>
                            </Typography>
                        </div>

                        <div className="col-sm-12 col-md-8 text-end d-none d-lg-block">
                            <Button
                                disabled={isSubmitting}
                                className="btn-create btn-create-screen"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateScreenModal(true)}
                                style={{ marginRight: '10px' }}
                            >
                                {t(Item.LABEL_BTN.CREATE_SCREEN)}
                            </Button>
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateModal(true)}
                            >
                                {t(Item.LABEL_BTN.CREATE_ROLE)}
                            </Button>
                        </div>

                        <div className="col-sm-12 text-start d-block d-lg-none">
                            <Button
                                className="btn-create btn-create-screen"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateScreenModal(true)}
                                style={{ marginRight: '10px' }}
                                disabled={isSubmitting}
                            >
                                {t(Item.LABEL_BTN.CREATE_SCREEN)}
                            </Button>
                            <Button
                                className="btn-create"
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateModal(true)}
                                disabled={isSubmitting}
                            >
                                {t(Item.LABEL_BTN.CREATE_ROLE)}
                            </Button>
                        </div>
                    </div>
                </Grid>
                <Grid item xs={12} sx={{ mt: 1, mb: 1 }} className="content-area">
                    <Card w-full="true">
                        <CardContent>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1 },
                                }}
                                noValidate
                                autoComplete="off"
                            >
                                <div className="row">
                                    <div className="col-xs-12 col-md-5 col-lg-4 col-xl-3">
                                        <div className="search-area mb-3">
                                            <TextField
                                                size="small"
                                                fullWidth={true}
                                                sx={{
                                                    mt: 1,
                                                    mb: 1,
                                                    '& legend': { display: 'none' },
                                                    '& fieldset': { top: 0 },
                                                }}
                                                name="keyword"
                                                label=""
                                                placeholder={t('common.placeholder')}
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                                onKeyDown={handleKeyDown}
                                                autoComplete="off"
                                            />
                                            <Button
                                                variant="contained"
                                                onClick={handleSearch}
                                                color="primary"
                                                disabled={isSubmitting}
                                            >
                                                <SearchIcon />
                                            </Button>
                                        </div>
                                        <Tabs
                                            orientation="vertical"
                                            value={currentTab}
                                            onChange={handleChangeCurrentTab}
                                            aria-label=""
                                            sx={{
                                                borderRight: 1,
                                                borderColor: 'divider',
                                            }}
                                            className="role-list"
                                        >
                                            {roleList &&
                                                roleList.map((role, index) => (
                                                    <Tab
                                                        key={role.id}
                                                        label={role.roleName}
                                                        onClick={() => handleChangeTab(role.id)}
                                                    />
                                                ))}
                                        </Tabs>
                                        <div className="text-center justify-center mt-4">
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                aria-label="Disabled elevation buttons"
                                            >
                                                <Button
                                                    sx={{ mr: 1 }}
                                                    variant="contained"
                                                    onClick={() => toggleUpdateModal(true)}
                                                    disabled={isSubmitting}
                                                >
                                                    {t('button.btnUpdate')}
                                                </Button>
                                                <Button
                                                    onClick={(e) => handleDeleteRole(e)}
                                                    variant="outlined"
                                                    color="error"
                                                    disabled={true}
                                                >
                                                    {t('button.btnDelete')}
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>

                                    <div className="col-xs-12 col-md-7 col-lg-8 col-xl-9">
                                        <div className="reset-all mb-3">
                                            <Button
                                                onClick={() => handleResetAllChange()}
                                                variant="contained"
                                                color="warning"
                                            >
                                                {t('button.btnResetAll')}
                                            </Button>
                                        </div>
                                        <div className="role-content">
                                            <TableContainer component={Paper}>
                                                <Table className="role-table" aria-label={t('role.tab.roleList')}>
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>
                                                                <b>{t('role.tab.screen')}</b>
                                                            </TableCell>
                                                            <TableCell align="center">{t('common.action')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.all')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.view')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.create')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.edit')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.delete')}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {currentRole &&
                                                            currentRole.permissions.map((row, index) => {
                                                                return (
                                                                    row.monitorId !== -1 && (
                                                                        <TableRow
                                                                            key={row.monitorId}
                                                                            sx={{
                                                                                '&:last-child td, &:last-child th': {
                                                                                    border: 0,
                                                                                },
                                                                            }}
                                                                        >
                                                                            <TableCell component="th" scope="row">
                                                                                {row.monitorName}
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Tooltip
                                                                                    title={t('tooltip.edit')}
                                                                                    placement="top"
                                                                                >
                                                                                    <IconButton
                                                                                        onClick={() =>
                                                                                            handleGetScreenValue(row)
                                                                                        }
                                                                                    >
                                                                                        <EditIcon color="primary" />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                                <Tooltip
                                                                                    title={t('tooltip.edit')}
                                                                                    placement="top"
                                                                                >
                                                                                    <IconButton
                                                                                        onClick={() =>
                                                                                            handleDeleteScreen(row)
                                                                                        }
                                                                                    >
                                                                                        <DeleteIcon color="primary" />
                                                                                    </IconButton>
                                                                                </Tooltip>
                                                                            </TableCell>

                                                                            <TableCell align="center">
                                                                                <Checkbox
                                                                                    checked={
                                                                                        row.canAccess &&
                                                                                        row.canAdd &&
                                                                                        row.canEdit &&
                                                                                        row.canDelete
                                                                                    }
                                                                                    onChange={(e) =>
                                                                                        handleChangeCheckbox(
                                                                                            e,
                                                                                            row.monitorId,
                                                                                            index,
                                                                                            true,
                                                                                            row.canAccess &&
                                                                                                row.canAdd &&
                                                                                                row.canEdit &&
                                                                                                row.canDelete,
                                                                                        )
                                                                                    }
                                                                                    name="all"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Checkbox
                                                                                    checked={row.canAccess}
                                                                                    onChange={(e) =>
                                                                                        handleChangeCheckbox(
                                                                                            e,
                                                                                            row.monitorId,
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    name="canAccess"
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Checkbox
                                                                                    checked={row.canAdd}
                                                                                    onChange={(e) =>
                                                                                        handleChangeCheckbox(
                                                                                            e,
                                                                                            row.monitorId,
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    name="canAdd"
                                                                                    disabled={!row.canAccess}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Checkbox
                                                                                    checked={row.canEdit}
                                                                                    onChange={(e) =>
                                                                                        handleChangeCheckbox(
                                                                                            e,
                                                                                            row.monitorId,
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    name="canEdit"
                                                                                    disabled={!row.canAccess}
                                                                                />
                                                                            </TableCell>
                                                                            <TableCell align="center">
                                                                                <Checkbox
                                                                                    checked={row.canDelete}
                                                                                    onChange={(e) =>
                                                                                        handleChangeCheckbox(
                                                                                            e,
                                                                                            row.monitorId,
                                                                                            index,
                                                                                        )
                                                                                    }
                                                                                    name="canDelete"
                                                                                    disabled={!row.canAccess}
                                                                                />
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    )
                                                                );
                                                            })}
                                                    </TableBody>
                                                </Table>
                                            </TableContainer>
                                        </div>
                                        <div className="text-center justify-center mt-4">
                                            <ButtonGroup
                                                disableElevation
                                                variant="contained"
                                                aria-label="Disabled elevation buttons"
                                            >
                                                <Button
                                                    disabled={isSubmitting}
                                                    sx={{ mr: 1 }}
                                                    variant="contained"
                                                    onClick={(e) => handleSaveChange(e)}
                                                >
                                                    {t('button.btnSave')}
                                                </Button>
                                                <Button
                                                    disabled={isSubmitting}
                                                    onClick={() => handleResetCurrentRoleChange()}
                                                    variant="outlined"
                                                >
                                                    {t('button.btnReset')}
                                                </Button>
                                            </ButtonGroup>
                                        </div>
                                    </div>
                                </div>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            {isOpenCreateModal ? (
                <CreateRoleModal
                    isOpen={isOpenCreateModal}
                    toggleOpen={toggleCreateModal}
                    handleCreateNewRole={handleCreateNewRole}
                />
            ) : (
                <UpdateRoleModal
                    isOpen={isOpenUpdateModal}
                    toggleOpen={toggleUpdateModal}
                    currentRole={currentRole}
                    handleUpdateRole={handleUpdateRole}
                />
            )}

            {isOpenCreateScreenModal ? (
                <CreateScreenModal
                    isOpen={isOpenCreateScreenModal}
                    toggleOpen={toggleCreateScreenModal}
                    handleCreateNewScreen={handleCreateNewScreen}
                />
            ) : (
                <ScreenContext.Provider value={targetScreen}>
                    <UpdateScreenModal
                        isOpen={isOpenUpdateScreenModal}
                        toggleOpen={toggleUpdateScreenModal}
                        handleUpdateNewScreen={handleUpdateNewScreen}
                    />
                </ScreenContext.Provider>
            )}

            <MessageShow message={roleMsg} showMessage={isShowMsg} type={roleMsgType} handleCloseMsg={handleCloseMsg} />
            <AlertDialogSlide
                isOpen={isOpenDeleteModal}
                closeFunc={closeDeleteModal}
                okFunc={alertConfirmDelete}
                title={t(ConfirmConstants.DELETE.title)}
                content={t(ConfirmConstants.DELETE.content)}
                noBtn={t(ConfirmConstants.NO_BTN)}
                okBtn={t(ConfirmConstants.OK_BTN)}
            />
        </div>
    );
}
