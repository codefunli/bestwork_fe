import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect, useState } from 'react';
import {
    dataURLtoFile,
    downloadFile,
    fileToBase64,
    prefixPdf,
    renderBase64File,
    renderFile,
    renderImage,
} from '../../core/constants/common';
import './upload-file.scss';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import * as React from 'react';
import { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { getPdfFile } from '../../services/awb-service';
import { PermissionContext } from '../../ui/awb/awb-list';
import PreviewPDF from '../modal/view-pdf-modal';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Card, CardHeader, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import DownloadIcon from '@mui/icons-material/Download';
import { t } from 'i18next';

interface props {
    clearPreview?: any;
    callbackFunc: Function;
    imgData?: any;
    isEditUpload?: boolean;
    callBackClearEvent: Function;
}

export default function UploadMultipartFile(props: props) {
    const { clearPreview, callbackFunc, imgData, callBackClearEvent } = props;
    const [currentFiles, setCurrentFiles] = useState<any[]>([]);
    const [eventFile, setEventFile] = useState<any>();
    const [base64Url, setBase64Url] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<any>(null);
    const open = Boolean(anchorEl);
    const handleClick = (index: number, event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl({ [index]: event.currentTarget });
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
        if (imgData) {
            const temp = imgData.map((data: any) => {
                return renderBase64File(data);
            });
            setCurrentFiles([...temp]);
        }
    }, [imgData]);

    const onChangeImage = (event: any) => {
        if (currentFiles.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                const element = event.target.files[i];
                if (areEqual(currentFiles, element)) {
                    setCurrentFiles([...currentFiles, element]);
                }
            }
        } else {
            setCurrentFiles([...currentFiles, ...event.target.files]);
        }

        callBackClearEvent(event);
        setEventFile(event);
    };

    function areEqual(array1: any, newFile: any) {
        for (let i = 0; i < array1.length; i++) {
            const currentFile = array1[i];
            if (currentFile.lastModified === newFile.lastModified) return false;
        }
        return true;
    }

    useEffect(() => {
        if (clearPreview) setCurrentFiles([]);
    }, [clearPreview]);

    useEffect(() => {
        if (currentFiles.length < 1) return;
        callbackFunc(currentFiles);
    }, [currentFiles]);

    const removeImageItem = (index: number) => {
        let deleteFile = [...currentFiles];
        deleteFile.splice(index, 1);
        setCurrentFiles(() => deleteFile);
        eventFile.target.value = '';
    };

    const handleDownloadFile = (data: any) => {
        fileToBase64(data).then((result: any) => {
            downloadFile(result, data.name);
        });
    };

    const handlePreviewFilePDF = (data: any) => {
        setIsOpen(true);
        fileToBase64(data).then((result: any) => {
            setBase64Url(result);
        });
    };

    return (
        <div className="multiple-file-upload">
            <div className="image-area">
                <label
                    htmlFor="chosen-image"
                    className={`${currentFiles.length > 0 ? 'label-selector-fixed' : 'label-selector'} `}
                >
                    <UploadFileIcon />
                </label>
                <div className="row image-list">
                    {currentFiles &&
                        currentFiles.length > 0 &&
                        currentFiles.map((data: any, index: number) => {
                            return (
                                <div className="col-6 col-lg-4 img-item" key={index}>
                                    <MoreVertIcon
                                        color="primary"
                                        fontSize="large"
                                        id={`icon${index}`}
                                        onClick={(e: any) => handleClick(index, e)}
                                    />
                                    <Menu
                                        anchorEl={anchorEl && anchorEl[index]}
                                        id={`account-menu${index}`}
                                        open={Boolean(anchorEl && anchorEl[index])}
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
                                        <MenuItem onClick={() => handleDownloadFile(data)}>
                                            <ListItemIcon>
                                                <DownloadIcon fontSize="small" />
                                            </ListItemIcon>
                                            {t('button.btnDownload')}
                                        </MenuItem>
                                        <MenuItem onClick={() => removeImageItem(index)}>
                                            <ListItemIcon>
                                                <HighlightOffIcon fontSize="small" />
                                            </ListItemIcon>
                                            {t('button.btnRemove')}
                                        </MenuItem>
                                        {data.type === 'application/pdf' ||
                                            (data.type === 'pdf' && (
                                                <MenuItem onClick={() => handlePreviewFilePDF(data)}>
                                                    <ListItemIcon>
                                                        <VisibilityIcon fontSize="small" />
                                                    </ListItemIcon>
                                                    {t('button.btnPreview')}
                                                </MenuItem>
                                            ))}
                                    </Menu>
                                    <div>
                                        {renderFile(data, index)}
                                        <div>
                                            <p className="text-center">{data.name}</p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                </div>
            </div>
            <input
                accept=".xlsx,.xls,.pdf,image/*"
                id="chosen-image"
                type="file"
                multiple
                hidden
                onChange={onChangeImage}
            />
            <PreviewPDF
                base64Url={base64Url}
                title="Preview PDF"
                isOpen={isOpen}
                closeFunc={handleCloseModal}
                okFunc={handleOkFunction}
                noBtn=""
                okBtn=""
            />
        </div>
    );
}
