import { Chip } from '@mui/material';

interface Props {
    isSearch?: boolean;
    statusList: any;
    statusId: string;
}

const HandleConstructionStatus = (props: Props) => {
    const { isSearch, statusList, statusId } = props;

    const handleStatus = () => {
        let status: string = '';
        if (statusId) {
            statusList &&
                statusList.length > 0 &&
                statusList.forEach((value: any) => {
                    if (statusId.toString() === value.id.toString()) status = value.status;
                });
        }

        switch (statusId) {
            case '0':
                return <Chip label={status} color="secondary" className={`btn ${isSearch ? 'w-100' : ''}`} />;
            case '1':
                return <Chip label={status} color="primary" className={`btn ${isSearch ? 'w-100' : ''}`} />;
            case '2':
                return <Chip label={status} color="error" className={`btn ${isSearch ? 'w-100' : ''}`} />;
            case '3':
                return <Chip label={status} color="info" className={`btn ${isSearch ? 'w-100' : ''}`} />;
            case '4':
                return <Chip label={status} color="success" className={`btn ${isSearch ? 'w-100' : ''}`} />;
            default:
                return status;
        }
    };

    return <div className={`${isSearch ? 'w-100' : ''}`}>{handleStatus()}</div>;
};

export default HandleConstructionStatus;
