import {
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField,
    Typography,
    IconButton,
    Paper,
    InputLabel,
} from '@mui/material';
import { useState } from 'react';
import { Comment } from '../../core/types/base';
import CommentEl from '../../shared-components/comment/comment';
import ImageManager from '../../shared-components/images-manager/image-manager';
import LocalSeeIcon from '@mui/icons-material/LocalSee';

export default function MaterialSchedule() {
    //const [arrMsg, setArrMsg] = useState<Comment[]>([]);
    const [isEnabled, setIsEnabled] = useState<boolean>(false);
    const [arrMsg, setArrMsg] = useState<Comment[]>([
        {
            id: 1,
            user: 'Tran van Quyet',
            comment: 'Sản phầm bị lỗi ae bbb AAAAAAAAA',
            dateTime: '08:50:20',
            subComment: [
                {
                    id: 31,
                    user: 'Ha Hau Don',
                    comment: 'Sản phầm bị lỗi ae bbb AAAAAAAAA',
                    dateTime: '08:50:20',
                    subComment: [
                        {
                            id: 80,
                            user: 'Chu Tan Sang',
                            comment: 'Sản phầm bị lỗi ae bbb AAAAAAAAA',
                            dateTime: '08:50:20',
                            subComment: [],
                        },
                    ],
                },
            ],
        },
        {
            id: 2,
            user: 'Ngo Van So',
            comment: 'Tôi sẽ xem lại và gủi lại. Sớm nhất có thể',
            dateTime: '08:50:20',
            subComment: [],
        },
        {
            id: 3,
            user: 'Di Nhien',
            comment: 'Tôi sẽ xem lại và gủi lại',
            dateTime: '08:50:20',
            subComment: [],
        },
        {
            id: 4,
            user: 'Au Ma',
            comment: 'Tôi sẽ xem lại và gủi lại',
            dateTime: '08:50:20',
            subComment: [],
        },
        {
            id: 5,
            user: 'Mai Chi Tho',
            comment: 'Tôi sẽ xem lại và gủi lại',
            dateTime: '08:50:20',
            subComment: [],
        },
    ]);

    const enableComment = () => {
        setIsEnabled(!isEnabled);
    };

    return (
        <div>
            <Typography variant="h5" className="mb-4" color="textSecondary" gutterBottom>
                MATERIAL STATUS
                <Divider />
            </Typography>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} lg={5} justifyContent="center">
                    <Paper
                        w-fullWidth
                        component="form"
                        sx={{
                            p: '2px 4px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <InputLabel htmlFor="outlined-adornment-amount">Upload image of material products:</InputLabel>
                        <IconButton
                            color="primary"
                            sx={{ p: '10px' }}
                            aria-label="directions"
                            // onClick={(event) => handleAddNewMsg(event)}
                        >
                            <LocalSeeIcon />
                        </IconButton>
                    </Paper>
                </Grid>
            </Grid>
            <Grid container spacing={3} direction="row" justifyContent="center" alignItems="center">
                <Grid item xs={12} lg={5}>
                    <div>
                        <Card w-full>
                            <CardHeader
                                avatar={<Avatar aria-label="recipe">MS</Avatar>}
                                title="Nguyen Thi Mien"
                                subheader={new Date().toLocaleDateString()}
                            />
                            <CardContent>
                                <div>Nguyen vat lieu cho</div>
                                <ImageManager />
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={enableComment}>
                                    COMMENT
                                </Button>
                            </CardActions>
                        </Card>
                    </div>
                    <div>
                        <CommentEl arrMsg={arrMsg} isEnabled={isEnabled} />
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
