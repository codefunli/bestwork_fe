import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import EditIcon from '@mui/icons-material/Edit';
import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    IconButton,
    InputLabel,
    Paper,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Comment } from '../../core/types/base';
import { getPostByPostId, getPostByProjectId, postComment } from '../../services/material-service';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import ImageUploadDialog from '../../shared-components/modal/create-material-modal';
import EditMaterialModal from '../../shared-components/modal/edit-material-modal';

const initialDataImg = {
    description: '',
    images: [],
    projectId: '',
    isOpenComment: false,
    comment: [
        {
            id: '',
            commentUser: {
                id: 0,
                name: 'Quách Tĩnh',
                avatar: '',
            },
            comment: '',
            dateTime: '',
            isLastSub: false,
            subComment: {},
        },
    ],
    postUser: {
        id: '0',
        name: 'Đông Tà',
    },
    eqBill: '',
};
export default function MaterialSchedule() {
    const [isOpenCreateModal, setIsOpenCreateModal] = useState(false);
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [imagesData, setImagesData] = useState<any>([]);
    const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [contentCreate, setContentCreate] = useState(initialDataImg);
    const [contentEdit, setContentEdit] = useState<any>({});
    const params = useParams();
    const { t } = useTranslation();

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const fetchData = () => {
        if (params.id) {
            setContentCreate({
                ...contentCreate,
                projectId: params.id,
            });

            getPostByProjectId(params.id).then((posts) => {
                const convertData = posts.map((post: any) => {
                    post.isShowSubComment = false;
                    if (post.comment) {
                        post.comment = JSON.parse(post.comment);
                    } else {
                        post.comment = [];
                    }
                    post.postUser = {
                        id: 0,
                        name: 'Đông Tà',
                    };
                    return post;
                });

                setImagesData([...convertData]);
            });
        }
    };

    const enableComment = (data: any) => {
        const convertData = imagesData.map((post: any) => {
            if (post.id === data.id) {
                post.isOpenComment = !post.isOpenComment;
            }
            return post;
        });
        setImagesData([...convertData]);
    };

    const closeModal = () => {
        setIsOpenCreateModal(false);
        setIsOpenEditModal(false);
        fetchData();
    };

    const openModal = () => {
        setIsOpenCreateModal(true);
    };

    const alertOkFunc = () => {
        setIsOpenCreateModal(false);
        setIsOpenEditModal(false);
        fetchData();
    };

    useEffect(() => {
        let comment = localStorage.getItem('comment_pr_1');
        if (comment) {
            let arrMsgSt = JSON.parse(comment);
            setArrMsg(arrMsgSt);
        }
    }, [arrMsg]);

    const handleEditImage = (data: any) => {
        setContentEdit(() => {
            return {
                projectId: params.id,
                postId: data.id,
            };
        });
        setIsOpenEditModal(true);
    };
    return (
        <div>
            <Typography variant="h5" className="mb-4 text-uppercase" color="textSecondary" gutterBottom>
                {t('material.title')}
                <Divider />
            </Typography>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} lg={5} justifyContent="center">
                    <Paper
                        w-fullWidth
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-amount">{t('material.uploadTitle')}</InputLabel>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <AddPhotoAlternateIcon onClick={openModal} />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {imagesData.length > 0 &&
                imagesData.map((data: any) => (
                    <Grid
                        key={data.id}
                        container
                        spacing={3}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Grid item xs={12} lg={5}>
                            <div>
                                <Card w-full="true">
                                    <CardHeader
                                        avatar={<Avatar aria-label="recipe">MS</Avatar>}
                                        title={data.postUser.name}
                                        subheader={data.createDate.substring(0, 19)}
                                        action={
                                            <IconButton
                                                color="primary"
                                                sx={{ p: '10px' }}
                                                aria-label="directions"
                                                onClick={() => handleEditImage(data)}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        }
                                    />
                                    <CardContent>
                                        <h3>{data.eqBill}</h3>
                                        <p>{data.description}</p>
                                        <ImageManager images={data.fileStorages} />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => enableComment(data)}>
                                            {t('material.comment')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            <div>
                                <CommentEl
                                    arrMsg={data.comment}
                                    pId={data.id}
                                    isEnabled={data.isOpenComment}
                                    projectId={params.id}
                                />
                            </div>
                        </Grid>
                    </Grid>
                ))}
            {isOpenCreateModal ? (
                <ImageUploadDialog
                    isOpen={isOpenCreateModal}
                    closeFunc={closeModal}
                    okFunc={alertOkFunc}
                    title={t('material.uploadTitle')}
                    content={contentCreate}
                />
            ) : (
                <EditMaterialModal
                    isOpen={isOpenEditModal}
                    closeFunc={closeModal}
                    okFunc={alertOkFunc}
                    title={t('material.editTitle')}
                    content={contentEdit}
                />
            )}
        </div>
    );
}
