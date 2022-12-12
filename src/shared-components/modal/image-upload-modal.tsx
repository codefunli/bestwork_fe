import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Divider,
    Grid,
    Slide,
    TextField,
    Typography,
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../core/redux/user-slice';
import UploadMultipartFile from '../file-management/upload-multipartfile';
import UploadMultipartImage from '../file-management/upload-multipartimage';
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
    content: {
        description: string;
        file: any;
        isOpenComment: boolean;
    };
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
}
const initialDataImg = {
    description: '',
    file: [],
    isOpenComment: false,
};

export default function ImageUploadModal(props: AlertDialogSlideProps) {
    const { title, content, isOpen, closeFunc, okFunc } = props;
    const [open, setOpen] = useState(false);
    const [fileData, setFileData] = useState(initialDataImg);
    const { t } = useTranslation();
    const userInfo = useSelector(getUserInfo);
    const [eventImage, setEventImage] = useState<any>();

    const clearEventImage = () => {
        if (eventImage && eventImage.target && eventImage.target.value) eventImage.target.value = '';
    };

    const handleOkFunc = () => {
        setOpen(false);
        okFunc(fileData);
        clearEventImage();
        setFileData(content);
    };

    const handleClose = () => {
        setOpen(false);
        closeFunc();
        setFileData(content);
        clearEventImage();
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const onChangeImage = (data: any) => {
        setFileData({
            ...fileData,
            file: data,
        });
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setFileData({
            ...fileData,
            [name]: value,
        });
    };

    const handleClearEvent = (event: any) => {
        setEventImage(event);
    };

    return (
        <>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle
                    sx={{
                        textTransform: 'uppercase',
                    }}
                    className="pb-0"
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
                <Divider />
                <div>
                    <div
                        id="alert-dialog-slide-description"
                        style={{
                            width: '500px',
                            height: 'auto',
                        }}
                    >
                        <div className="ps-3 pe-3 pb-3">
                            <div>
                                <div
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                    className="pb-3"
                                >
                                    <TextField
                                        size="small"
                                        multiline
                                        rows={3}
                                        value={fileData.description}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                            width: '100%',
                                        }}
                                        id="outlined-required"
                                        placeholder={t('material.descriptionPlaceHolder')}
                                        name="description"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                            <Grid item xs={12} lg={12}>
                                <UploadMultipartImage
                                    clearPreview={open}
                                    callbackFunc={onChangeImage}
                                    callBackClearEvent={handleClearEvent}
                                />
                            </Grid>
                        </div>
                    </div>
                </div>
                <Divider />
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        {t('button.btnCancel')}
                    </Button>
                    <Button variant="contained" onClick={handleOkFunc}>
                        {t('button.btnUpload')}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
