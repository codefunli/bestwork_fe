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
    const { title, content, isOpen, closeFunc, okFunc } = props;
    const [open, setOpen] = useState(false);
    const [postData, setPostData] = useState(initialDataImg);
    const [imgData, setImgData] = useState<any>([]);
    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
    }, [content.projectId, content.postId, isOpen]);

    const fetchData = () => {
        getPostByPostId(content.postId, content.projectId).then((value: any) => {
            if (value && value.data) {
                setPostData(value.data);
                setImgData(value.data.fileStorages);
            }
        });
    };

    const handleOkFunc = () => {
        let resObj;
        if (postData.images) {
            resObj = {
                projectId: content.projectId,
                description: postData.description,
                images: postData.images,
            };
        } else {
            const imgs = postData.fileStorages.map((img: any) => img.data);
            resObj = {
                projectId: content.projectId,
                description: postData.description,
                images: imgs,
            };
        }

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
        if (isOpen) setOpen(isOpen);
    }, [isOpen]);

    const onChangeImageEdit = (data: any) => {
        const imgs = data.map((img: any) => img.data);

        setImgData([...data]);

        setPostData({
            ...postData,
            images: imgs,
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
                                    callbackFunc={onChangeImageEdit}
                                    imgData={imgData}
                                    isEditUpload={true}
                                    clearPreview={open}
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
                        {t('button.btnUpdate')}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
