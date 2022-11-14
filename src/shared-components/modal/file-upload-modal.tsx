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
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getUserInfo } from '../../core/redux/user-slice';
import UploadFile from '../file-management/upload-file';

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
        projectId: string;
        description: string;
        files: any;
        isOpenComment: boolean;
        postUser: any;
        ewbId: string;
    };
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
}
const initialDataImg = {
    description: '',
    files: [],
    projectId: '',
    isOpenComment: false,
    postUser: {},
    ewbId: '',
};

export default function FileUploadModal(props: AlertDialogSlideProps) {
    const { title, content, isOpen, closeFunc, okFunc } = props;
    const [open, setOpen] = useState(false);
    const [imgData, setImgData] = useState(initialDataImg);
    const { t } = useTranslation();
    const userInfo = useSelector(getUserInfo);
    const [eventImage, setEventImage] = useState<any>();

    useEffect(() => {
        if (isOpen)
            setImgData({
                ...content,
                postUser: {
                    id: userInfo.id,
                    name: userInfo.userName,
                },
            });
    }, [isOpen]);

    const clearEventImage = () => {
        eventImage.target.value = '';
    };

    const handleOkFunc = () => {
        // postMaterialStatus(imgData).then((data: any) => {
        //     setOpen(false);
        //     okFunc();
        // });
        localStorage.setItem('imgData', JSON.stringify(imgData));
        setOpen(false);
        okFunc();
        clearEventImage();

        setImgData(content);
    };

    const handleClose = () => {
        setOpen(false);
        closeFunc();
        setImgData(content);
        clearEventImage();
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const onChangeImage = (data: any) => {
        setImgData({
            ...imgData,
            files: data,
        });
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setImgData({
            ...imgData,
            [name]: value,
        });
    };

    const handleClearEvent = (event: any) => {
        setEventImage(event);
    };

    return (
        <div>
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
                >
                    {title}
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" width={500} height={'auto'}>
                        <Grid container spacing={3}>
                            <Grid item xs={12} lg={12}>
                                <div
                                    w-fullWidth
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                    }}
                                >
                                    <TextField
                                        size="small"
                                        fullWidth
                                        multiline
                                        rows={3}
                                        value={imgData.description}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        id="outlined-required"
                                        placeholder={t('material.descriptionPlaceHolder')}
                                        name="description"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <UploadFile
                                    clearPreview={open}
                                    callbackFunc={onChangeImage}
                                    callBackClearEvent={handleClearEvent}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
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
        </div>
    );
}