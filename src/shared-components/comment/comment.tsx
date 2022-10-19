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
}

export default function CommentEl(props: CommentProps) {
    const { arrMsg, isEnabled } = props;
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
                    user: 'current user',
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
                            user: 'current user',
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
                                    user: 'current user',
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

        //save to database
        localStorage.removeItem('comment_pr_1');
        localStorage.setItem('comment_pr_1', JSON.stringify(arrMsgIn)); //dummy
        handleClear();
        setNewMsg(STR_EMPTY);
        setArrMsgIn(arrMsgIn);
    };

    return (
        <div className="mb-2">
            <div className={` msg-wrapper-scroll pt-1 ${arrMsgIn.length > 0 ? 'msg-height-15rem' : ''}`}>
                {arrMsgIn.map((item: any) => (
                    <CommentLeft msg={item} reply={doReplyLabel} />
                ))}
            </div>
            <div>
                {(arrMsgIn.length > 0 || isEnabled == true) && (
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
