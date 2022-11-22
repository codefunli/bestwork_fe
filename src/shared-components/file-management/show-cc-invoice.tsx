import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Card, CardHeader, IconButton, ImageList, ImageListItem } from '@mui/material';
import { useState } from 'react';
import { arrayBufferToBase64, prefixPdf, renderFile } from '../../core/constants/common';
import { getPdfFile } from '../../services/awb-service';
import '../images-manager/image-manager.scss';
import PreviewPDF from '../modal/view-pdf-modal';

export default function ShowCustomsClearanceInvoice(props: { callBackFn: Function; customsDeclaration: any }) {
    const { customsDeclaration, callBackFn } = props;
    const [base64Url, setBase64Url] = useState('');
    const [isOpen, setIsOpen] = useState(false);

    const handleRemoveCDFile = (item: any) => {
        const convertData = {
            postType: 'invoice',
            toStatus: false,
            postId: item.postInvoiceId,
            fileId: [item.fileId],
        };
        callBackFn(convertData);
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
            <ImageList className="image-list-scroll" cols={5} rowHeight={164}>
                {customsDeclaration &&
                    customsDeclaration.invoicesDoc &&
                    customsDeclaration.invoicesDoc.length > 0 &&
                    customsDeclaration.invoicesDoc.map((item: any, index: number) => {
                        return item.type === 'pdf' ? (
                            <ImageListItem className="m-1">
                                <button className="border-0 bg-white " onClick={() => handlePreviewPDF(item)}>
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
                                </button>
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
                            <ImageListItem className="m-1">
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
