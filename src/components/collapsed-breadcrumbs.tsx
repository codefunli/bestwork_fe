import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Breadcrumbs, Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';
import { BreadcrumbReplaceList, UrlFeApp } from '../core/constants/common';

const CollapsedBreadcrumbs = () => {
    const { t } = useTranslation();
    const location = useLocation();
    const pathNameArr = location.pathname
        .split('/')
        .filter((x) => x)
        .splice(1);

    pathNameArr.forEach((path: string, index: number) => {
        BreadcrumbReplaceList.forEach((item: string) => {
            if (item === path) pathNameArr.splice(index, pathNameArr.length - 1);
        });
    });

    const lastChar = pathNameArr[pathNameArr.length - 1];
    const lastCharArr = lastChar ? lastChar.split('') : [];
    if (!isNaN(+lastChar)) pathNameArr.pop();
    if (!isNaN(+lastCharArr[lastCharArr.length - 1])) pathNameArr.pop();

    return (
        <div role="presentation" className="d-none d-lg-block">
            <Stack spacing={2}>
                <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                    {pathNameArr.length > 0 ? (
                        <Link to={UrlFeApp.DASH_BOARD}>{t('bread_crumbs.home')}</Link>
                    ) : (
                        <Typography>{t('bread_crumbs.home')}</Typography>
                    )}
                    {pathNameArr.map((name, index) => {
                        const routeTo = `${UrlFeApp.MAIN_APP}/${pathNameArr.slice(0, index + 1).join('/')}`;
                        const isLast = index === pathNameArr.length - 1;
                        return isLast ? (
                            <Typography color="white" key={name}>
                                {t(`bread_crumbs.${name}`)}
                            </Typography>
                        ) : (
                            <Link key={name} to={routeTo}>
                                {t(`bread_crumbs.${name}`)}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            </Stack>
        </div>
    );
};
export default CollapsedBreadcrumbs;
