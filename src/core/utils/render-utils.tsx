import { Item } from '../constants/common';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SourceIcon from '@mui/icons-material/Source';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const renderIconLeftBar = (iconNm: string) => {
    switch (iconNm) {
        case Item.ICON_NM.ICON_DASHBOARD_NM_BAR:
            return <DashboardIcon color="primary" />;
        case Item.ICON_NM.ICON_COM_NM_BAR:
            return <ApartmentIcon color="primary" />;
        case Item.ICON_NM.ICON_USER_NM_BAR:
            return <PeopleIcon color="primary" />;
        case Item.ICON_NM.ICON_PRJ_NM_BAR:
            return <SourceIcon color="primary" />;
        case Item.ICON_NM.ICON_ROLE_NM_BAR:
            return <AssignmentIndIcon color="primary" />;
        default:
            break;
    }
};
