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
import { useParams } from 'react-router-dom';
import { Comment } from '../../core/types/base';
import { getPostByProjectId } from '../../services/material-service';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import ImageUploadDialog from '../../shared-components/modal/image-upload-dialog';

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
};
export default function MaterialSchedule() {
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [imagesData, setImagesData] = useState<any>([]);
    const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [content, setContent] = useState(initialDataImg);
    const params = useParams();

    useEffect(() => {
        fetchData();
    }, [params.id]);

    const fetchData = () => {
        if (params.id) {
            setContent({
                ...content,
                projectId: params.id,
            });
            getPostByProjectId(params.id).then((posts) => {
                const convertData = posts.map((post: any) => {
                    post.isShowSubComment = false;
                    post.comment = JSON.stringify([
                        {
                            id: '85d14a15-836c-4e30-af5f-869b408e044c',
                            postId: '995d3dfd-a27e-4e5e-8824-2cf40e232d02',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: 'https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/grid/original/145453_hermione-granger.JPG',
                            },
                            comment: 'hallo',
                            dateTime: '2022-10-24T07:21',
                            isLastSub: false,
                            subComment: [],
                            isOpenComment: false,
                        },
                        {
                            id: '2e931741-99fc-4997-9054-9eb0487e6cb8',
                            postId: '995d3dfd-a27e-4e5e-8824-2cf40e232d02',
                            commentUser: {
                                id: 0,
                                name: 'Quách Tĩnh',
                                avatar: 'https://asset-a.grid.id/crop/0x0:0x0/945x630/photo/grid/original/145453_hermione-granger.JPG',
                            },
                            comment: 'asd',
                            dateTime: '2022-10-24T07:22',
                            isLastSub: false,
                            subComment: [],
                            isOpenComment: false,
                        },
                    ]);
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
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const alertOkFunc = () => {
        fetchData();
        setIsOpenModal(false);
    };

    useEffect(() => {
        let comment = localStorage.getItem('comment_pr_1');
        if (comment) {
            let arrMsgSt = JSON.parse(comment);
            setArrMsg(arrMsgSt);
        }
    }, [arrMsg]);

    const handleEditImage = (data: any) => {
        console.log(data);

        setIsOpenModal(true);
    };
    return (
        <div>
            <Typography variant="h5" className="mb-4" color="textSecondary" gutterBottom>
                MATERIAL STATUS
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
                        <InputLabel htmlFor="outlined-adornment-amount">Upload image of material products</InputLabel>
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
                                <Card w-full>
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
                                        <p>{data.description}</p>
                                        <ImageManager images={data.fileStorages} />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => enableComment(data)}>
                                            COMMENT
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            <div>
                                <CommentEl arrMsg={data.comment} pId={data.id} isEnabled={data.isOpenComment} />
                            </div>
                        </Grid>
                    </Grid>
                ))}
            <ImageUploadDialog
                isOpen={isOpenModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title="Upload image for material products"
                content={content}
                noBtn="NO"
                okBtn="OK"
            />
        </div>
    );
}
