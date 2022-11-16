import UploadFileIcon from '@mui/icons-material/UploadFile';
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
} from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { Comment } from '../../core/types/base';
import CommentEl from '../comment/comment';
import ImageManager from '../images-manager/image-manager';
import FileUploadModal from '../modal/file-upload-modal';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { CommercialInvoiceContext } from '../../ui/awb/awb-list';

const initialValue = {
    description: '',
    file: [],
    isOpenComment: false,
};

export default function FileManagement(props: any) {
    const { callBackFn } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [filesData, setFilesData] = useState<any>([]);
    const [comment, setComment] = useState<Comment[]>([]);
    const [content, setContent] = useState(initialValue);
    const params = useParams();
    const { t } = useTranslation();
    const commercialInvoice = useContext(CommercialInvoiceContext);

    const enableComment = (data: any) => {
        const convertData = filesData.map((value: any) => {
            if (value.postId === data.postId) {
                value.isOpenComment = !value.isOpenComment;
            }
            return value;
        });

        setFilesData(convertData);
    };

    const closeModal = () => {
        setIsOpenModal(false);
    };

    const openModal = () => {
        setIsOpenModal(true);
    };

    const alertOkFunc = (fileData: any) => {
        callBackFn(fileData);
        setIsOpenModal(false);
    };

    useEffect(() => {
        let comment = localStorage.getItem('comment_pr_1');
        if (comment) {
            let arrMsgSt = JSON.parse(comment);
            setComment(arrMsgSt);
        }
    }, [comment]);

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
                        <InputLabel htmlFor="outlined-adornment-amount">{t('awb.uploadFile')}</InputLabel>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <UploadFileIcon onClick={openModal} />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {commercialInvoice &&
                commercialInvoice.length > 0 &&
                commercialInvoice.map((data: any) => (
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
                                <Card
                                    w-full="true"
                                    sx={{
                                        border: 2,
                                        borderColor: 'primary.main',
                                    }}
                                >
                                    <CardHeader
                                        avatar={<Avatar aria-label="recipe">MS</Avatar>}
                                        title={data.createBy}
                                        subheader={data.createDate}
                                        action={
                                            <Tooltip title={t('tooltip.addAll')} placement="left">
                                                <IconButton color="primary" size="large">
                                                    <DriveFileMoveIcon sx={{ fontSize: 50 }} />
                                                </IconButton>
                                            </Tooltip>
                                        }
                                    />
                                    <CardContent>
                                        <p>{data.description}</p>
                                        {/* <ImageManager images={data.fileStorages} isFile={true} /> */}
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => enableComment(data)}>
                                            {t('material.comment')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            {data.comment && (
                                <div>
                                    <CommentEl
                                        arrMsg={data.comment}
                                        pId={data.id}
                                        isEnabled={data.isOpenComment}
                                        projectId={params.id}
                                    />
                                </div>
                            )}
                        </Grid>
                    </Grid>
                ))}
            <FileUploadModal
                isOpen={isOpenModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title="Tải lên file"
                content={content}
            />
        </div>
    );
}
