import {
    Button,
    CardHeader,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Grid,
    Slide,
    Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const Transition = forwardRef(function Transition(
    props: TransitionProps & {
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props} />;
});

interface AlertDialogSlideProps {
    title: string;
    base64Url: string;
    noBtn: string;
    okBtn: string;
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
}

export default function PreviewPDF(props: AlertDialogSlideProps) {
    const { title, base64Url, isOpen, closeFunc, okFunc, noBtn, okBtn } = props;
    const [open, setOpen] = useState(false);
    const { t } = useTranslation();

    const handleClose = () => {
        setOpen(false);
        closeFunc();
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
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
                sx={{
                    '& .css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                        minWidth: `${window.innerWidth - 400}px !important`,
                    },
                }}
            >
                <DialogTitle
                    sx={{
                        textTransform: 'uppercase',
                    }}
                >
                    <Typography
                        variant="inherit"
                        color="textSecondary"
                        gutterBottom
                        sx={{ textTransform: 'uppercase' }}
                        className="btn disabled text-white bg-light opacity-100 border-customTheme"
                    >
                        <span className="particletext">{title}</span>
                    </Typography>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" width={'auto'} height={1000}>
                        <embed src={base64Url} width="100%" height="100%"></embed>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        {t('button.btnClose')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
