import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Card, CardHeader, IconButton, ImageList, ImageListItem, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AWB_LOADING, renderFile } from '../../core/constants/common';
import '../images-manager/image-manager.scss';
import Loading from '../loading-page/Loading';

export default function ShowCustomsClearancePackingList(props: {
    callBackFn: Function;
    customsDeclaration: any;
    isLoading: string;
}) {
    const { customsDeclaration, callBackFn, isLoading } = props;
    const handleRemoveCDFile = (item: any) => {
        const convertData = {
            postType: 'package',
            toStatus: false,
            postId: item.postPackageId,
            fileId: [item.fileId],
        };

        callBackFn(convertData);
    };
    const { t } = useTranslation();

    return (
        <div className="image-manager-wrapper">
            {isLoading === AWB_LOADING.HAS_DATA ? (
                <ImageList className="image-list-scroll" cols={5} rowHeight={164}>
                    {customsDeclaration &&
                        customsDeclaration.packagesDoc &&
                        customsDeclaration.packagesDoc.length > 0 &&
                        customsDeclaration.packagesDoc.map((item: any, index: number) => {
                            return (
                                <ImageListItem className="m-1" key={item.postPackageId}>
                                    <Card>
                                        <CardHeader
                                            sx={{ padding: 0.5 }}
                                            className={`card-img-overlay img-item`}
                                            action={
                                                <IconButton
                                                    aria-label="settings"
                                                    color="primary"
                                                    onClick={() => handleRemoveCDFile(item)}
                                                >
                                                    <RemoveCircleIcon color="primary" />
                                                </IconButton>
                                            }
                                        />
                                        {renderFile(item, index)}
                                    </Card>
                                    <span
                                        className="text-center card-img-overlay"
                                        style={{
                                            top: 140,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {item.name}
                                    </span>
                                </ImageListItem>
                            );
                        })}
                </ImageList>
            ) : (
                isLoading === AWB_LOADING.LOADING && <Loading />
            )}
        </div>
    );
}
