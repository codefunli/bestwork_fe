import React, { useRef, useState } from 'react';
import { Avatar, Badge, ClickAwayListener, Grid, Grow, List, ListItem, ListItemAvatar, ListItemText, Paper, Popper, Tooltip, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './notification.scss';

type Noti = {
    title: string;
    content: string;
    time: string;
};

const notificationList: Noti[] = [
    {
        title: 'First notification',
        content: 'This is the content of first notification',
        time: '10 minutes ago',
    },
    {
        title: 'Second notification',
        content: 'This is the content of second notification',
        time: 'Yesterday',
    },
    {
        title: 'Third notification',
        content: 'This is the content of third notification',
        time: '4 days ago',
    }
];

const Notification = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();
    const [notiList, setNotiList] = useState<Noti[]>(notificationList);

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    return (
        <div className="notification">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title={t('common.notification')} placement="bottom-start" ref={anchorRef}>
                        <Badge
                            sx={{ mr: 2 }}
                            color="secondary"
                            badgeContent={notiList.length}
                            onClick={handleToggle}
                        >
                            <NotificationsIcon />
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
                placement="bottom"
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        style={{
                            transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                            marginTop: '1.5rem',
                            marginRight: '0.4rem',
                            width: '20vw',
                            minWidth: '18rem'
                        }}
                    >
                        <Paper>
                            <div className="top-area">
                                <div>
                                    <b>{t('common.notification')}</b>
                                </div>
                                <div className="btn-clear">
                                    {t('common.clearAll')}
                                </div>
                            </div>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List className="notification-list">
                                    {(notiList && notiList.length > 0) ? notiList.map((notification, index) => (
                                        <ListItem
                                            alignItems="flex-start"
                                            key={index} sx={{ width: '100%' }}
                                            className="notification-item"
                                            onClick={() => console.log(notification.title)}
                                        >
                                            <ListItemAvatar>
                                                <Avatar alt="" src="" />
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <span className="title">{notification.title}</span>
                                                }
                                                secondary={
                                                    <div>
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {notification.content}
                                                            </Typography>
                                                        </React.Fragment> <br />
                                                        {notification.time}
                                                    </div>
                                                }
                                            />
                                        </ListItem>
                                    )) :
                                        <div className="empty-data">
                                            <span>{t('common.noNotification')}</span>
                                        </div>
                                    }
                                </List>
                            </ClickAwayListener>
                            <div className="view-all">
                                <Link to="/app/notification/all">
                                    {t('common.viewAll')}
                                </Link>
                            </div>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default Notification;