import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardHeader, IconButton, ImageList, ImageListItem } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { arrayBufferToBase64, AWB_LOADING, prefixPdf, renderFile } from '../../core/constants/common';
import { getPdfFile } from '../../services/awb-service';
import { PermissionContext } from '../../ui/awb/awb-list';
import '../images-manager/image-manager.scss';
import Loading from '../loading-page/Loading';
import PreviewPDF from '../modal/view-pdf-modal';
export default function ShowCustomsClearanceImageBefore(props: {
    callBackFn: Function;
    customsDeclaration: any;
    isLoading: string;
}) {
    const { customsDeclaration, callBackFn, isLoading } = props;

    const handleRemoveCDFile = (item: any) => {
        const convertData = {
            postType: 'imageBefore',
            toStatus: false,
            postId: item.postImageBeforeId,
            fileId: [item.fileId],
        };

        callBackFn(convertData);
    };
    const { t } = useTranslation();
    const [base64Url, setBase64Url] = React.useState('');
    const [isOpen, setIsOpen] = React.useState(false);
    const permission = React.useContext<any>(PermissionContext);

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleOkFunction = () => {
        setIsOpen(false);
    };

    const handlePreviewPDF = (item: any) => {
        const convertData = {
            invoicePostId: item.postInvoiceId,
            fileId: item.fileId,
        };

        getPdfFile(convertData).then((res: any) => {
            setBase64Url(`${prefixPdf},${arrayBufferToBase64(res)}`);
            setIsOpen(true);
        });
    };

    return (
        <div className="image-manager-wrapper">
            {isLoading === AWB_LOADING.HAS_DATA ? (
                <ImageList className="image-list-scroll" cols={5} rowHeight={164}>
                    {customsDeclaration &&
                        customsDeclaration.imageBeforeDoc &&
                        customsDeclaration.imageBeforeDoc.length > 0 &&
                        customsDeclaration.imageBeforeDoc.map((item: any, index: number) => {
                            return item.type === 'pdf' ? (
                                <ImageListItem className="m-1" key={index}>
                                    <Card>
                                        <CardHeader
                                            sx={{ padding: 0.5 }}
                                            className={`card-img-overlay img-item`}
                                            action={
                                                <React.Fragment>
                                                    <IconButton
                                                        onClick={handleClick}
                                                        aria-label="settings"
                                                        color="primary"
                                                        size="large"
                                                    >
                                                        <MoreVertIcon color="primary" fontSize="inherit" />
                                                    </IconButton>
                                                    <Menu
                                                        anchorEl={anchorEl}
                                                        id="account-menu"
                                                        open={open}
                                                        onClose={handleClose}
                                                        onClick={handleClose}
                                                        PaperProps={{
                                                            elevation: 0,
                                                            sx: {
                                                                overflow: 'visible',
                                                                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                                                mt: 1.5,
                                                                '& .MuiAvatar-root': {
                                                                    width: 32,
                                                                    height: 32,
                                                                    ml: -0.5,
                                                                    mr: 1,
                                                                },
                                                                '&:before': {
                                                                    content: '""',
                                                                    display: 'block',
                                                                    position: 'absolute',
                                                                    top: 0,
                                                                    right: 14,
                                                                    width: 10,
                                                                    height: 10,
                                                                    bgcolor: 'background.paper',
                                                                    transform: 'translateY(-50%) rotate(45deg)',
                                                                    zIndex: 0,
                                                                },
                                                            },
                                                        }}
                                                        transformOrigin={{
                                                            horizontal: 'right',
                                                            vertical: 'top',
                                                        }}
                                                        anchorOrigin={{
                                                            horizontal: 'right',
                                                            vertical: 'bottom',
                                                        }}
                                                    >
                                                        {!item.isChoosen && permission?.canEdit && (
                                                            <MenuItem
                                                                onClick={
                                                                    permission?.canEdit
                                                                        ? () => handleRemoveCDFile(item)
                                                                        : () => {}
                                                                }
                                                            >
                                                                <ListItemIcon>
                                                                    <RemoveCircleIcon fontSize="small" />
                                                                </ListItemIcon>
                                                                {t('button.btnRemove')}
                                                            </MenuItem>
                                                        )}
                                                        <MenuItem onClick={() => handlePreviewPDF(item)}>
                                                            <ListItemIcon>
                                                                <VisibilityIcon fontSize="small" />
                                                            </ListItemIcon>
                                                            {t('button.btnPreview')}
                                                        </MenuItem>
                                                    </Menu>
                                                </React.Fragment>
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
                            ) : (
                                <ImageListItem className="m-1" key={index}>
                                    <Card>
                                        <CardHeader
                                            sx={{ padding: 0.5 }}
                                            className={`card-img-overlay img-item`}
                                            action={
                                                permission?.canEdit ? (
                                                    <IconButton
                                                        aria-label="settings"
                                                        color="primary"
                                                        onClick={(e) => handleRemoveCDFile(item)}
                                                    >
                                                        <RemoveCircleIcon color="primary" />
                                                    </IconButton>
                                                ) : (
                                                    <React.Fragment></React.Fragment>
                                                )
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
            <PreviewPDF
                base64Url={base64Url}
                title={t('title.previewPdf')}
                isOpen={isOpen}
                closeFunc={handleCloseModal}
                okFunc={handleOkFunction}
                noBtn=""
                okBtn=""
            />
        </div>
    );
}
