import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import SendIcon from '@mui/icons-material/Send';
import { Divider, IconButton, Paper, TextField } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuidv4 } from 'uuid';
import { CommentConstant } from '../../core/constants/constant';
import { Comment } from '../../core/types/base';
import { STR_EMPTY } from '../../core/utils/object-utils';
import CommentLeft from './comment-left';
import './comment.scss';

interface CommentProps {
    arrMsg: Comment[];
    isEnabled: boolean;
    pId: string;
    projectId: any;
}

export default function CommentEl(props: CommentProps) {
    const { arrMsg, isEnabled, pId, projectId } = props;
    const [arrMsgIn, setArrMsgIn] = useState<Comment[]>(arrMsg);
    const [newMsg, setNewMsg] = useState('');
    const [replyLabel, setReplyLabel] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [type, setType] = useState(CommentConstant.ADD);
    const { t } = useTranslation();

    const doReplyLabel = (replyLabel: string, id: string) => {
        setReplyLabel(replyLabel);
        setCurrentId(id);
        setType(CommentConstant.REPLY);
        setNewMsg('');
    };

    const doEditLabel = (editLabel: string, id: string, comment: string) => {
        setReplyLabel(editLabel);
        setCurrentId(id);
        setType(CommentConstant.EDIT);
        setNewMsg(comment);
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
                        id: 0,
                        name: 'Nam đế',
                        avatar: 'https://i.pinimg.com/474x/dc/fb/42/dcfb427e747a56047d46df17d621ed4b.jpg',
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
                                id: 0,
                                name: 'Nam đế',
                                avatar: 'https://i.pinimg.com/474x/dc/fb/42/dcfb427e747a56047d46df17d621ed4b.jpg',
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
                                        id: 0,
                                        name: 'Nam đế',
                                        avatar: 'https://saostyle.vn/wp-content/uploads/2020/10/Hermione-Granger-Emma-Watson.jpg',
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
            } else if (CommentConstant.EDIT === type) {
                arrMsgIn.map((cmt) => {
                    if (cmt.id === currentId) {
                        cmt.comment = newMsg;
                    } else {
                        cmt.subComment.map((subCmt: any) => {
                            if (subCmt.id === currentId) {
                                subCmt.comment = newMsg;
                            } else {
                                subCmt.subComment.map((subSubCmt: any) => {
                                    if (subSubCmt.id === currentId) {
                                        subSubCmt.comment = newMsg;
                                    }
                                });
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
        };

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
        <div className="mb-2">
            <div
                className={` msg-wrapper-scroll pt-3 ${isEnabled && arrMsgIn.length > 0 ? 'msg-height-15rem' : ''}`}
                id="comment-box"
            >
                {isEnabled &&
                    arrMsgIn.map((item: any) => {
                        return <CommentLeft key={item.id} msg={item} reply={doReplyLabel} edit={doEditLabel} />;
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
                                id="outlined-required"
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
