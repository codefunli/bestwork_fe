import { Divider, IconButton, Paper, TextField } from '@mui/material';
import { Comment } from '../../core/types/base';
import SendIcon from '@mui/icons-material/Send';
import './comment.scss';
import { useEffect, useState } from 'react';
import CommentLeft from './comment-left';

interface CommentProps {
    arrMsg: Comment[];
    isEnabled: boolean;
}

export default function CommentEl(props: CommentProps) {
    const { arrMsg, isEnabled } = props;
    const [arrMsgIn, setArrMsgIn] = useState<Comment[]>(arrMsg);
    const [newMsg, setNewMsg] = useState('');
    const [replyLabel, setReplyLabel] = useState('');
    const [currentId, setCurrentId] = useState(-1);

    const doReplyLabel = (replyLabel: string, id: number) => {
        setReplyLabel(replyLabel);
        setCurrentId(id);
    };

    const handleInputChange = (e: any) => {
        setNewMsg(e.target.value);
    };

    const handleAddNewMsg = (newMsg: any) => {
        arrMsgIn.push({
            id: -1,
            user: 'new',
            comment: newMsg,
            dateTime: new Date().toISOString().substring(0, 16),
            subComment: [],
        });
        //save to database
    };

    useEffect(() => {
        setArrMsgIn(arrMsgIn);
    }, [arrMsgIn]);

    return (
        <div className="mb-2">
            <div className={` msg-wrapper-scroll pt-1 ${arrMsgIn.length > 0 ? 'msg-height-15rem' : ''}`}>
                {arrMsgIn.map((item: any) => (
                    <CommentLeft msg={item} reply={doReplyLabel} />
                ))}
            </div>
            <div>
                {(arrMsgIn.length > 0 || isEnabled == true) && (
                    <form onSubmit={handleAddNewMsg}>
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
