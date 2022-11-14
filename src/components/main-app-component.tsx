import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import {
    Avatar,
    CssBaseline,
    Divider,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography,
} from '@mui/material';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { CSSObject, styled, Theme, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import { ErrorPagePath, MenuItem, StatusCode, UrlFeApp } from '../core/constants/common';
import menuItemLinkData from '../core/constants/menu-item-link';
import { useAppDispatch, useAppSelector } from '../core/hook/redux';
import { appAction } from '../core/redux/app-slice';
import { getUserInfo, userActions } from '../core/redux/user-slice';
import { RoleUser } from '../core/types/user';
import { isObjectEmpty } from '../core/utils/object-utils';
import { renderIconLeftBar } from '../core/utils/render-utils';
import { getCurrentUserInfo } from '../services/auth-service';
import { isCheckLogined } from '../services/user-service';
import MLanguage from '../shared-components/language/m-language';
import LinearProgressWithLabel from '../shared-components/progress/linear-progress-with-label';
import Notification from '../ui/notification/notification';
import UserDropdown from '../ui/user-dropdown/user-dropdown';
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
    const dispatch = useAppDispatch();
    const [progress, setProgress] = React.useState(10);

    const userInfo = useSelector(getUserInfo);

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
        }, 1000);

        isCheckLogined()
            .then((resp) => {
                if (resp.status === StatusCode.OK) {
                    dispatch(userActions.setIsLogined(true));
                    dispatch(appAction.setIsShowMsgErrLogin(false));
                    clearInterval(timer);
                    navigate(UrlFeApp.DASH_BOARD);

                    getCurrentUserInfo().then((res) => {
                        dispatch(userActions.setUserInfo(res.data));
                    });
                } else {
                    dispatch(appAction.setIsPageLoading(true));
                    dispatch(userActions.setIsLogined(false));
                    dispatch(appAction.setIsShowMsgErrLogin(true));
                    navigate(UrlFeApp.LOGIN_URL);
                }
            })
            .catch(() => {
                dispatch(appAction.setIsPageLoading(true));
                dispatch(appAction.setIsShowMsgErrLogin(false));
                dispatch(userActions.setIsLogined(false));
                navigate(UrlFeApp.LOGIN_URL);
            });
    }, []);

    const StyledBadge = styled(Badge)(({ theme }) => ({
        '& .MuiBadge-badge': {
            backgroundColor: '#44b700',
            color: '#44b700',
            boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
            '&::after': {
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                animation: 'ripple 1.2s infinite ease-in-out',
                border: '1px solid currentColor',
                content: '""',
            },
        },
        '@keyframes ripple': {
            '0%': {
                transform: 'scale(.8)',
                opacity: 1,
            },
            '100%': {
                transform: 'scale(2.4)',
                opacity: 0,
            },
        },
    }));

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
                                    <MLanguage />
                                    <Notification />
                                    <UserDropdown />
                                </Toolbar>
                            </div>
                        </AppBar>
                        <Drawer variant="permanent" open={open}>
                            <DrawerHeader className="p-1 ">
                                <Stack direction="row" spacing={3} className="p-1">
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                    >
                                        <Avatar alt="Remy Sharp" src={userInfo?.avatar} />
                                    </StyledBadge>
                                </Stack>
                                <Typography>
                                    <span className="p-2">
                                        <span className="d-block fw-bold text-primary ">{`${userInfo.firstName} ${userInfo.lastName}`}</span>
                                        <span className="fst-italic">{`${userInfo.uRole}`}</span>
                                    </span>
                                </Typography>
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </DrawerHeader>
                            <Divider />
                            <List>
                                {menuItemLinkData.map((menuItem, index) => (
                                    <>
                                        {userInfo?.uRole === RoleUser.SYS_ADMIN && (
                                            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
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
                                                        {renderIconLeftBar(menuItem.iconNm)}
                                                    </ListItemIcon>
                                                    <ListItemText
                                                        primary={t(menuItem.name)}
                                                        sx={{ opacity: open ? 1 : 0 }}
                                                    />
                                                </ListItemButton>
                                            </ListItem>
                                        )}

                                        {userInfo?.uRole === RoleUser.COMPANY_ADMIN &&
                                            (menuItem.name === MenuItem.DASHBOARD ||
                                                menuItem.name === MenuItem.USER ||
                                                menuItem.name === MenuItem.PROJECT) && (
                                                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={{
                                                            minHeight: 48,
                                                            justifyContent: open ? 'initial' : 'center',
                                                            px: 2.5,
                                                        }}
                                                        onClick={() => {
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
                                                            {renderIconLeftBar(menuItem.iconNm)}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={t(menuItem.name)}
                                                            sx={{ opacity: open ? 1 : 0 }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            )}

                                        {userInfo?.uRole === RoleUser.SUB_COMPANY_ADMIN &&
                                            (menuItem.name === MenuItem.DASHBOARD ||
                                                menuItem.name === MenuItem.USER ||
                                                menuItem.name === MenuItem.PROJECT) && (
                                                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={{
                                                            minHeight: 48,
                                                            justifyContent: open ? 'initial' : 'center',
                                                            px: 2.5,
                                                        }}
                                                        onClick={() => {
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
                                                            {renderIconLeftBar(menuItem.iconNm)}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={t(menuItem.name)}
                                                            sx={{ opacity: open ? 1 : 0 }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            )}

                                        {userInfo?.uRole === RoleUser.COMPANY_USER &&
                                            (menuItem.name === MenuItem.DASHBOARD ||
                                                menuItem.name === MenuItem.PROJECT) && (
                                                <ListItem key={index} disablePadding sx={{ display: 'block' }}>
                                                    <ListItemButton
                                                        sx={{
                                                            minHeight: 48,
                                                            justifyContent: open ? 'initial' : 'center',
                                                            px: 2.5,
                                                        }}
                                                        onClick={() => {
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
                                                            {renderIconLeftBar(menuItem.iconNm)}
                                                        </ListItemIcon>
                                                        <ListItemText
                                                            primary={t(menuItem.name)}
                                                            sx={{ opacity: open ? 1 : 0 }}
                                                        />
                                                    </ListItemButton>
                                                </ListItem>
                                            )}
                                    </>
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
