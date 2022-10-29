import React, { useRef, useState } from 'react';
import { Avatar, Badge, ClickAwayListener, Grid, Grow, List, ListItem, ListItemAvatar, ListItemText, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import './notification.scss';
import { Link } from 'react-router-dom';

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
                    <Badge
                        sx={{ mr: 3 }}
                        color="secondary"
                        badgeContent={notiList.length}
                        onClick={handleToggle}
                    >
                        <NotificationsIcon />
                    </Badge>
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
                        }}
                    >
                        <Paper>
                            <div className="top-area">
                                <div>
                                    <b>Notifications</b>
                                </div>
                                <div className="btn-clear">
                                    Clear all
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
                                            <span>No notification</span>
                                        </div>
                                    }
                                </List>
                            </ClickAwayListener>
                            <div className="view-all">
                                <Link to="/app/notification/all">
                                    View all
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