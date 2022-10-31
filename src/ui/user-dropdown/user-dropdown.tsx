import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Badge, ClickAwayListener, Grid, Grow, MenuItem, MenuList, Paper, Popper, Tooltip } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import { logout } from '../../services/login-service';
import './user-dropdown.scss';

const UserDropdown = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleLogout = () => {
        logout().then(() => {
            navigate(UrlFeApp.LOGIN_URL);
        });
    };

    return (
        <div className="change-password">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title="" placement="bottom-start" ref={anchorRef}>
                        <Badge
                            sx={{ mr: 2 }}
                            color="secondary"
                            onClick={handleToggle}
                            className="avatar"
                        >
                            <Avatar sx={{ bgcolor: deepOrange[500] }}>

                            </Avatar>
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
                            minWidth: '12rem'
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList className="menu-list">
                                    <MenuItem>
                                        <PersonIcon /> <span>{t('common.profile')}</span>
                                    </MenuItem>
                                    <MenuItem>
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
        </div>
    );
};

export default UserDropdown;