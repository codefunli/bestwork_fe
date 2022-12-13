import { alpha, Box, Card, Icon, styled } from '@mui/material';
import { useTranslation } from 'react-i18next';
interface CardProps {
    Icon: any;
    title: string;
    color: string;
    value: number;
}
export default function DashCard(card: CardProps) {
    const { Icon, title, color, value } = card;
    const { t } = useTranslation();
    const StyledCard = styled(Card)(({ theme }) => ({
        padding: '2rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        height: '100%',
        [theme.breakpoints.down('sm')]: {
            padding: '1.5rem',
            flexDirection: 'column',
            justifyContent: 'center',
            '& .MuiBox-root': {
                marginRight: 0,
                textAlign: 'center',
            },
        },
    }));

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
        <StyledCard>
            <Box
                sx={{
                    width: 60,
                    height: 60,
                    marginRight: 2,
                    display: 'flex',
                    borderRadius: '70%',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: alpha(color, 0.2),
                }}
            >
                <Icon sx={{ color }} />
            </Box>
            <Box mt={{ xs: '1rem', sm: 0 }}>
                <h5 color="text.disabled">{title}</h5>
                <h3>{value ? String(handleLargeValue(value)) : 0}</h3>
            </Box>
        </StyledCard>
    );
}
