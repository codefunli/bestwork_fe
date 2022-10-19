import { Avatar, Button, InputLabel } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Comment } from '../../core/types/base';
import './comment.scss';

interface CommentRightProps {
    msg: Comment;
    reply: Function;
}

export default function CommentLeft(props: CommentRightProps) {
    const { msg, reply } = props;

    const passIdMsg = (id: any) => {
        if (msg.id === id) {
            reply('Responding ' + msg.user, id);
        }
    };

    return (
        <div className="msg-wrapper-left">
            <Avatar
                sx={{
                    bgcolor: deepOrange[500],
                    width: 40,
                    height: 40,
                }}
            >
                N
            </Avatar>
            <div className="msg-content-wrapper">
                <div className="msg-content-detail">
                    <div className="fw-bold mb-1">{msg.user}</div>
                    <div>
                        <p className="mb-0">{msg.comment}</p>
                    </div>
                </div>
                <div className="msg-btn-reply text-end">
                    <Button size="small" variant="text" onClick={() => passIdMsg(msg.id)}>
                        Edit
                    </Button>
                    {!msg.isLastSub && (
                        <Button size="small" variant="text" onClick={() => passIdMsg(msg.id)}>
                            Reply
                        </Button>
                    )}
                </div>
                {msg?.subComment.map((item: any) => (
                    <CommentLeft msg={item} reply={reply} />
                ))}
            </div>
        </div>
    );
}
