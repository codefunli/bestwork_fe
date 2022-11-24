import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
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
    Typography,
} from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Comment } from '../../core/types/base';
import { CommercialInvoiceContext, PackingListContext } from '../../ui/awb/awb-list';
import CommentEl from '../comment/comment';
import ImageManager from '../images-manager/image-manager';
import FileUploadModal from '../modal/file-upload-modal';

const initialValue = {
    description: '',
    file: [],
    isOpenComment: false,
};

export const FileContext = createContext<any>({});

export default function FileManagement(props: any) {
    const { callBackFn, callBackAddFile, callBackAddComment } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [filesData, setFilesData] = useState<any>(null);
    const [comment, setComment] = useState<Comment[]>([]);
    const [content, setContent] = useState(initialValue);
    const { t } = useTranslation();
    const commercialInvoice = useContext<any>(CommercialInvoiceContext);
    const packingList = useContext<any>(PackingListContext);

    useEffect(() => {
        if (commercialInvoice && commercialInvoice.length > 0) {
            setFilesData(
                commercialInvoice.map((data: any) => {
                    return {
                        ...data,
                        isOpenComment: data.comment ? true : false,
                    };
                }),
            );
        } else if (packingList && packingList.length > 0) {
            setFilesData(
                packingList.map((data: any) => {
                    return {
                        ...data,
                        isOpenComment: data.comment ? true : false,
                    };
                }),
            );
        } else {
            setFilesData([]);
        }
    }, [commercialInvoice, packingList]);

    const enableComment = (data: any) => {
        const convertData = filesData.map((value: any) => {
            if (value.invoiceId === data.invoiceId) {
                return {
                    ...value,
                    isOpenComment: !value.isOpenComment,
                };
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

    const handleAddFile = (data: any) => {
        callBackAddFile({ ...data, toStatus: true });
    };

    const handleAddAll = (value: any) => {
        const fileId = value.fileStorages.map((file: any) => {
            return file.fileId;
        });

        const convertData = {
            postType: value.postType,
            postId: value.invoiceId ? value.invoiceId : value.packageId,
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

    const handleAddComment = (data: any) => {
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
                        onClick={openModal}
                    >
                        <InputLabel htmlFor="outlined-adornment-amount">{t('awb.uploadFile')}</InputLabel>
                        <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
                            <UploadFileIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            {filesData && filesData.length > 0 ? (
                filesData.map((data: any) => (
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
                                        }
                                    />
                                    <CardContent>
                                        <p>{data.description}</p>
                                        <ImageManager
                                            data={{
                                                files: data.fileStorages,
                                                postType: data.postType,
                                                postId: data.invoiceId ? data.invoiceId : data.packageId,
                                                invoicePostId: data.invoiceId,
                                            }}
                                            isFile={true}
                                            callBackFn={handleAddFile}
                                        />
                                    </CardContent>
                                    <CardActions>
                                        <Button size="small" onClick={() => enableComment(data)}>
                                            {t('material.comment')}
                                        </Button>
                                    </CardActions>
                                </Card>
                            </div>
                            {
                                <div>
                                    <FileContext.Provider value={data}>
                                        <CommentEl
                                            isEnabled={data.isOpenComment ? data.isOpenComment : false}
                                            callBackFn={handleAddComment}
                                            postId={data.invoiceId ? data.invoiceId : data.packageId}
                                            postType={data.postType}
                                        />
                                    </FileContext.Provider>
                                </div>
                            }
                        </Grid>
                    </Grid>
                ))
            ) : (
                <Typography>{t('message.noData')}</Typography>
            )}
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
