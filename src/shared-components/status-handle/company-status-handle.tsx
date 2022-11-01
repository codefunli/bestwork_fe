import { Chip } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { green } from '@mui/material/colors';
import { useTranslation } from "react-i18next";

interface Props {
    statusId: string;
}

const HandleCompanyStatus = (props: Props) => {
    const { statusId } = props;
    const { t } = useTranslation();

    const handleStatus = () => {
        switch (statusId) {
            case '0':
                return <Chip
                    sx={{ backgroundColor: green[400] }}
                    className="btn btn-outline-success"
                    label={t('button.btnActive')}
                    size="small"
                    icon={<CheckIcon color="success" />}
                />;
            case '1':
                return <Chip
                    label={t('button.btnPending')}
                    size="small"
                    className="btn btn-outline-secondary"
                    icon={<CloseIcon />}
                />;
            default:
                return <></>;
        }
    };

    return (
        <div>
            {handleStatus()}
        </div>
    );
};

export default HandleCompanyStatus;