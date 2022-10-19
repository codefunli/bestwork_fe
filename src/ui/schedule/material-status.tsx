import LocalSeeIcon from '@mui/icons-material/LocalSee';
import MoreVertIcon from '@mui/icons-material/MoreVert';
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
import { Comment } from '../../core/types/base';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import ImageUploadDialog from '../../shared-components/modal/image-upload-dialog';
import EditIcon from '@mui/icons-material/Edit';

const initialDataImg = {
    comment: '',
    images: [],
    projectId: 'PRJ001',
};

const initialValues = [
    {
        comment: '',
        images: [],
        projectId: 'PRJ001',
    },
];
export default function MaterialSchedule() {
    //const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [imagesData, setImagesData] = useState(initialValues);
    const imgDatas = localStorage.getItem('imgDatas');
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [content, setContent] = useState(initialDataImg);

    const enableComment = () => {
        setIsEnabled(!isEnabled);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const alertOkFunc = () => {
        setIsOpenModal(false);
    };

    useEffect(() => {
        if (imgDatas != null) {
            const datas = JSON.parse(imgDatas);
            setImagesData(datas);
        }
    }, [imgDatas]);

    useEffect(() => {
        let comment = localStorage.getItem('comment_pr_1');
        if (comment) {
            let arrMsgSt = JSON.parse(comment);
            setArrMsg(arrMsgSt);
        }
    }, [arrMsg]);

    const handleEditImage = (data: any) => {
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
                        <InputLabel htmlFor="outlined-adornment-amount">Upload image of material products:</InputLabel>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <LocalSeeIcon onClick={openModal} />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {imagesData[0].images.length > 0 &&
                imagesData.map((data) => (
                    <Grid
                        key={data.projectId}
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
                                        title="Nguyen Thi Mien"
                                        subheader={new Date().toLocaleDateString()}
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
                                        <p>{data.comment}</p>
                                        <ImageManager images={data.images} />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={enableComment}>
                                            COMMENT
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            <div>
                                <CommentEl arrMsg={arrMsg} isEnabled={isEnabled} />
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
