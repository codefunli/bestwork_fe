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
    Tooltip,
    Typography,
} from '@mui/material';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { AWB_LOADING, CUSTOMS_CLEARANCE } from '../../core/constants/common';
import { Comment } from '../../core/types/base';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import { ImageAfterContext, ImageBeforeContext, PermissionContext } from '../../ui/awb/awb-list';
import Loading from '../loading-page/Loading';
import ImageUploadModal from '../modal/image-upload-modal';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';

const initialValue = {
    description: '',
    file: [],
    isOpenComment: false,
};

export const ImageContext = createContext<any>({});

export default function ImageManagement(props: any) {
    const { callBackFn, callBackAddComment, isLoading, isImageBefore, callBackAddFile } = props;
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [imagesData, setImagesData] = useState<any>([]);
    const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [contentCreate, setContentCreate] = useState(initialValue);
    const params = useParams();
    const { t } = useTranslation();
    const imageBefore = useContext(ImageBeforeContext);
    const imageAfter = useContext(ImageAfterContext);
    const permission = useContext<any>(PermissionContext);

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

    const handleAddFileCallBack = (data: any) => {
        callBackAddFile({ ...data, toStatus: true });
    };

    const handleAddAll = (value: any) => {
        const fileId = value.fileStorages.map((file: any) => {
            return file.fileId;
        });

        const convertData = {
            postType: value.postType,
            postId: value.evidenceBeforeId,
            fileId: [...fileId],
            toStatus: true,
        };

        callBackAddFile(convertData);
    };

    const checkAddAllButton = (value: any) => {
        let check = [];
        if (value && value.fileStorages) {
            check = value.fileStorages.filter((file: any) => {
                return file.isChoosen === false;
            });
        }

        return check.length <= 0;
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
                        onClick={permission?.canEdit ? openModal : () => {}}
                    >
                        <InputLabel htmlFor="outlined-adornment-amount">{t('awb.uploadImage')}</InputLabel>
                        <IconButton
                            color="primary"
                            sx={{ p: '10px' }}
                            aria-label="directions"
                            disabled={!permission?.canEdit}
                        >
                            <AddPhotoAlternateIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {isLoading === AWB_LOADING.HAS_DATA ? (
                imagesData &&
                imagesData.length > 0 &&
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
                                        action={
                                            isImageBefore ? (
                                                <IconButton
                                                    color="primary"
                                                    size="large"
                                                    onClick={() => handleAddAll(data)}
                                                    disabled={checkAddAllButton(data)}
                                                >
                                                    <Tooltip title={t('tooltip.addAll')} placement="left">
                                                        <DriveFileMoveIcon sx={{ fontSize: 50 }} />
                                                    </Tooltip>
                                                </IconButton>
                                            ) : (
                                                <React.Fragment></React.Fragment>
                                            )
                                        }
                                    />
                                    <CardContent>
                                        <p>{data.description}</p>
                                        <ImageManager
                                            data={{
                                                files: data.fileStorages,
                                            }}
                                            isFile={false}
                                            callBackFn={handleAddFileCallBack}
                                            isImageBefore={isImageBefore}
                                            postType={data.postType}
                                            postId={data.evidenceBeforeId}
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
                                        postId={data.evidenceBeforeId ? data.evidenceBeforeId : data.evidenceAfterId}
                                        isEnabled={data.isOpenComment ? data.isOpenComment : false}
                                        postType={
                                            data.evidenceBeforeId
                                                ? CUSTOMS_CLEARANCE.IMAGE_BEFORE
                                                : CUSTOMS_CLEARANCE.IMAGE_AFTER
                                        }
                                    />
                                </ImageContext.Provider>
                            </div>
                        </Grid>
                    </Grid>
                ))
            ) : isLoading === AWB_LOADING.LOADING ? (
                <Loading />
            ) : (
                isLoading === AWB_LOADING.NO_DATA && <Typography>{t('message.noData')}</Typography>
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
