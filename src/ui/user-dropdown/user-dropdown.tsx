import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import {
    Avatar,
    Badge,
    ClickAwayListener,
    Grid,
    Grow,
    MenuItem,
    MenuList,
    Paper,
    Popper,
    Tooltip,
} from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { logout } from '../../services/auth-service';
import ChangePassword from '../change-password/change-password';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../core/redux/user-slice';
import './user-dropdown.scss';

const UserDropdown = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();
    const userInfo = useSelector(getUserInfo);

    const [isOpenChangePasswordModal, setIsOpenChangePasswordModal] = useState(false);
    const toggleChangePasswordModal = (value: boolean) => setIsOpenChangePasswordModal(value);

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleDisplayProfile = (id: any) => {
        setTimeout(() => {
            navigate(`${UrlFeApp.USER.INFO}/${id}`);
            setOpen(false);
        }, 1000);
    };

    const handleLogout = () => {
        logout().then(() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            navigate(UrlFeApp.LOGIN_URL);
        });
    };

    return (
        <div className="user-dropdown">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title="" placement="bottom-start" ref={anchorRef}>
                        <Badge sx={{ mr: 2 }} color="secondary" onClick={handleToggle} className="avatar">
                            <Avatar sx={{ bgcolor: deepOrange[500] }} src={userInfo?.avatar} />
                        </Badge>
                    </Tooltip>
                </Grid>
            </Grid>

            <Popper
                sx={{ zIndex: 1 }}
                open={open}
                anchorEl={anchorRef.current}
                role={undefined}
                transition
                disablePortal
                placement="bottom-end"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            marginTop: '1.3rem',
                            minWidth: '12rem',
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList className="menu-list">
                                    <MenuItem onClick={() => handleDisplayProfile(userInfo?.id)}>
                                        <PersonIcon />{' '}
                                        <span>
                                            {t('common.profile')} ({userInfo?.userName})
                                        </span>
                                    </MenuItem>
                                    <MenuItem onClick={() => toggleChangePasswordModal(true)}>
                                        <SettingsIcon /> <span>{t('common.changePassword')}</span>
                                    </MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <LogoutIcon /> <span>{t('common.logout')}</span>
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <ChangePassword isOpen={isOpenChangePasswordModal} toggleOpen={toggleChangePasswordModal} />
        </div>
    );
};

export default UserDropdown;
