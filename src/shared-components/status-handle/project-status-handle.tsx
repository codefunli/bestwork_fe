import { Chip } from "@mui/material";

interface Props {
    statusList: any;
    statusId: string;
}

const HandleProjectStatus = (props: Props) => {
    const { statusList, statusId } = props;

    const handleStatus = () => {
        let status: string = '';
        if (statusId) {
            (statusList && statusList.length > 0) && statusList.forEach((value: any) => {
                if (statusId.toString() === value.id.toString()) status = value.status;
            });
        };

        switch (statusId) {
            case '0':
                return <Chip label={status} color="secondary" />;
            case '1':
                return <Chip label={status} color="primary" />;
            case '2':
                return <Chip label={status} color="success" />;
            case '3':
                return <Chip label={status} color="info" />;
            case '4':
                return <Chip label={status} color="error" />;
            case '5':
                return <Chip label={status} color="default" />;
            default:
                return status;
        }
    };

    return (
        <div>
            {handleStatus()}
        </div>
    );
};

export default HandleProjectStatus;