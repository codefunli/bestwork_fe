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
import { getPostByPostId, updatePost } from '../../services/material-service';
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
        description: string;
        images: any;
        isOpenComment: boolean;
        postUser: any;
        postId: string;
        fileStorages: any;
    };
    noBtn: string;
    okBtn: string;
    isOpen: boolean;
    closeFunc: Function;
    okFunc: Function;
}
const initialDataImg = {
    description: '',
    images: [],
    fileStorages: [],
    projectId: '',
    isOpenComment: false,
    postUser: {
        id: 0,
        name: 'Đông Tà',
    },
};

export default function EditMaterialModal(props: AlertDialogSlideProps) {
    const { title, content, isOpen, closeFunc, okFunc, noBtn, okBtn } = props;
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState(initialDataImg);
    const [imgData, setImgData] = useState<any>([]);

    useEffect(() => {
        fetchData();
    }, [content.projectId, content.postId]);

    const fetchData = () => {
        getPostByPostId(content.postId, content.projectId).then((value: any) => {
            if (value && value.data) {
                setPostData(value.data);
                const imgs = value.data.fileStorages.map((val: any) => {
                    return val.data;
                });
                setImgData(imgs);
            }
        });
    };

    const handleOkFunc = () => {
        const resObj = {
            projectId: content.projectId,
            description: postData.description,
            images: imgData,
        };

        updatePost(content.postId, content.projectId, resObj).then((resp: any) => {
            closeFunc();
            setOpen(false);
            setPostData(() => resp.data);
        });
    };

    const handleClose = () => {
        fetchData();
        setOpen(false);
        closeFunc();
        setPostData(content);
    };

    useEffect(() => {
        if (isOpen) {
            setOpen(isOpen);
        }
    }, [isOpen]);

    const onChangeImage = (data: any) => {
        console.log('data', data);
        setImgData([...data]);

        setPostData({
            ...postData,
            images: data,
        });
    };

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setPostData({
            ...postData,
            [name]: value,
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
                                        value={postData.description}
                                        sx={{
                                            mt: 1,
                                            mb: 1,
                                            '& legend': { display: 'none' },
                                            '& fieldset': { top: 0 },
                                        }}
                                        id="outlined-required"
                                        placeholder="Description..."
                                        name="description"
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </Grid>
                            <Grid item xs={12} lg={12}>
                                <MultipleFileUpload
                                    clearPreview={open}
                                    callbackFunc={onChangeImage}
                                    imgData={imgData}
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </DialogContent>
                <Divider />
                <DialogActions>
                    <Button variant="outlined" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={handleOkFunc}>
                        Upload
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
