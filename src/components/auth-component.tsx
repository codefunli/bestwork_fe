import { AlertColor } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Outlet, useNavigate } from 'react-router-dom';
import { AlertColorConstants, UrlFeApp } from '../core/constants/common';
import { useAppDispatch, useAppSelector } from '../core/hook/redux';
import MLanguage from '../shared-components/language/m-language';
import MessageShow from '../shared-components/message/message';
import './auth.scss';

export default function AuthComponent() {
    const nativgate = useNavigate();
    const [isShowMessage, setIsShowMessage] = useState(false);
    const [loginMsg, setLoginMsg] = useState('');
    const [typeLoginMsg, setTypeLoginMsg] = useState<AlertColor>('success');
    const isPageLoading = useAppSelector((state) => state.app.isPageLoading);
    const isShowMsgErrLogin = useAppSelector((state) => state.app.isShowMsgErrLogin);
    const { t } = useTranslation();

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setIsShowMessage(showMsg);
        setLoginMsg(msg);
        setTypeLoginMsg(type);
    };

    const handleCloseMsg = () => {
        setIsShowMessage(false);
    };

    useEffect(() => {
        if (!isPageLoading) {
            nativgate(UrlFeApp.MAIN_APP);
        }

        if (isShowMsgErrLogin) {
            handleMessage(true, t('message.accessDenied'), AlertColorConstants.ERROR);
        }
    }, [isPageLoading]);

    return (
        <div className="auth-wrapper">
            <MLanguage color="primary" />
            {isPageLoading && (
                <div className="login-wrapper">
                    <div>
                        <Outlet />
                    </div>
                    <MessageShow
                        message={loginMsg}
                        showMessage={isShowMessage}
                        type={typeLoginMsg}
                        handleCloseMsg={handleCloseMsg}
                    />
                </div>
            )}
        </div>
    );
}
