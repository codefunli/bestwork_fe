import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SendIcon from '@mui/icons-material/Send';
import { Divider, IconButton, Paper, TextField } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { CUSTOMS_CLEARANCE } from '../../core/constants/common';
import { CommentConstant } from '../../core/constants/constant';
import { useAppDispatch } from '../../core/hook/redux';
import {
    customsClearanceActions,
    getCommercialInvoice,
    getImageBefore,
    getPackingList,
} from '../../core/redux/customs-clearance-slice';
import { getUserInfo } from '../../core/redux/user-slice';
import { Comment } from '../../core/types/base';
import { STR_EMPTY } from '../../core/utils/object-utils';
import { FileContext } from '../awb-management/file-management';
import { ImageContext } from '../awb-management/image-management';
import CommentLeft from './comment-left';
import './comment.scss';

interface CommentProps {
    isEnabled: boolean;
    callBackFn: Function;
    postId: string;
    postType: string;
}

export default function CommentEl(props: CommentProps) {
    const { isEnabled, callBackFn, postId, postType } = props;
    const [arrMsgIn, setArrMsgIn] = useState<Comment[]>([]);
    const [newMsg, setNewMsg] = useState('');
    const [replyLabel, setReplyLabel] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [type, setType] = useState(CommentConstant.ADD);
    const { t } = useTranslation();
    const fileContext = useContext(FileContext);
    const imageContext = useContext(ImageContext);
    const useInfo = useSelector(getUserInfo);
    const invoiceRedux = useSelector(getCommercialInvoice);
    const packingListRedux = useSelector(getPackingList);
    const imageBeforeRedux = useSelector(getImageBefore);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (fileContext.comment) {
            setArrMsgIn(JSON.parse(fileContext.comment));
        } else if (imageContext.comment) {
            setArrMsgIn(JSON.parse(imageContext.comment));
        } else {
            setArrMsgIn([]);
        }
    }, [fileContext, imageContext]);

    const doReplyLabel = (replyLabel: string, id: string) => {
        setReplyLabel(replyLabel);
        setCurrentId(id);
        setType(CommentConstant.REPLY);
        setNewMsg('');
    };

    const handleInputChange = (e: any) => {
        setNewMsg(e.target.value);
    };

    const handleClear = () => {
        setType(CommentConstant.ADD);
        setReplyLabel(STR_EMPTY);
        setCurrentId(STR_EMPTY);
    };

    const handleAddNewMsg = (e: any) => {
        if (STR_EMPTY !== newMsg) {
            if (CommentConstant.ADD === type) {
                arrMsgIn.push({
                    id: uuidv4(),
                    commentUser: {
                        id: `${useInfo.id}`,
                        name: `${useInfo.userName}`,
                        avatar: `${useInfo.avatar ? useInfo.avatar : ''}`,
                    },
                    comment: newMsg,
                    dateTime: `${new Date().toISOString()}`,
                    isLastSub: false,
                    subComment: [],
                });
            } else if (CommentConstant.REPLY === type) {
                arrMsgIn.map((cmt) => {
                    if (cmt.id === currentId) {
                        cmt.subComment.push({
                            id: uuidv4(),
                            commentUser: {
                                id: `${useInfo.id}`,
                                name: `${useInfo.userName}`,
                                avatar: `${useInfo.avatar ? useInfo.avatar : ''}`,
                            },
                            comment: newMsg,
                            dateTime: `${new Date().toISOString()}`,
                            isLastSub: false,
                            subComment: [],
                        });
                        return cmt;
                    } else {
                        cmt.subComment.map((subCmt, index) => {
                            if (subCmt.id === currentId) {
                                subCmt.subComment.push({
                                    id: uuidv4(),
                                    commentUser: {
                                        id: `${useInfo.id}`,
                                        name: `${useInfo.userName}`,
                                        avatar: `${useInfo.avatar ? useInfo.avatar : ''}`,
                                    },
                                    comment: newMsg,
                                    dateTime: `${new Date().toISOString()}`,
                                    isLastSub: true,
                                    subComment: [],
                                });
                                return cmt;
                            }
                        });
                    }
                });
            }
        }

        handleClear();
        setNewMsg(STR_EMPTY);

        const repObj = {
            comment: JSON.stringify(arrMsgIn),
            postId: postId,
            postType: postType,
        };

        console.log(postType);

        switch (postType) {
            case CUSTOMS_CLEARANCE.INVOICE:
                const handleInvoiceData = invoiceRedux.map((data: any) => {
                    if (data.invoiceId === postId) {
                        return {
                            ...data,
                            comment: JSON.stringify(arrMsgIn),
                        };
                    }
                    return data;
                });
                dispatch(customsClearanceActions.setCommercialInvoice(handleInvoiceData));
                break;
            case CUSTOMS_CLEARANCE.PACKAGE:
                const handlePackingData = packingListRedux.map((data: any) => {
                    if (data.packageId === postId) {
                        return {
                            ...data,
                            comment: JSON.stringify(arrMsgIn),
                        };
                    }
                    return data;
                });
                dispatch(customsClearanceActions.setPackingList(handlePackingData));
                break;
            case CUSTOMS_CLEARANCE.IMAGE_BEFORE:
                const handleImageBeforeData = imageBeforeRedux.map((data: any) => {
                    if (data.evidenceBeforeId === postId) {
                        return {
                            ...data,
                            comment: JSON.stringify(arrMsgIn),
                        };
                    }
                    return data;
                });
                dispatch(customsClearanceActions.setImageBefore(handleImageBeforeData));
                break;
            default:
                break;
        }

        callBackFn(repObj);

        setArrMsgIn((prev) => {
            return [...prev];
        });
    };

    const handleKeyDown = (event: any) => {
        if (event.key === CommentConstant.ENTER) {
            event.preventDefault();
            handleAddNewMsg(event);
        }
    };

    return (
        <div className="mb-2 border shadow ">
            <div
                className={` msg-wrapper-scroll pt-3 ${
                    isEnabled && arrMsgIn && arrMsgIn.length > 0 ? 'msg-height-15rem' : ''
                }`}
                id="comment-box"
            >
                {isEnabled &&
                    arrMsgIn &&
                    arrMsgIn.length > 0 &&
                    arrMsgIn.map((item: any) => {
                        return <CommentLeft key={item.id} msg={item} reply={doReplyLabel} />;
                    })}
            </div>
            <div>
                {isEnabled && (
                    <form>
                        <Paper
                            w-fullWidth
                            component="form"
                            sx={{
                                p: '2px 4px',
                                display: 'flex',
                                alignItems: 'center',
                            }}
                        >
                            <TextField
                                size="small"
                                name="newMsg"
                                value={newMsg}
                                fullWidth
                                sx={{ mt: 1, mb: 1 }}
                                autoComplete="off"
                                label={replyLabel}
                                placeholder={t('material.placeholder')}
                                onChange={handleInputChange}
                                onKeyDown={handleKeyDown}
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton
                                color="primary"
                                sx={{ p: '10px' }}
                                aria-label="directions"
                                onClick={handleClear}
                            >
                                <CleaningServicesIcon />
                            </IconButton>
                            <IconButton
                                color="primary"
                                sx={{ p: '10px' }}
                                aria-label="directions"
                                onClick={(event) => handleAddNewMsg(event)}
                            >
                                <SendIcon />
                            </IconButton>
                        </Paper>
                    </form>
                )}
            </div>
        </div>
    );
}
