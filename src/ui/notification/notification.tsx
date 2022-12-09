import NotificationsIcon from '@mui/icons-material/Notifications';
import {
    AlertColor,
    Badge,
    Button,
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
import { blueGrey } from '@mui/material/colors';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { ConfirmConstants, UrlFeApp } from '../../core/constants/common';
import { NotificationsResDTO } from '../../models/notifications-dto';
import { changeStatus, countUnRead, getNotifications } from '../../services/notifications-service';
import MessageShow from '../../shared-components/message/message';
import AlertDiaLogInform from '../../shared-components/modal/alert-dialog-inform';
import CampaignIcon from '@mui/icons-material/Campaign';
import './notification.scss';

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
    const { t } = useTranslation();
    const [notiList, setNotiList] = useState<NotificationsResDTO[]>([]);
    const [badgeCount, setBadgeCount] = useState(0);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [title, setTitle] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [id, setId] = useState<number>(0);
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [companyMsg, setCompanyMsg] = useState('');
    const [typeCompanyMsg, setTypeCompanyMsg] = useState<AlertColor>('success');

    const navigate = useNavigate();

    const { data } = useQuery(['getNotifications'], () => getNotifications(initialValues), {
        refetchInterval: 5000,
        onSuccess: (res: any) => {
            setNotiList(res.data.content);
        },
    });

    useEffect(() => {
        countUnRead().then((res: any) => {
            setBadgeCount(res.data);
        });
    }, [data]);

    const handleClose = (event: any) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) return;
        setOpen(false);
    };

    const handleToggle = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleToNotification = () => {
        setTimeout(() => {
            navigate(UrlFeApp.NOTIFICATIONS.SEARCH);
            setOpen(false);
        }, 1000);
    };

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setCompanyMsg(msg);
        setTypeCompanyMsg(type);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    const handleClickNotification = (id: number, title: string, content: string) => {
        setId(id);
        setTitle(title);
        setContent(content);
        setIsOpenModal(true);
        setOpen(false);
    };

    const alertOkFunc = () => {
        changeStatus(id)
            .then((res) => {
                setIsOpenModal(false);
            })
            .catch((err) => {
                handleMessage(true, t('message.error'), 'error');
            });
    };

    return (
        <div className="notification">
            <Grid container direction="column" alignItems="end">
                <Grid item xs={12}>
                    <Tooltip title={t('common.notification')} placement="bottom-start" ref={anchorRef}>
                        <Badge sx={{ mr: 2 }} color="secondary" badgeContent={badgeCount} onClick={handleToggle}>
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
                                        notiList.map((notification) => (
                                            <ListItem
                                                alignItems="flex-start"
                                                key={notification.id}
                                                sx={{
                                                    width: '100%',
                                                    backgroundColor: notification.read ? 'white' : blueGrey.A200,
                                                }}
                                                className="notification-item"
                                                onClick={() =>
                                                    handleClickNotification(
                                                        notification.id,
                                                        notification.title,
                                                        notification.content,
                                                    )
                                                }
                                            >
                                                <ListItemAvatar>
                                                    <CampaignIcon sx={{ fontSize: 50 }} color="warning" />
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
                                                            <small className="fw-normal">
                                                                {Number(
                                                                    (
                                                                        (new Date().getTime() -
                                                                            new Date(
                                                                                notification.createDate,
                                                                            ).getTime()) /
                                                                        (1000 * 3600 * 24)
                                                                    ).toFixed(0),
                                                                ) <= 0
                                                                    ? new Date().getHours() -
                                                                          new Date(
                                                                              notification.createDate,
                                                                          ).getHours() <=
                                                                      0
                                                                        ? new Date().getMinutes() -
                                                                              new Date(
                                                                                  notification.createDate,
                                                                              ).getMinutes() <=
                                                                          0
                                                                            ? new Date().getSeconds() -
                                                                              new Date(
                                                                                  notification.createDate,
                                                                              ).getSeconds() +
                                                                              ' ' +
                                                                              t('material.secondAgo')
                                                                            : new Date().getMinutes() -
                                                                              new Date(
                                                                                  notification.createDate,
                                                                              ).getMinutes() +
                                                                              ' ' +
                                                                              t('material.minuteAgo')
                                                                        : new Date().getHours() -
                                                                          new Date(notification.createDate).getHours() +
                                                                          ' ' +
                                                                          t('material.hourAgo')
                                                                    : (
                                                                          (new Date().getTime() -
                                                                              new Date(
                                                                                  notification.createDate,
                                                                              ).getTime()) /
                                                                          (1000 * 3600 * 24)
                                                                      ).toFixed(0) +
                                                                      ' ' +
                                                                      t('material.dayAgo')}
                                                            </small>
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
                                <Button onClick={handleToNotification}>{t('common.viewAll')}</Button>
                            </div>
                        </Paper>
                    </Grow>
                )}
            </Popper>

            <AlertDiaLogInform
                isOpen={isOpenModal}
                title={title}
                content={content}
                okFunc={alertOkFunc}
                okBtn={t(ConfirmConstants.OK_BTN)}
            />

            <MessageShow
                message={companyMsg}
                showMessage={isShowMessage}
                type={typeCompanyMsg}
                handleCloseMsg={handleCloseMsg}
            />
        </div>
    );
};

export default Notification;
