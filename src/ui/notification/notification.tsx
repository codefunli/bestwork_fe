import React, { useEffect, useRef, useState } from 'react';
import {
    Avatar,
    Badge,
    ClickAwayListener,
    Grid,
    Grow,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Paper,
    Popper,
    Tooltip,
    Typography,
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import './notification.scss';
import { UrlFeApp } from '../../core/constants/common';
import { NotificationsResDTO } from '../../models/notifications-dto';
import { getNotifications } from '../../services/notifications-service';

const initialValues = {
    page: '0',
    size: '5',
    sortDirection: 'DESC',
    sortBy: 'id',
    keyword: '',
    status: '-1',
};

const Notification = () => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useState(false);
    const [formValues, setFormValues] = useState(initialValues);
    const { t } = useTranslation();
    const [notiList, setNotiList] = useState<NotificationsResDTO[]>([]);

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    useEffect(() => {
        getNotifications(formValues).then((value: any) => {
            if (value && value.data) {
                setNotiList(value.data.content);
            }
        });
    }, []);
    return (
        <div className="notification">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title={t('common.notification')} placement="bottom-start" ref={anchorRef}>
                        <Badge sx={{ mr: 2 }} color="secondary" badgeContent={notiList.length} onClick={handleToggle}>
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
                            minWidth: '18rem',
                        }}
                    >
                        <Paper>
                            <div className="top-area">
                                <div>
                                    <b>{t('common.notification')}</b>
                                </div>
                            </div>
                            <ClickAwayListener onClickAway={handleClose}>
                                <List className="notification-list">
                                    {notiList && notiList.length > 0 ? (
                                        notiList.map((notification, index) => (
                                            <ListItem
                                                alignItems="flex-start"
                                                key={notification.id}
                                                sx={{ width: '100%' }}
                                                className="notification-item"
                                                onClick={() => console.log(notification.title)}
                                            >
                                                <ListItemAvatar>
                                                    <Avatar alt="" src="" />
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={<span className="title">{notification.title}</span>}
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
                                                            </React.Fragment>{' '}
                                                            <br />
                                                            {/* {notification.time} */}
                                                        </div>
                                                    }
                                                />
                                            </ListItem>
                                        ))
                                    ) : (
                                        <div className="empty-data">
                                            <span>{t('common.noNotification')}</span>
                                        </div>
                                    )}
                                </List>
                            </ClickAwayListener>
                            <div className="view-all">
                                <Link to={UrlFeApp.NOTIFICATIONS.SEARCH}>{t('common.viewAll')}</Link>
                            </div>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    );
};

export default Notification;
