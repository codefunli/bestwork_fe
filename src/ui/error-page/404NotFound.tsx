import { Button, IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import OtherHousesIcon from '@mui/icons-material/OtherHouses';
import './error.scss';
import { useNavigate } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';

export default function Page404NotFound() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate(UrlFeApp.LOGIN_URL);
    };

    return (
        <div className="text-center">
            <div className="bg-page-not-found"></div>
            <IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleGoHome}>
                <OtherHousesIcon fontSize="large" />
            </IconButton>
        </div>
    );
}
