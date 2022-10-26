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

    const [messages, setMessage] = useState(msg);

    const passIdMsg = (id: any) => {
        if (messages.id === id) {
            reply('Responding ' + messages.commentUser.name, id);
        }
    };

    const handleShowComment = (id: any) => {
        if (messages.id === id) {
            setMessage({ ...messages, isShowSubComment: !messages.isShowSubComment });
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
                src={messages.commentUser.avatar}
            ></Avatar>
            <div className="msg-content-wrapper">
                <div className="msg-content-detail">
                    <div className="fw-bold mb-1">{messages.commentUser.name}</div>
                    <div>
                        <p className="mb-0">{messages.comment}</p>
                    </div>
                </div>
                <div className="msg-btn-reply text-end">
                    <Button size="small" variant="text" onClick={() => passIdMsg(messages.id)}>
                        Edit
                    </Button>
                    {!messages.isLastSub && (
                        <Button size="small" variant="text" onClick={() => passIdMsg(messages.id)}>
                            Reply
                        </Button>
                    )}
                    {messages?.subComment.length > 0 && (
                        <Button onClick={() => handleShowComment(messages.id)}>
                            <small>
                                {messages.isShowSubComment ? 'Hide' : 'Show'} ({messages?.subComment.length}){' '}
                            </small>
                        </Button>
                    )}
                </div>
                {messages.isShowSubComment &&
                    messages?.subComment.map((item: any) => <CommentLeft key={item.id} msg={item} reply={reply} />)}
            </div>
        </div>
    );
}
