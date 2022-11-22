import { Button, Card, CardContent, CardHeader, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { arrayBufferToBase64, prefixPdf, renderFile, renderImage } from '../../core/constants/common';
import './image-manager.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTranslation } from 'react-i18next';
import PreviewPDF from '../modal/view-pdf-modal';
import { getPdfFile } from '../../services/awb-service';

export default function QuiltedImage(props: {
    images: any[];
    callBackFn: Function;
    isOpenModal: boolean;
    isFile: boolean;
    isFilePreview: boolean;
    invoicePostId: number;
}) {
    const [addNumberLabel, setAddNumberLabel] = useState(0);
    const { t } = useTranslation();

    const [isOpen, setIsOpen] = useState(false);
    const [base64Url, setBase64Url] = useState('');

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
        getPdfFile(convertData).then((res: any) => {
            setBase64Url(`${prefixPdf},${arrayBufferToBase64(res)}`);
            setIsOpen(true);
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
                                        <button
                                            className="border-0 bg-white d-flex align-items-center justify-content-center w-100"
                                            onClick={() => handlePreviewPDF(item)}
                                        >
                                            <Card>
                                                <CardHeader
                                                    sx={{ padding: 0.5 }}
                                                    className={`card-img-overlay img-item ${
                                                        item.isChoosen ? 'border border-2 border-danger rounded-3' : ''
                                                    }`}
                                                    action={
                                                        <IconButton
                                                            aria-label="settings"
                                                            color="primary"
                                                            onClick={() => handleAddFile(item)}
                                                            disabled={item.isChoosen}
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
                                                    }
                                                />
                                                {renderFile(item, index)}
                                            </Card>
                                        </button>
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
                                                    <IconButton
                                                        aria-label="settings"
                                                        color="primary"
                                                        onClick={() => handleAddFile(item)}
                                                        disabled={item.isChoosen}
                                                    >
                                                        {item.isChoosen ? (
                                                            <CheckCircleIcon color="primary" className="opacity-100" />
                                                        ) : (
                                                            <Tooltip title={t('tooltip.add')} placement="top">
                                                                <AddCircleIcon color="primary" />
                                                            </Tooltip>
                                                        )}
                                                    </IconButton>
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
                                        <CardHeader
                                            sx={{ padding: 0.5 }}
                                            className="card-img-overlay img-item"
                                            action={
                                                <IconButton
                                                    aria-label="settings"
                                                    color="primary"
                                                    onClick={() => handleDeleteImage(index)}
                                                >
                                                    <Tooltip title={t('tooltip.remove')} placement="top">
                                                        <RemoveCircleIcon />
                                                    </Tooltip>
                                                </IconButton>
                                            }
                                        />
                                        {renderImage(item, index)}
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
