import ReportIcon from '@mui/icons-material/Report';
import { Button } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { UrlFeApp } from '../../core/constants/common';
import MLanguage from '../../shared-components/language/m-language';
import './error.scss';

export default function Page404NotFound() {
    const { t } = useTranslation();

    return (
        <div className="page-not-found">
            <MLanguage color="primary" />
            <div className="error-wrapper">
                <div className="error-box">
                    <h1>{t('error.pageNotFound.label')}</h1>
                    <h2 className="h2 mb-3">
                        <ReportIcon style={{ fontSize: '2em' }} />
                        {t('error.pageNotFound.msg_title')}
                    </h2>
                    <p className="h4 font-weight-normal"> {t('error.pageNotFound.msg_content')} </p>
                    <Button
                        variant="contained"
                        color="primary"
                        component={Link}
                        to={UrlFeApp.MAIN_APP}
                        sx={{ textTransform: 'uppercase', mt: 2 }}
                    >
                        {t('button.btnBackToHome')}
                    </Button>
                </div>
            </div>
        </div>
    );
}
