import { Avatar, Button } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { renderTimeString } from '../../core/constants/common';
import { Comment } from '../../core/types/base';
import './comment.scss';

interface CommentRightProps {
    msg: Comment;
    reply: Function;
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
    const { msg, reply } = props;
    const [messages, setMessage] = useState(message);
    const { t } = useTranslation();

    useEffect(() => {
        setMessage((prev) => {
            return { ...prev, ...msg };
        });
    }, [msg]);

    const passIdMsg = (id: any) => {
        if (messages.id === id) {
            reply(t('material.responding') + ' ' + messages.commentUser.name, id);
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
            <div className="msg-content-wrapper w-75">
                <div className="msg-content-detail">
                    <div className="fw-bold mb-1">
                        {messages.commentUser.name} -{' '}
                        <small className="fw-normal">{renderTimeString(messages, t)}</small>
                    </div>
                    <div>
                        <p className="mb-0" id={`cmt${messages.id}`}>
                            {messages.comment}
                        </p>
                    </div>
                </div>
                <div className="msg-btn-reply text-end">
                    {!messages.isLastSub && (
                        <Button size="small" variant="text" onClick={() => passIdMsg(messages.id)}>
                            {t('material.reply')}
                        </Button>
                    )}
                    {messages?.subComment.length > 0 && (
                        <Button onClick={() => handleShowComment(messages.id)}>
                            <small>
                                {messages.isShowSubComment ? t('material.hide') : t('material.show')} (
                                {messages?.subComment.length}){' '}
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
