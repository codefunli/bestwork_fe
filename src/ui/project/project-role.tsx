import SearchIcon from '@mui/icons-material/Search';
import {
    Button,
    Checkbox,
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
} from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { getUsersAssignListCreate } from '../../services/project-service';
import { User, Company } from '../../models/project-req-dto';
import './project.scss';

type Role = {
    defaultCompanyList: Company[];
    defaultRoleData: any;
    setRoleData: Function;
};

export default function Role(props: Role) {
    const { defaultCompanyList, defaultRoleData, setRoleData } = props;

    const { t } = useTranslation();
    const [companyList, setCompanyList] = useState<Company[]>(
        defaultCompanyList && defaultCompanyList.length > 0 ? defaultCompanyList : [],
    );
    const [currentTab, setCurrentTab] = useState(0);
    const [selectedCompanyId, setSelectedCompanyId] = useState<number>(
        defaultCompanyList && defaultCompanyList[0]?.id ? defaultCompanyList[0].id : 0,
    );
    const [currentCompany, setCurrentCompany] = useState<Company>(
        defaultCompanyList && defaultCompanyList[0] ? defaultCompanyList[0] : { id: 0, companyName: '' },
    );
    const [searchKeyword, setSearchKeyword] = useState('');
    const [currentUserAssignList, setCurrentUserAssignList] = useState<User[]>([]);

    useEffect(() => {
        if (currentCompany && currentCompany.id) {
            getUsersAssignListCreate({
                companyId: currentCompany.id,
                projectId: '',
            }).then((res) => {
                if (res && res.data) {
                    setCurrentUserAssignList(res.data);

                    setCurrentCompany({
                        ...currentCompany,
                        userList: res.data,
                    });

                    // If the user assign list of selected company is already exist
                    const alreadyExistCompany = defaultRoleData.find(
                        (company: any) => company.companyId.toString() === selectedCompanyId.toString(),
                    );
                    if (alreadyExistCompany && alreadyExistCompany.userList) {
                        const tmpRoleList = res.data.map((user: any) => {
                            let willReplaceUser = user;
                            alreadyExistCompany.userList.forEach((existUser: any) => {
                                if (user.userId === existUser.userId) {
                                    willReplaceUser = existUser;
                                }
                            });

                            return willReplaceUser;
                        });

                        setCurrentUserAssignList(tmpRoleList);
                    }
                }
            });
        }
    }, [selectedCompanyId]);

    const handleChange = (event: React.SyntheticEvent, companyId: number) => {
        setCurrentTab(companyId);
        setCurrentCompany(companyList[companyId]);
        setSelectedCompanyId(companyList[companyId].id);
    };

    const handleChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>,
        user: User,
        index: number,
        activeAll?: boolean,
        allStatus?: boolean,
    ) => {
        let selectedUser: User | {} | undefined = currentCompany.userList
            ? currentCompany.userList.find((userItem) => userItem.userId === user.userId)
            : {};
        let tempPermission: User | {};

        // If select all permissions
        if (activeAll) {
            if (allStatus) {
                tempPermission = {
                    ...selectedUser,
                    canView: false,
                    canEdit: false,
                };
            } else {
                tempPermission = {
                    ...selectedUser,
                    canView: true,
                    canEdit: true,
                };
            }
        } else {
            tempPermission = {
                ...selectedUser,
                [event.target.name]: event.target.checked,
            };

            if (event.target.name === 'canView' && event.target.checked === false) {
                tempPermission = {
                    ...selectedUser,
                    canView: false,
                    canEdit: false,
                };
            }
        }

        // Update permissions (assign list) of selected company
        let permissions: any = currentUserAssignList ? [...currentUserAssignList] : [];
        permissions[index] = tempPermission;
        setCurrentCompany({
            ...currentCompany,
            userList: permissions,
        });

        // Update current permissions (assign list) of selected company
        setCurrentUserAssignList(permissions);

        // Check selected company is already exist assign user or not
        let valueExist = false;

        for (let i = 0; i < permissions.length; ++i) {
            if (permissions[i].canView) {
                valueExist = true;
                break;
            }
            if (permissions[i].canEdit) {
                valueExist = true;
                break;
            }
        }

        let tmpAssignData = JSON.parse(JSON.stringify(defaultRoleData));
        // Index of selected company assign user list in assignData
        let assignListIndex: number = tmpAssignData.length;
        tmpAssignData.map((assign: any, index: number) => {
            if (assign.companyId.toString() === selectedCompanyId.toString()) assignListIndex = index;
        });

        // Update assign data (if selected company is already exist assign user)
        if (valueExist) {
            tmpAssignData[assignListIndex] = {
                companyId: currentCompany.id,
                userList: permissions,
            };
            setRoleData(tmpAssignData);
        } else {
            // Else remove assign list of selected company
            if (assignListIndex > -1) tmpAssignData.splice(assignListIndex, 1);
            setRoleData(tmpAssignData);
        }
    };

    const handleSearch = () => {
        const filterItems = () => {
            return defaultCompanyList.filter(
                (company) => company.companyName.toLowerCase().indexOf(searchKeyword.toLowerCase()) !== -1,
            );
        };
        setCompanyList(filterItems);
    };

    return (
        <div className="role">
            <Box
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                className="content-area"
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
                                autoComplete="off"
                            />
                            <Button variant="contained" onClick={handleSearch} color="primary">
                                <SearchIcon />
                            </Button>
                        </div>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={currentTab}
                            onChange={handleChange}
                            aria-label=""
                            className="company-list"
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                            }}
                        >
                            {companyList &&
                                companyList.length > 0 &&
                                companyList.map((company, index) => (
                                    <Tab
                                        key={index}
                                        label={
                                            <React.Fragment>
                                                <div className="custom-tab-item">
                                                    <span>{company.companyName}</span>
                                                </div>
                                            </React.Fragment>
                                        }
                                    />
                                ))}
                        </Tabs>
                    </div>

                    <div className="col-xs-12 col-md-7 col-lg-8 col-xl-9 role-wrapper">
                        <div className="role-content">
                            <TableContainer component={Paper}>
                                <Table className="role-table" aria-label={t('role.tab.roleList')}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <b>{t('menu.user')}</b>
                                            </TableCell>
                                            <TableCell>
                                                <b>{t('menu.role')}</b>
                                            </TableCell>
                                            <TableCell align="center">{t('role.tab.all')}</TableCell>
                                            <TableCell align="center">{t('role.tab.view')}</TableCell>
                                            <TableCell align="center">{t('role.tab.edit')}</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentUserAssignList &&
                                            currentUserAssignList.length > 0 &&
                                            currentUserAssignList.map((user: User, index: number) => (
                                                <TableRow
                                                    key={user.userId}
                                                    sx={{
                                                        '&:last-child td, &:last-child th': { border: 0 },
                                                    }}
                                                >
                                                    <TableCell component="th" scope="row">
                                                        {user.userName}
                                                    </TableCell>
                                                    <TableCell>{user.roleName}</TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={user.canView && user.canEdit}
                                                            onChange={(e) =>
                                                                handleChangeCheckbox(
                                                                    e,
                                                                    user,
                                                                    index,
                                                                    true,
                                                                    user.canView && user.canEdit,
                                                                )
                                                            }
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={user.canView}
                                                            onChange={(e) => handleChangeCheckbox(e, user, index)}
                                                            name="canView"
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        <Checkbox
                                                            checked={user.canEdit}
                                                            onChange={(e) => handleChangeCheckbox(e, user, index)}
                                                            name="canEdit"
                                                            disabled={!user.canView}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </div>
                </div>
            </Box>
        </div>
    );
}
