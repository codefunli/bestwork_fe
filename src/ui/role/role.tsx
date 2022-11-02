import { useState } from 'react';
import {
    AlertColor,
    Button,
    ButtonGroup,
    Card,
    CardContent,
    Checkbox,
    Grid,
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
    Typography,
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Box } from '@mui/system';
import CreateRoleModal from './create-modal';
import UpdateRoleModal from './update-modal';
import SearchIcon from '@mui/icons-material/Search';
import { getRoles, createRole, updateRole, deleteRole } from '../../services/role-service';
import { AlertColorConstants, ConfirmConstants, StatusCode } from '../../core/constants/common';
import MessageShow from '../../shared-components/message/message';
import AlertDialogSlide from '../../shared-components/modal/alert-dialog-slide';
import { SUCCESS_MSG } from '../../core/constants/message';
import './role.scss';

const initRoleList = [
    {
        id: 1,
        name: 'Super Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: true,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 2,
        name: 'Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: false,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: false,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: false,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 3,
        name: 'User',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 4,
        name: 'Super Man',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 5,
        name: 'Batman',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: false,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 1,
        name: 'Super Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: true,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 2,
        name: 'Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: true,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 3,
        name: 'User',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 4,
        name: 'Super Man',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 5,
        name: 'Batman',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: false,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 1,
        name: 'Super Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: true,
                delete: true,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: true,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 2,
        name: 'Admin',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: true,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 3,
        name: 'User',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
    {
        id: 4,
        name: 'Super Man',
        description: 'Description',
        permissions: [
            {
                screenId: 1,
                screenName: 'DashBoard',
                view: true,
                create: false,
                edit: false,
                delete: false,
            },
            {
                screenId: 2,
                screenName: 'Company',
                view: true,
                create: true,
                edit: false,
                delete: false,
            },
            {
                screenId: 3,
                screenName: 'User',
                view: true,
                create: false,
                edit: true,
                delete: false,
            },
        ],
    },
];

export default function Role() {
    const { t } = useTranslation();
    const [roleList, setRoleList] = useState<any[]>(JSON.parse(JSON.stringify(initRoleList)));
    const [currentTab, setCurrentTab] = useState(0);
    const [currentRole, setCurrentRole] = useState(initRoleList[0]);
    const [searchKeyword, setSearchKeyword] = useState('');
    const [roleMsg, setRoleMsg] = useState('');
    const [roleMsgType, setRoleMsgType] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [isShowMsg, setIsShowMsg] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const toggleCreateModal = (value: boolean) => setIsOpenCreateModal(value);

    const [isOpenUpdateModal, setIsOpenUpdateModal] = useState(false);
    const toggleUpdateModal = (value: boolean) => setIsOpenUpdateModal(value);

    const fetchData = async () => {
        const res: any = await getRoles();
        if (res && res.data && res.data.content) {
            setRoleList(res.data);
        }
    };

    const handleChangeTab = (event: React.SyntheticEvent, newValue: number) => {
        setCurrentTab(newValue);
        setCurrentRole(roleList[newValue]);
    };

    const handleChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>,
        screenId: any,
        index: number,
        activeAll?: boolean,
        allStatus?: boolean,
    ) => {
        // Change selected screen in current role (tab)
        let selectedScreen = currentRole.permissions.find((permission) => permission.screenId === parseInt(screenId));
        let tempPermission: any;

        // If select all permissions
        if (activeAll) {
            if (allStatus) {
                tempPermission = {
                    ...selectedScreen,
                    view: false,
                    create: false,
                    edit: false,
                    delete: false,
                };
            } else {
                tempPermission = {
                    ...selectedScreen,
                    view: true,
                    create: true,
                    edit: true,
                    delete: true,
                };
            }
        } else {
            tempPermission = {
                ...selectedScreen,
                [event.target.name]: event.target.checked,
            };

            if (event.target.name === 'view' && event.target.checked === false) {
                tempPermission = {
                    ...tempPermission,
                    view: false,
                    create: false,
                    edit: false,
                    delete: false,
                };
            }
        }

        // Update permissions of selected screen
        let permissions: any = [...currentRole.permissions];
        permissions[index] = tempPermission;
        setCurrentRole({
            ...currentRole,
            permissions,
        });

        // Update role list
        let tmpRoleList = roleList;
        tmpRoleList[currentTab] = {
            ...currentRole,
            permissions,
        };
        setRoleList(tmpRoleList);
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
        createRole({ roleName, description })
            .then((res) => {
                handleResponse(res);
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });

        // Temp
        setRoleList([
            ...roleList,
            {
                id: roleList.length + 2,
                name: roleName,
                description: description,
                permissions: [
                    {
                        screenId: 1,
                        screenName: 'DashBoard',
                        view: true,
                        create: false,
                        edit: true,
                        delete: true,
                    },
                    {
                        screenId: 2,
                        screenName: 'Company',
                        view: false,
                        create: true,
                        edit: true,
                        delete: true,
                    },
                    {
                        screenId: 3,
                        screenName: 'User',
                        view: true,
                        create: false,
                        edit: true,
                        delete: false,
                    },
                ],
            },
        ]);
    };

    const handleUpdateRole = (roleName: string, description: string) => {
        updateRole(roleList[currentTab].id, { roleName, description })
            .then((res) => {
                handleResponse(res);
            })
            .catch((err) => {
                handleMessage(true, err.message, AlertColorConstants.ERROR);
            });
    };

    const handleSaveChange = () => {};

    const handleResetCurrentRoleChange = () => {
        setCurrentRole(JSON.parse(JSON.stringify(initRoleList[currentTab])));
        let tempRoleList = roleList;
        tempRoleList[currentTab] = initRoleList[currentTab];
        setRoleList(tempRoleList);
    };

    const handleResetAllChange = () => {
        setRoleList(JSON.parse(JSON.stringify(initRoleList)));
        setCurrentRole(initRoleList[currentTab]);
    };

    const handleSearch = () => {
        const filterItems = () => {
            return initRoleList.filter((role) => role.name.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1);
        };
        setRoleList(filterItems);
    };

    const handleDeleteRole = () => {
        setRoleMsg(SUCCESS_MSG.S01_004);
        setRoleMsgType(AlertColorConstants.SUCCESS);
        setIsOpenDeleteModal(true);
    };

    const alertConfirmDelete = () => {
        deleteRole(roleList[currentTab].id)
            .then((value) => {
                setIsShowMsg(true);
                fetchData();
            })
            .catch((err) => {
                handleMessage(true, t('message.error'), AlertColorConstants.ERROR);
            });
        setIsOpenDeleteModal(false);
    };

    const closeDeleteModal = () => {
        setIsOpenDeleteModal(false);
        setIsShowMsg(false);
    };

    return (
        <div className="role">
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
                                {t('role.title')}
                            </Typography>
                        </div>
                        <div className="col-sm-12 col-md-6 text-end d-none d-lg-block">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateModal(true)}
                            >
                                {t('button.btnCreate')}
                            </Button>
                        </div>
                        <div className="col-sm-12 text-start d-block d-lg-none">
                            <Button
                                variant="contained"
                                color="primary"
                                sx={{ textTransform: 'uppercase' }}
                                onClick={() => toggleCreateModal(true)}
                            >
                                {t('button.btnCreate')}
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
                                                value={searchKeyword}
                                                onChange={(e) => setSearchKeyword(e.target.value)}
                                            />
                                            <Button variant="contained" onClick={handleSearch} color="info">
                                                <SearchIcon />
                                            </Button>
                                        </div>
                                        <Tabs
                                            orientation="vertical"
                                            value={currentTab}
                                            onChange={handleChangeTab}
                                            aria-label=""
                                            sx={{
                                                borderRight: 1,
                                                borderColor: 'divider',
                                            }}
                                            className="role-list"
                                        >
                                            {roleList.map((role, index) => (
                                                <Tab key={index} label={role.name} />
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
                                                >
                                                    {t('button.btnUpdate')}
                                                </Button>
                                                <Button
                                                    onClick={() => handleDeleteRole()}
                                                    variant="outlined"
                                                    color="error"
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
                                                            <TableCell align="center">{t('role.tab.all')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.view')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.create')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.edit')}</TableCell>
                                                            <TableCell align="center">{t('role.tab.delete')}</TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {currentRole.permissions.map((row, index) => (
                                                            <TableRow
                                                                key={row.screenId}
                                                                sx={{
                                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                                }}
                                                            >
                                                                <TableCell component="th" scope="row">
                                                                    {row.screenName}
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        checked={
                                                                            row.view &&
                                                                            row.create &&
                                                                            row.edit &&
                                                                            row.delete
                                                                        }
                                                                        onChange={(e) =>
                                                                            handleChangeCheckbox(
                                                                                e,
                                                                                row.screenId,
                                                                                index,
                                                                                true,
                                                                                row.view &&
                                                                                    row.create &&
                                                                                    row.edit &&
                                                                                    row.delete,
                                                                            )
                                                                        }
                                                                        name="all"
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        checked={row.view}
                                                                        onChange={(e) =>
                                                                            handleChangeCheckbox(e, row.screenId, index)
                                                                        }
                                                                        name="view"
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        checked={row.create}
                                                                        onChange={(e) =>
                                                                            handleChangeCheckbox(e, row.screenId, index)
                                                                        }
                                                                        name="create"
                                                                        disabled={!row.view}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        checked={row.edit}
                                                                        onChange={(e) =>
                                                                            handleChangeCheckbox(e, row.screenId, index)
                                                                        }
                                                                        name="edit"
                                                                        disabled={!row.view}
                                                                    />
                                                                </TableCell>
                                                                <TableCell align="center">
                                                                    <Checkbox
                                                                        checked={row.delete}
                                                                        onChange={(e) =>
                                                                            handleChangeCheckbox(e, row.screenId, index)
                                                                        }
                                                                        name="delete"
                                                                        disabled={!row.view}
                                                                    />
                                                                </TableCell>
                                                            </TableRow>
                                                        ))}
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
                                                <Button sx={{ mr: 1 }} variant="contained" onClick={handleSaveChange}>
                                                    {t('button.btnSave')}
                                                </Button>
                                                <Button
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

            <CreateRoleModal
                isOpen={isOpenCreateModal}
                toggleOpen={toggleCreateModal}
                handleCreateNewRole={handleCreateNewRole}
            />

            <UpdateRoleModal
                isOpen={isOpenUpdateModal}
                toggleOpen={toggleUpdateModal}
                currentRole={currentRole}
                handleUpdateRole={handleUpdateRole}
            />

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
