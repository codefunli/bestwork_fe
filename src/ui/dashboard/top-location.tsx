import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import {
    Avatar,
    Box,
    Button,
    Card,
    CardHeader,
    Divider,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { UrlFeApp } from '../../core/constants/common';
import { getTopLocation } from '../../services/dashboard-service';
export const productImages = [
    require('../../assets/1st.png'),
    require('../../assets/2nd.png'),
    require('../../assets/3rd.png'),
    require('../../assets/defaultMedal.png'),
    require('../../assets/defaultMedal.png'),
];

export function TopLocation() {
    const [data, setData] = useState<any>([]);
    const { t } = useTranslation();
    const nativgate = useNavigate();

    useEffect(() => {
        getTopLocation().then((result: any) => {
            if (result && result.data) {
                setData(result.data);
            }
        });
    }, []);

    const handleViewButton = (e: any) => {
        e.preventDefault();
        nativgate(`${UrlFeApp.CONSTRUCTION.SEARCH}`);
    };

    const handleLargeValue = (value: number) => {
        const nf = new Intl.NumberFormat();
        if (value && value >= 1000000) {
            let tempValue = value / 1000000;
            const result = tempValue.toLocaleString('en-US', { maximumFractionDigits: 1 });
            if (tempValue >= 1000) {
                const bilValue = (tempValue / 1000).toLocaleString('en-US', { maximumFractionDigits: 1 });
                return String(`${bilValue}${t('common.countBil')}`);
            }
            return String(`${result}${t('common.countMil')}`);
        }
        return nf.format(value);
    };

    return (
        <Card>
            <CardHeader title={t('dashBoard.topLocation')} />
            <Divider />
            <List>
                {data.map((item: any, index: number) => (
                    <ListItem divider={index < data.length - 1} key={index}>
                        <ListItemAvatar>
                            <Avatar alt={item.location} src={productImages[index]} sx={{ height: 47, width: 47 }} />
                        </ListItemAvatar>
                        <ListItemText primary={item.location} secondary={item.nationName} />
                        <ListItemText>
                            <Typography textAlign={'right'}>{handleLargeValue(Number(item.count))}</Typography>
                        </ListItemText>
                    </ListItem>
                ))}
            </List>
            <Divider />
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    p: 2,
                }}
            >
                <Button
                    color="primary"
                    endIcon={<ArrowRightIcon />}
                    size="small"
                    variant="text"
                    onClick={handleViewButton}
                >
                    {t('dashBoard.view')}
                </Button>
            </Box>
        </Card>
    );
}
