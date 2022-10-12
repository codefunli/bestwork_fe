import { Avatar, Button, InputLabel } from '@mui/material';
import { deepOrange } from '@mui/material/colors';
import { Comment } from '../../core/types/base';
import './comment.scss';

interface CommentRightProps {
    msg: Comment;
}

export default function CommentLeft(props: CommentRightProps) {
    const { msg } = props;

    const passIdSubMsg = (id: any) => {
        alert(id);
    };

    return (
        <div className="sub-msg-wrapper">
            <div className="sub-msg-content">
                <Avatar
                    sx={{
                        bgcolor: deepOrange[500],
                        mr: 2,
                        width: 25,
                        height: 25,
                    }}
                >
                    N
                </Avatar>
                <div className="msg-content-detail">
                    <InputLabel htmlFor="outlined-adornment-amount">{msg.user}</InputLabel>
                    <div>
                        <p>{msg.comment}</p>
                    </div>
                </div>
            </div>
            <div className="msg-btn-reply text-end">
                <Button size="small" variant="text" onClick={() => passIdSubMsg(msg.id)}>
                    Reply
                </Button>
            </div>
        </div>
    );
}
