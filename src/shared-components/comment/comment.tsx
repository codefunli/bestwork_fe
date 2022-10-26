import { Divider, IconButton, Paper, TextField } from '@mui/material';
import { Comment } from '../../core/types/base';
import SendIcon from '@mui/icons-material/Send';
import './comment.scss';
import { useEffect, useState } from 'react';
import CommentLeft from './comment-left';
import { STR_EMPTY } from '../../core/utils/object-utils';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { v4 as uuidv4 } from 'uuid';

interface CommentProps {
    arrMsg: Comment[];
    isEnabled: boolean;
    pId: string;
}

export default function CommentEl(props: CommentProps) {
    const { arrMsg, isEnabled, pId } = props;
    const [arrMsgIn, setArrMsgIn] = useState<Comment[]>(arrMsg);
    const [newMsg, setNewMsg] = useState('');
    const [replyLabel, setReplyLabel] = useState('');
    const [currentId, setCurrentId] = useState('');
    const [type, setType] = useState('ADD');

    const doReplyLabel = (replyLabel: string, id: string) => {
        setReplyLabel(replyLabel);
        setCurrentId(id);
        setType('REPLY');
    };

    const handleInputChange = (e: any) => {
        setNewMsg(e.target.value);
    };

    const handleClear = () => {
        setType('ADD');
        setReplyLabel(STR_EMPTY);
        setCurrentId(STR_EMPTY);
    };

    const handleAddNewMsg = (e: any) => {
        if (STR_EMPTY !== newMsg) {
            if ('ADD' === type) {
                arrMsgIn.push({
                    id: uuidv4(),
                    commentUser: {
                        id: 0,
                        name: 'Nam đế',
                        avatar: 'https://i.pinimg.com/474x/dc/fb/42/dcfb427e747a56047d46df17d621ed4b.jpg',
                    },
                    comment: newMsg,
                    dateTime: new Date().toISOString().substring(0, 16),
                    isLastSub: false,
                    subComment: [],
                });
            } else if ('REPLY' === type) {
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
                            dateTime: new Date().toISOString().substring(0, 16),
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
                                    dateTime: new Date().toISOString().substring(0, 16),
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
        setArrMsgIn(arrMsgIn);

        const repObj = {
            postId: pId,
            comment: JSON.stringify(arrMsgIn),
        };

        console.log(repObj);
    };

    return (
        <div className="mb-2">
            <div className={` msg-wrapper-scroll pt-1 ${isEnabled && arrMsgIn.length > 0 ? 'msg-height-15rem' : ''}`}>
                {isEnabled &&
                    arrMsgIn.map((item: any) => <CommentLeft key={item.id} msg={item} reply={doReplyLabel} />)}
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
                                placeholder="Please input a new value"
                                onChange={handleInputChange}
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
