import { Box, Grid, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AnalyticsAwb } from './analystic-awb';
import DashCard from './dash-card';
import TotalProject from './total-project';
import './dashboard.scss';
import { RecentProgress } from './recent-progress';
import { TopLocation } from './top-location';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import BusinessCenterOutlinedIcon from '@mui/icons-material/BusinessCenterOutlined';
import HomeWorkOutlinedIcon from '@mui/icons-material/HomeWorkOutlined';

export default function DashBoard() {
    const { t } = useTranslation();
    const theme = useTheme();

    const cardList = [
        {
            price: 574,
            title: 'Users',
            color: theme.palette.primary.main,
            Icon: PeopleAltOutlinedIcon,
        },
        {
            price: 521,
            title: 'Constructions',
            Icon: HandymanOutlinedIcon,
            color: theme.palette.primary.main,
        },
        {
            price: 684,
            Icon: BusinessCenterOutlinedIcon,
            title: 'Companies',
            color: theme.palette.primary.main,
        },
        {
            price: 321,
            Icon: HomeWorkOutlinedIcon,
            title: 'Projects',
            color: theme.palette.primary.main,
        },
    ];

    return (
        <Box pt={2} pb={4}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {cardList.map((card, index) => (
                    <Grid item lg={3} xs={6} key={index}>
                        <DashCard title={card.title} value={card.price} color={card.color} Icon={card.Icon} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4} pt={4}>
                <Grid item lg={8} md={8} xs={12}>
                    <TotalProject />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <AnalyticsAwb />
                </Grid>

                <Grid item lg={4} md={4} xs={12}>
                    <TopLocation />
                </Grid>
                <Grid item lg={8} md={8} xs={12}>
                    <RecentProgress />
                </Grid>

                <Grid item xs={12}></Grid>
            </Grid>
        </Box>
    );
}
