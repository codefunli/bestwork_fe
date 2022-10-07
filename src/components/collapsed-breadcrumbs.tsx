import {Breadcrumbs, Typography} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useLocation, Link} from 'react-router-dom';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { UrlFeApp } from '../core/constants/common';
import { useTranslation } from 'react-i18next';

const CollapsedBreadcrumbs = () => {
    const location = useLocation();
    const pathNames =location.pathname.split("/").filter(x => x).splice(1);
    const { t } = useTranslation();
    
    return (
        <div role="presentation" className='d-none d-lg-block'>
            <Stack spacing={2}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    {pathNames.length > 0 ? (
                        <Link to={UrlFeApp.DASH_BOARD} >{t('bread_crumbs.home')}</Link>
                    ) : (
                        <Typography >{t('bread_crumbs.home')}</Typography>
                    )}
                    {pathNames.map((name, index) => {
                        const routeTo = `${UrlFeApp.MAIN_APP}/${pathNames.slice(0, index + 1).join("/")}`;
                        console.log(routeTo);
                        
                        const isLast = index === pathNames.length -1;
                        return isLast ? (
                            <Typography color='white' key={name}> {t('bread_crumbs.' + `${name}` + '')} </Typography>
                        ) : (
                            
                            <Link key={name} to={routeTo}>{t('bread_crumbs.' + `${name}` + '')}</Link>
                        )
                    })}
                </Breadcrumbs>
            </Stack>
        </div>
    );
}
export default CollapsedBreadcrumbs;