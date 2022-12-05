import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDiaLogInformProps {
    title: string;
    content: string;
    isOpen: boolean;
    okBtn: string;
    okFunc: Function;
}

export default function AlertDiaLogInform(props: AlertDiaLogInformProps) {
    const { title, content, isOpen, okFunc, okBtn } = props;
    const [open, setOpen] = useState(false);

    const handleOkFunc = () => {
        setOpen(false);
        okFunc();
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>
                    <NotificationImportantIcon color="warning" sx={{ fontSize: 35, mr: 2 }} />
                    <span>{title}</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="contained" onClick={handleOkFunc}>
                        {okBtn}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
