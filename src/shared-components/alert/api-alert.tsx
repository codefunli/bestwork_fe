import { Alert, AlertColor, Snackbar, SnackbarOrigin } from '@mui/material';
import { useEffect, useState } from 'react';
import { AlertColorConstants, StatusCode } from '../../core/constants/common';

export interface State extends SnackbarOrigin {
    open: boolean;
}

interface ApiAlertProps {
    response: any;
}

export default function ApiAlert(props: ApiAlertProps) {
    const { response } = props;

    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState<AlertColor>(AlertColorConstants.SUCCESS);
    const [state, setState] = useState<State>({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const { vertical, horizontal, open } = state;

    const handleMessage = (showMsg: boolean, msg: string, type: AlertColor) => {
        setState({ ...state, open: showMsg })
        setMessage(msg);
        setMessageType(type);
    };

    const handleResponse = () => {
        switch (response.status) {
            case StatusCode.OK:
                handleMessage(true, response.message, AlertColorConstants.SUCCESS);
                break;
            case StatusCode.ERROR:
                handleMessage(true, response.message, AlertColorConstants.ERROR);
                break;
            default:
                handleMessage(true, response.message, AlertColorConstants.WARNING);
                break;
        };
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false
        });
    };

    useEffect(() => {
        if (response && response.status) handleResponse();
    }, [response]);

    return (
        <div>
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                key={vertical + horizontal}
                anchorOrigin={{ vertical, horizontal }}
            >
                <Alert onClose={handleClose} severity={messageType} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}
