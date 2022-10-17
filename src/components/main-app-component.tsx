import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import {
    Avatar,
    Badge,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { deepOrange } from '@mui/material/colors';
import MuiDrawer from '@mui/material/Drawer';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorPagePath, StatusCode, UrlFeApp } from '../core/constants/common';
import menuItemLinkData from '../core/constants/menu-item-link';
import { useAppDispatch, useAppSelector } from '../core/hook/redux';
import { appAction } from '../core/redux/app-slice';
import { userActions } from '../core/redux/user-slice';
import { isObjectEmpty } from '../core/utils/object-utils';
import { isCheckLogined } from '../services/user-service';
import MLanguage from '../shared-components/language/m-language';
import LinearProgressWithLabel from '../shared-components/progress/LinearProgressWithLabel';
import CollapsedBreadcrumbs from './collapsed-breadcrumbs';
import './main-app.scss';

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': closedMixin(theme),
    }),
}));

export default function MiniDrawer() {
    const navigate = useNavigate();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const { t } = useTranslation();
    const isUserLogged = useAppSelector((state) => state.user.isLogined);
    const isPageLoading = useAppSelector((state) => state.app.isPageLoading);
    const nativgate = useNavigate();
    const dispatch = useAppDispatch();
    const [progress, setProgress] = React.useState(10);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const navigateByLink = (link: any) => {
        if (!isObjectEmpty(link)) {
            navigate(link);
        } else {
            navigate(ErrorPagePath.PAGE_404_NOT_FOUND);
        }
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 800);

        isCheckLogined()
            .then((resp) => {
                if (resp.status === StatusCode.OK) {
                    dispatch(userActions.setIsLogined(true));
                    dispatch(appAction.setIsShowMsgErrLogin(false));
                    clearInterval(timer);
                    nativgate(UrlFeApp.DASH_BOARD);
                } else {
                    dispatch(appAction.setIsPageLoading(true));
                    dispatch(userActions.setIsLogined(false));
                    dispatch(appAction.setIsShowMsgErrLogin(true));
                    nativgate(UrlFeApp.LOGIN_URL);
                }
            })
            .catch(() => {
                dispatch(appAction.setIsPageLoading(true));
                dispatch(appAction.setIsShowMsgErrLogin(false));
                dispatch(userActions.setIsLogined(false));
                nativgate(UrlFeApp.LOGIN_URL);
            });
    }, []);

    return (
        <div className="h-100">
            {isUserLogged ? (
                <React.Fragment>
                    <Box
                        sx={{
                            display: 'flex',
                            '&::-webkit-scrollbar': {
                                width: 20,
                            },
                            '&::-webkit-scrollbar-track': {
                                backgroundColor: 'orange',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                backgroundColor: 'red',
                                borderRadius: 2,
                            },
                        }}
                    >
                        <CssBaseline />
                        <AppBar position="fixed" open={open}>
                            <div className="d-flex justify-content-between">
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        sx={{
                                            marginRight: 5,
                                            ...(open && { display: 'none' }),
                                        }}
                                    >
                                        <MenuIcon />
                                    </IconButton>
                                    <CollapsedBreadcrumbs />
                                </Toolbar>
                                <Toolbar>
                                    <MLanguage color="inherit" />
                                    <Badge sx={{ mr: 2 }} color="secondary" badgeContent={2}>
                                        <NotificationsNoneIcon />
                                    </Badge>
                                    <Avatar sx={{ bgcolor: deepOrange[500], mr: 2 }}>N</Avatar>
                                </Toolbar>
                            </div>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                {menuItemLinkData.map((menuItem, index) => (
                                    <ListItem key={menuItem.name} disablePadding sx={{ display: 'block' }}>
                                        <ListItemButton
                                            sx={{
                                                minHeight: 48,
                                                justifyContent: open ? 'initial' : 'center',
                                                px: 2.5,
                                            }}
                                            onClick={(event) => {
                                                navigateByLink(menuItem.link);
                                            }}
                                        >
                                            <ListItemIcon
                                                sx={{
                                                    minWidth: 0,
                                                    mr: open ? 3 : 'auto',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                            </ListItemIcon>
                                            <ListItemText primary={menuItem.name} sx={{ opacity: open ? 1 : 0 }} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Drawer>
                        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                            <DrawerHeader />
                            <Outlet />
                        </Box>
                    </Box>
                </React.Fragment>
            ) : (
                <div className="progress-wrapper">
                    <Box sx={{ width: '50%', display: 'inherit' }}>
                        <LinearProgressWithLabel value={progress} color="warning" />
                    </Box>
                </div>
            )}
        </div>
    );
}
