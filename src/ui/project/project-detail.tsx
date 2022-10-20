import {
    Avatar,
    Box, Button, Card,
    CardContent,
    CardHeader,
    Divider, FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    InputLabel, List, ListItem, ListItemButton, ListItemText, Radio,
    RadioGroup, TextField,
    Typography
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { getProject } from '../../services/project-service';
import Progress from './progress';
import './project.scss';

const initialValues = {
    project: {
        projectName: '',
        projectType: '',
        description: '',
        comment: '',
        updateDate: '',
        notificationFlag: true,
        isPaid: false,
        status: '',
    },
};

const progressTmp: any = [
    '30-04-1975',
    '02-09-1975',
];

export default function ProjectEdit() {
    const [projectData, setProjectData] = useState(initialValues);
    const { t } = useTranslation();
    const params = useParams();
    const [isOpenDrawerProgress, setOpenDrawerProgress] = useState(false);

    useEffect(() => {
        if (params.id !== undefined) {
            getProject(params.id).then((value: any) => {
                if (value !== undefined && value.data !== undefined) {
                    const project = {
                        ...value.data,
                    };
                    setProjectData({ project });
                }
            });
        }
    }, [params.id]);

    const toggleDrawerProgress = (open: boolean) =>
        (event: React.KeyboardEvent | React.MouseEvent) => {
            if (
                event &&
                event.type === 'keydown' &&
                ((event as React.KeyboardEvent).key === 'Tab' ||
                    (event as React.KeyboardEvent).key === 'Shift')
            ) return;

            setOpenDrawerProgress(open);
        };

    return (
        <div className="project-detail">
            <form>
                <Typography
                    variant="h5"
                    className="mb-4"
                    color="textSecondary"
                    gutterBottom
                    sx={{ textTransform: 'uppercase' }}
                >
                    {t('project.editTitle')}
                    <Divider />
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8} lg={9}>
                        <Card style={{ width: '100%' }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <CardHeader
                                        avatar={<Avatar aria-label="recipe">C</Avatar>}
                                        title={t('project.progress.title')}
                                        subheader={new Date().toLocaleDateString()}
                                    />
                                    <CardContent>
                                        <Box
                                            component="form"
                                            sx={{
                                                '& > :not(style)': { m: 1 },
                                            }}
                                            noValidate
                                            autoComplete="off"
                                        >
                                            <div className="row justify-center m-1">
                                                <div className="col-12 col-sm-6 d-block p-1">
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-amount"
                                                    >
                                                        {t('project.register.name')}
                                                    </InputLabel>
                                                    <TextField
                                                        size="small"
                                                        value={projectData.project.projectName}
                                                        fullWidth
                                                        required
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                        }}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-6 d-block p-1">
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-amount"
                                                    >
                                                        {t('project.register.comment')}
                                                    </InputLabel>
                                                    <TextField
                                                        size="small"
                                                        value={projectData.project.comment}
                                                        fullWidth
                                                        required
                                                        id="outlined-required"
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                        }}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-center m-1">
                                                <div className="col-12 col-sm-6 d-block p-1">
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-amount"
                                                    >
                                                        {t('project.register.description')}
                                                    </InputLabel>
                                                    <TextField
                                                        size="small"
                                                        value={projectData.project.description}
                                                        fullWidth
                                                        required
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                        }}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-6 p-1" style={{ padding: 0 }}>
                                                    <InputLabel
                                                        htmlFor="outlined-adornment-amount"
                                                    >
                                                        {t('project.edit.updateDate')}
                                                    </InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                            '& input': { padding: '8.5px 14px' },
                                                        }}
                                                        value={projectData.project.updateDate}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-center m-1">
                                                <div className="col-12 col-sm-6 d-block p-1">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        {t('project.register.status')}
                                                    </InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                            '& input': { padding: '8.5px 14px' },
                                                        }}
                                                        value={projectData.project.status}
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-6 d-block p-1">
                                                    <InputLabel id="demo-simple-select-outlined-label">
                                                        {t('project.register.type')}
                                                    </InputLabel>
                                                    <TextField
                                                        fullWidth
                                                        sx={{
                                                            mt: 1,
                                                            mb: 1,
                                                            '& legend': { display: 'none' },
                                                            '& fieldset': { top: 0 },
                                                            '& input': { padding: '8.5px 14px' },
                                                        }}
                                                        value={projectData.project.projectType}
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row justify-center m-1">
                                                <div className="col-12 col-sm-6 d-block p-1 mt-3">
                                                    <div className="row justify-center m-1">
                                                        <div className="col-12 col-md-6 d-block">
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend">
                                                                    {t('project.register.notificationFlag')}
                                                                </FormLabel>
                                                                <RadioGroup
                                                                    row
                                                                    aria-label="notificationFlag"
                                                                    name="notificationFlag"
                                                                    value={projectData.project.notificationFlag}
                                                                    defaultValue="1"
                                                                >
                                                                    <FormControlLabel
                                                                        value="true"
                                                                        control={<Radio color="primary" />}
                                                                        label={t('radio.accept')}
                                                                        disabled
                                                                    />
                                                                    <FormControlLabel
                                                                        value="false"
                                                                        control={<Radio color="primary" />}
                                                                        label={t('radio.deny')}
                                                                        disabled
                                                                    />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                        <div className="col-12 col-md-6 d-block">
                                                            <FormControl component="fieldset">
                                                                <FormLabel component="legend">
                                                                    {t('project.register.isPaid')}
                                                                </FormLabel>
                                                                <RadioGroup
                                                                    row
                                                                    aria-label="isPaid"
                                                                    name="isPaid"
                                                                    value={projectData.project.isPaid}
                                                                    defaultValue="1"
                                                                >
                                                                    <FormControlLabel
                                                                        value="true"
                                                                        control={<Radio color="primary" />}
                                                                        label={t('radio.paid')}
                                                                        disabled
                                                                    />
                                                                    <FormControlLabel
                                                                        value="false"
                                                                        control={<Radio color="primary" />}
                                                                        label={t('radio.unPaid')}
                                                                        disabled
                                                                    />
                                                                </RadioGroup>
                                                            </FormControl>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </Box>
                                    </CardContent>
                                </Grid>
                            </Grid>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4} lg={3}>
                        <Card style={{ width: '100%' }}>
                            <Typography
                                variant="h6"
                                className="p-2"
                                color="textSecondary"
                                gutterBottom
                                sx={{ textTransform: 'uppercase', textAlign: 'center', margin: 0 }}
                            >
                                {t('project.progress.title')}
                            </Typography>
                            <Divider />
                            <List>
                                {progressTmp.map((text: string, index: number) => (
                                    <ListItem key={index} disablePadding>
                                        <ListItemButton onClick={toggleDrawerProgress(true)}>
                                            <ListItemText primary={text} />
                                        </ListItemButton>
                                    </ListItem>
                                ))}
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            </form>

            <Progress isOpen={isOpenDrawerProgress} setIsOpen={toggleDrawerProgress} />
        </div>
    );
}
