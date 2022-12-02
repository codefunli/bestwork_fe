import { Chip } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import { useTranslation } from 'react-i18next';

interface Props {
    statusId: string;
}

const HandleUserStatus = (props: Props) => {
    const { statusId } = props;
    const { t } = useTranslation();

    const handleStatus = () => {
        switch (statusId) {
            case 'false':
                return (
                    <Chip
                        label={t('common.disable')}
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
                        label={t('common.enable')}
                        size="small"
                        icon={<CheckIcon color="success" />}
                    />
                );
            default:
                return <></>;
        }
    };

    return <div>{handleStatus()}</div>;
};

export default HandleUserStatus;
