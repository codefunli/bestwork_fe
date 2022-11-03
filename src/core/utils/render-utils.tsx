import { Item } from '../constants/common';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ApartmentIcon from '@mui/icons-material/Apartment';
import PeopleIcon from '@mui/icons-material/People';
import SourceIcon from '@mui/icons-material/Source';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';

export const renderIconLeftBar = (iconNm: string) => {
    switch (iconNm) {
        case Item.ICON_NM.ICON_DASHBOARD_NM_BAR:
            return <DashboardIcon />;
        case Item.ICON_NM.ICON_COM_NM_BAR:
            return <ApartmentIcon />;
        case Item.ICON_NM.ICON_USER_NM_BAR:
            return <PeopleIcon />;
        case Item.ICON_NM.ICON_PRJ_NM_BAR:
            return <SourceIcon />;
        case Item.ICON_NM.ICON_ROLE_NM_BAR:
            return <AssignmentIndIcon />;
        default:
            break;
    }
};
