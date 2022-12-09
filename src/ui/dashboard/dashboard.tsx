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
import { useEffect, useState } from 'react';
import { countAwb, countCompany, countConstruction, countProject, getAwbStatusData } from '../../services/dashboard-service';

export default function DashBoard() {
    const { t } = useTranslation();
    const theme = useTheme();
    const [awbCount, setAwbCount] = useState<any>();
    const [companyCount, setCompanyCount] = useState<any>();
    const [constructionCount, setConstructionCount] = useState<any>();
    const [projectCount, setProjectCount] = useState<any>();
    const [labelPieChart, setLabelPieChart] = useState<any>();
    useEffect(() => {
        fetchAll().then((data: any) => {
            setAwbCount(data[0].data);
            setCompanyCount(data[1].data);
            setConstructionCount(data[2].data);
            setProjectCount(data[3].data);
            
        })
        getAwbStatusData().then((result: any) => {
            if (result && result.data) {
                const tmp = Object.keys(result.data).map((key) => String(key));
                setLabelPieChart(tmp.map((target: any) => t(target)))
            } 
        });
    }, []);

    const fetchAll = async () => {
        return await Promise.all([
            fetchCountAwb(),
            fetchCountCompany(),
            fetchCountConstruction(),
            fetchCountProject()
        ])
    }

    const fetchCountAwb = async () => {
        return await countAwb();
    }

    const fetchCountCompany = async () => {
        return await countCompany();
    }

    const fetchCountConstruction = async () => {
        return await countConstruction();
    }

    const fetchCountProject = async () => {
        return await countProject();
    }
    
    const cardList = [
        {
            value: companyCount,
            title: t('dashBoard.company'),
            color: theme.palette.primary.main,
            Icon: PeopleAltOutlinedIcon,
        },
        {
            value: constructionCount,
            title: t('dashBoard.construction'),
            Icon: HandymanOutlinedIcon,
            color: theme.palette.primary.main,
        },
        {
            value: projectCount,
            title: t('dashBoard.project'),
            Icon: BusinessCenterOutlinedIcon,
            color: theme.palette.primary.main,
        },
        {
            value: awbCount,
            title: t('dashBoard.awb'),
            Icon: HomeWorkOutlinedIcon,
            color: theme.palette.primary.main,
        },
    ];

    const labels = [
        t('month.jan'),
        t('month.feb'),
        t('month.mar'),
        t('month.apr'),
        t('month.may'),
        t('month.jun'),
        t('month.jul'),
        t('month.aug'),
        t('month.sep'),
        t('month.oct'),
        t('month.nov'),
        t('month.dec'),
    ]

    return (
        <Box pt={2} pb={4}>
            <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                {cardList.map((card, index) => (
                    <Grid item lg={3} xs={6} key={index}>
                        <DashCard title={card.title} value={card.value} color={card.color} Icon={card.Icon} />
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={4} pt={4}>
                <Grid item lg={8} md={8} xs={12}>
                    <TotalProject labels={labels} />
                </Grid>
                <Grid item lg={4} md={4} xs={12}>
                    <AnalyticsAwb  labels={labelPieChart}/>
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
