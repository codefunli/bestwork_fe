import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';

const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
});

export default function IconGuide() {
    const { t } = useTranslation();
    return (
        <Paper
            sx={{
                p: 2,
                margin: 'auto',
                maxWidth: 'auto',
                flexGrow: 1,
                backgroundColor: (theme) => (theme.palette.mode === 'dark' ? '#1A2027' : '#fff'),
            }}
        >
            <Grid container spacing={2}>
                <Grid item>
                    <Img alt="guide" src={require('../../assets/guide.png')} />
                </Grid>
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="subtitle1" component="div">
                                {t('create_screen.guide.title')}
                            </Typography>
                            <Typography variant="body2" gutterBottom>
                                {t('create_screen.guide.content')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}
