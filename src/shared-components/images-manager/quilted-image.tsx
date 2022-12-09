import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardHeader, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { arrayBufferToBase64, prefixPdf, renderFile } from '../../core/constants/common';
import { getPdfFile } from '../../services/awb-service';
import { PermissionContext } from '../../ui/awb/awb-list';
import PreviewPDF from '../modal/view-pdf-modal';
import './image-manager.scss';

export default function QuiltedImage(props: {
    images: any[];
    callBackFn: Function;
    isOpenModal: boolean;
    isFile: boolean;
    isFilePreview: boolean;
    invoicePostId: number;
    isImageBefore: boolean;
}) {
    const [addNumberLabel, setAddNumberLabel] = useState(0);
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [base64Url, setBase64Url] = useState('');
    const permission = useContext<any>(PermissionContext);
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

    useEffect(() => {
        if (props.images) {
            let addNumberLabel = props.images.length - 9;
            if (addNumberLabel < 99) {
                setAddNumberLabel(addNumberLabel);
            } else {
                setAddNumberLabel(99);
            }
        }
    }, [props.images]);

    const handleDeleteImage = (index: number) => {
        props.callBackFn(index);
    };

    const handleAddFile = (item: any) => {
        const convertData = {
            fileId: [item.fileId],
        };
        props.callBackFn(convertData);
    };

    const handlePreviewPDF = (item: any) => {
        const convertData = {
            invoicePostId: props.invoicePostId,
            fileId: item.fileId,
        };
        setIsOpen(true);
        getPdfFile(convertData).then((res: any) => {
            setBase64Url(`${prefixPdf},${arrayBufferToBase64(res)}`);
        });
    };

    return (
        <div className="image-manager-wrapper">
            <ImageList className="image-list-scroll" cols={props.isFilePreview ? 5 : 3} rowHeight={164}>
                {props.images &&
                    props.images.map((item, index) => {
                        if (index < 9) {
                            return props.isFile ? (
                                props.isFilePreview ? (
                                    <ImageListItem sx={{ height: '100% !important' }}>
                                        <Card>
                                            <CardHeader
                                                sx={{ padding: 0.5 }}
                                                className={`card-img-overlay img-item`}
                                                action={
                                                    <Tooltip title={t('tooltip.remove')} placement="top">
                                                        <IconButton
                                                            aria-label="settings"
                                                            color="primary"
                                                            onClick={() => handleAddFile(item)}
                                                            disabled={!permission?.canEdit}
                                                        >
                                                            <RemoveCircleIcon color="error" />
                                                        </IconButton>
                                                    </Tooltip>
                                                }
                                            />
                                            {renderFile(item, index)}
                                        </Card>
                                        <span className="text-center">
                                            {item.name} {item.type}
                                        </span>
                                    </ImageListItem>
                                ) : item.type === 'pdf' ? (
                                    <ImageListItem>
                                        <Card>
                                            <CardHeader
                                                sx={{ padding: 0.5 }}
                                                className={`card-img-overlay img-item ${
                                                    item.isChoosen ? 'border border-2 border-danger rounded-3' : ''
                                                }`}
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
                                                                            ? () => handleAddFile(item)
                                                                            : () => {}
                                                                    }
                                                                    disabled={!permission?.canEdit}
                                                                >
                                                                    <ListItemIcon>
                                                                        <AddCircleIcon fontSize="small" />
                                                                    </ListItemIcon>
                                                                    {t('button.btnAdd')}
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
                                        <span className="text-center">{item.name}</span>
                                    </ImageListItem>
                                ) : (
                                    <ImageListItem>
                                        <Card>
                                            <CardHeader
                                                sx={{ padding: 0.5 }}
                                                className={`card-img-overlay img-item ${
                                                    item.isChoosen ? 'border border-2 border-danger rounded-3' : ''
                                                }`}
                                                action={
                                                    permission?.canEdit ? (
                                                        <IconButton
                                                            aria-label="settings"
                                                            color="primary"
                                                            onClick={() => handleAddFile(item)}
                                                            disabled={item.isChoosen || !permission?.canEdit}
                                                        >
                                                            {item.isChoosen ? (
                                                                <CheckCircleIcon
                                                                    color="primary"
                                                                    className="opacity-100"
                                                                />
                                                            ) : (
                                                                <Tooltip title={t('tooltip.add')} placement="top">
                                                                    <AddCircleIcon color="primary" />
                                                                </Tooltip>
                                                            )}
                                                        </IconButton>
                                                    ) : (
                                                        <React.Fragment></React.Fragment>
                                                    )
                                                }
                                            />
                                            {renderFile(item, index)}
                                        </Card>
                                        <span className="text-center">{item.name}</span>
                                    </ImageListItem>
                                )
                            ) : (
                                <ImageListItem>
                                    <Card>
                                        <CardHeader sx={{ padding: 0.5 }} className="card-img-overlay img-item" />
                                        {renderFile(item, index)}
                                    </Card>
                                </ImageListItem>
                            );
                        }
                    })}
            </ImageList>
            {addNumberLabel > 0 && (
                <div className="number-add-label">
                    <h3>{`${addNumberLabel}+`}</h3>
                </div>
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
