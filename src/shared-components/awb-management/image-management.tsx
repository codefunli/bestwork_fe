import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    Typography,
} from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Comment } from '../../core/types/base';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import { ImageAfterContext, ImageBeforeContext } from '../../ui/awb/awb-list';
import ImageUploadModal from '../modal/image-upload-modal';

const initialValue = {
    description: '',
    file: [],
    isOpenComment: false,
};

export const ImageContext = createContext<any>({});

export default function ImageManagement(props: any) {
    const { callBackFn, callBackAddComment } = props;
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [imagesData, setImagesData] = useState<any>([]);
    const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [contentCreate, setContentCreate] = useState(initialValue);
    const params = useParams();
    const { t } = useTranslation();
    const imageBefore = useContext(ImageBeforeContext);
    const imageAfter = useContext(ImageAfterContext);

    useEffect(() => {
        if (imageBefore && imageBefore.length > 0) {
            setImagesData(
                imageBefore.map((data: any) => {
                    return {
                        ...data,
                        isOpenComment: data.comment ? true : false,
                    };
                }),
            );
        } else if (imageAfter && imageAfter.length > 0) {
            setImagesData(
                imageAfter.map((data: any) => {
                    return {
                        ...data,
                        isOpenComment: data.comment ? true : false,
                    };
                }),
            );
        } else {
            setImagesData([]);
        }
    }, [imageBefore, imageAfter]);

    useEffect(() => {}, [params.id]);

    const enableComment = (data: any) => {
        const convertData = imagesData.map((value: any) => {
            if (value.postId === data.postId) {
                value.isOpenComment = !value.isOpenComment;
            }
            return value;
        });

        setImagesData(convertData);
    };

    const closeModal = () => {
        setIsOpenCreateModal(false);
    };

    const openModal = () => {
        setIsOpenCreateModal(true);
    };

    const alertOkFunc = (data: any) => {
        callBackFn(data);
        setIsOpenCreateModal(false);
    };

    useEffect(() => {
        let comment = localStorage.getItem('comment_pr_1');
        if (comment) {
            let arrMsgSt = JSON.parse(comment);
            setArrMsg(arrMsgSt);
        }
    }, [arrMsg]);

    const handleAddImageComment = (data: any) => {
        callBackAddComment(data);
    };

    return (
        <div>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} lg={12} justifyContent="center">
                    <Paper
                        w-fullWidth
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            border: 2,
                            borderColor: 'primary.main',
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-amount">{t('awb.uploadImage')}</InputLabel>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <AddPhotoAlternateIcon onClick={openModal} />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {imagesData && imagesData.length > 0 ? (
                imagesData.map((data: any) => (
                    <Grid
                        key={data.id}
                        container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} lg={12}>
                            <div>
                                <Card w-full="true">
                                    <CardHeader
                                        avatar={<Avatar aria-label="recipe">MS</Avatar>}
                                        title={data.createBy}
                                        subheader={data.createDate}
                                    />
                                    <CardContent>
                                        <p>{data.description}</p>
                                        <ImageManager
                                            data={{
                                                files: data.fileStorages,
                                            }}
                                            isFile={false}
                                            callBackFn={() => {}}
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => enableComment(data)}>
                                            {t('material.comment')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            <div>
                                <ImageContext.Provider value={data}>
                                    <CommentEl
                                        callBackFn={handleAddImageComment}
                                        postId={data.evidenceBeforeId}
                                        isEnabled={data.isOpenComment ? data.isOpenComment : false}
                                        postType={'imageBefore'}
                                    />
                                </ImageContext.Provider>
                            </div>
                        </Grid>
                    </Grid>
                ))
            ) : (
                <Typography>{t('message.noData')}</Typography>
            )}
            <ImageUploadModal
                isOpen={isOpenCreateModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title={t('material.uploadTitle')}
                content={contentCreate}
            />
        </div>
    );
}
