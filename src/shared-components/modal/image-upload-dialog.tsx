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
    TextField
} from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { forwardRef, useEffect, useState } from 'react';
import MultipleFileUpload from '../file-upload/multiple-file-upload';

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
        comment: string;
        images: any;
    };
    noBtn: string;
    okBtn: string;
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
}
const initialDataImg = {
    comment: '',
    images: [],
    projectId: '',
};

export default function ImageUploadDialog(props: AlertDialogSlideProps) {
    const { title, content, isOpen, closeFunc, okFunc, noBtn, okBtn } = props;
    const [open, setOpen] = useState(false);
    const [imgData, setImgData] = useState(initialDataImg);

    useEffect(() => {
        if (isOpen) {
            setImgData(content);
        }
    }, [isOpen]);

    const handleOkFunc = () => {
        setOpen(false);
        okFunc();
        let imgArr = [];
        const ls = localStorage.getItem('imgDatas');
        if (ls != null) {
            imgArr = JSON.parse(ls);
        }
        imgArr.push(imgData);
        localStorage.setItem('imgDatas', JSON.stringify(imgArr));
        setImgData(content);
    };

    const handleClose = () => {
        setOpen(false);
        closeFunc();
        setImgData(content);
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const onChangeImage = (data: any) => {
        setImgData({
            ...imgData,
            images: data,
        });
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setImgData({
            ...imgData,
            [name]: value,
        });
    };

    const deleteImageCallback = (index: number) => {
        const data = imgData.images.filter((image: any, i: number) => {
            return index !== i;
        });
        setImgData({
            ...imgData,
            images: data,
        });
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
                                        value={imgData.comment}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        id="outlined-required"
                                        placeholder="Comment..."
                                        name="comment"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Grid >
                            <Grid item xs={12} lg={12}>
                                <MultipleFileUpload clearPreview={open} callbackFunc={onChangeImage} />
                            </Grid>
                        </Grid >
                    </DialogContentText >
                </DialogContent >
                <Divider />
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleOkFunc}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog >
        </div >
    );
}
