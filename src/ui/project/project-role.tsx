import {
    Button,
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
import { Box } from '@mui/system';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SearchIcon from '@mui/icons-material/Search';
import './project.scss';

function a11yProps(id: number) {
    return {
        id: `vertical-tab-${id}`,
        'aria-controls': `vertical-tabpanel-${id}`,
    };
}
interface User {
    userId: number;
    name: string;
    view: boolean;
    edit: boolean;
}

interface Company {
    companyId: number;
    companyName: string;
    userList: User[];
}

interface Role {
    companyList: Company[];
    callBackFn: Function;
}
export default function Role(props: Role) {
    const { t } = useTranslation();
    const [companyList, setCompanyList] = useState<any[]>(props.companyList);
    const [currentTab, setCurrentTab] = useState(0);
    const [currentCompany, setCurrentCompany] = useState(props.companyList[0]);

    const handleChange = (event: React.SyntheticEvent, companyId: number) => {
        setCurrentTab(companyId);
        setCurrentCompany(companyList[companyId]);
    };

    useEffect(() => {
        props.callBackFn(companyList);
    }, [companyList]);

    const handleChangeCheckbox = (
        event: React.ChangeEvent<HTMLInputElement>,
        userId: any,
        index: number,
        activeAll?: boolean,
        allStatus?: boolean,
    ) => {
        let selectedScreen = currentCompany.userList.find((user) => user.userId === parseInt(userId));
        let tempPermission: any;
        const { name, value } = event.target;

        for (let i = 0; i < currentCompany.userList.length; i++) {
            const element = currentCompany.userList[i];
            if (element.userId == userId) {
                switch (name) {
                    case 'edit':
                        element.edit = !element.edit;
                        break;
                    case 'view':
                        element.view = !element.view;
                        if (!element.view) {
                            element.edit = false;
                        }
                        break;
                    case 'all':
                        element.edit = !element.edit;
                        element.view = !element.view;
                        break;
                    default:
                        break;
                }
            }
        }
        companyList[currentTab] = currentCompany;
        if (activeAll) {
            if (allStatus) {
                tempPermission = {
                    ...selectedScreen,
                    view: false,
                    edit: false,
                };
            } else {
                tempPermission = {
                    ...selectedScreen,
                    view: true,
                    edit: true,
                };
            }
        } else {
            tempPermission = {
                ...selectedScreen,
                [name]: event.target.checked,
            };

            if (name === 'view' && event.target.checked === false) {
                tempPermission = {
                    ...tempPermission,
                    view: false,
                    edit: false,
                };
            }
        }

        let userList: any = [...currentCompany.userList];
        userList[index] = tempPermission;

        setCurrentCompany({
            ...currentCompany,
            userList,
        });
    };

    return (
        <div className="role">
            <Box
                component="form"
                sx={{
                    '& > :not(style)': { m: 1 },
                }}
                noValidate
                autoComplete="off"
                className="content-area"
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
                                    '& fieldset': { top: 0 }
                                }}
                                name="keyword"
                                label=""
                                placeholder={t('common.placeholder')}
                            // value={searchKeyword}
                            // onChange={(e) => setSearchKeyword(e.target.value)}
                            />
                            <Button variant="contained" color="info">
                                <SearchIcon />
                            </Button>
                        </div>
                        <Tabs
                            orientation="vertical"
                            variant="scrollable"
                            value={currentTab}
                            onChange={handleChange}
                            aria-label=""
                            className="role-list"
                            sx={{
                                borderRight: 1,
                                borderColor: 'divider',
                            }}
                        >
                            {companyList.map((company, index) => (
                                <Tab
                                    key={index}
                                    label={company.companyName}
                                    {...a11yProps(company.id)}
                                />
                            ))}
                        </Tabs>
                    </div>

                    <div className="col-xs-12 col-md-7 col-lg-8 col-xl-9">
                        <div className="role-content">
                            <TableContainer component={Paper}>
                                <Table className="role-table" aria-label={t('role.tab.roleList')}>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <b>User</b>
                                            </TableCell>
                                            <TableCell align="center">All</TableCell>
                                            <TableCell align="center">View</TableCell>
                                            <TableCell align="center">Edit</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {currentCompany.userList.map((row, index) => (
                                            <TableRow
                                                key={row.userId}
                                                sx={{
                                                    '&:last-child td, &:last-child th': { border: 0 },
                                                }}
                                            >
                                                <TableCell component="th" scope="row">
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={row.view && row.edit}
                                                        onChange={(e) =>
                                                            handleChangeCheckbox(
                                                                e,
                                                                row.userId,
                                                                index,
                                                                true,
                                                                row.view && row.edit,
                                                            )
                                                        }
                                                        name="all"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={row.view}
                                                        onChange={(e) =>
                                                            handleChangeCheckbox(e, row.userId, index)
                                                        }
                                                        name="view"
                                                    />
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        checked={row.edit}
                                                        onChange={(e) =>
                                                            handleChangeCheckbox(e, row.userId, index)
                                                        }
                                                        name="edit"
                                                        disabled={!row.view}
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
