import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { Comment } from '../../core/types/base';
import './comment.scss';

interface CommentRightProps {
    msg: Comment;
    reply: Function;
    edit: Function;
}

const message: Comment = {
    id: '',
    commentUser: {
        id: '',
        name: '',
        avatar: '',
    },
    comment: '',
    isShowSubComment: false,
    dateTime: '',
    isLastSub: false,
    subComment: [],
};

export default function CommentLeft(props: CommentRightProps) {
    const { msg, reply, edit } = props;

    const [messages, setMessage] = useState(message);

    useEffect(() => {
        setMessage(msg);
    }, [msg]);

    const passIdMsg = (id: any) => {
        if (messages.id === id) {
            reply('Responding ' + messages.commentUser.name, id);
        }
    };

    const passIdMsgEdit = (id: any) => {
        if (messages.id === id) {
            edit('Edit for ' + messages.commentUser.name, id, messages.comment);
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
                    <div className="fw-bold mb-1">
                        {messages.commentUser.name} -{' '}
                        <small className="fw-normal">
                            {Number(
                                (
                                    (new Date().getTime() - new Date(messages.dateTime).getTime()) /
                                    (1000 * 3600 * 24)
                                ).toFixed(0),
                            ) <= 0
                                ? new Date().getHours() - new Date(messages.dateTime).getHours() <= 0
                                    ? new Date().getMinutes() - new Date(messages.dateTime).getMinutes() <= 0
                                        ? new Date().getSeconds() -
                                          new Date(messages.dateTime).getSeconds() +
                                          ' giay truoc'
                                        : new Date().getMinutes() -
                                          new Date(messages.dateTime).getMinutes() +
                                          ' phut truoc'
                                    : new Date().getHours() - new Date(messages.dateTime).getHours() + ' gio truoc'
                                : (
                                      (new Date().getTime() - new Date(messages.dateTime).getTime()) /
                                      (1000 * 3600 * 24)
                                  ).toFixed(0) + ' ngay truoc'}
                        </small>
                    </div>
                    <div>
                        <p className="mb-0">{messages.comment}</p>
                    </div>
                </div>
                <div className="msg-btn-reply text-end">
                    <Button size="small" variant="text" onClick={() => passIdMsgEdit(messages.id)}>
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
                    messages?.subComment.map((item: any) => (
                        <CommentLeft key={item.id} msg={item} reply={reply} edit={edit} />
                    ))}
            </div>
        </div>
    );
}
