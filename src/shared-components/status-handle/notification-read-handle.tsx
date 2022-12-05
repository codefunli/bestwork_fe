import { Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

interface Props {
    statusId: string;
}

const HandleNotificationRead = (props: Props) => {
    const { statusId } = props;
    const { t } = useTranslation();

    const handleNotificationRead = () => {
        switch (statusId) {
            case 'false':
                return (
                    <Chip
                        label={t('common.unRead')}
                        size="small"
                        className="btn btn-outline-secondary"
                        icon={<CloseIcon />}
                    />
                );
            case 'true':
                return (
                    <Chip
                        sx={{ backgroundColor: green[400] }}
                        className="btn btn-outline-success"
                        label={t('common.read')}
                        size="small"
                        icon={<CheckIcon color="success" />}
                    />
                );
            default:
                return <></>;
        }
    };

    return <div>{handleNotificationRead()}</div>;
};

export default HandleNotificationRead;
