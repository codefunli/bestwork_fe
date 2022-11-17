import { Card, CardHeader, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { renderFile, renderImage } from '../../core/constants/common';
import './image-manager.scss';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useTranslation } from 'react-i18next';

export default function QuiltedImage(props: {
    images: any[];
    callBackFn: Function;
    isOpenModal: boolean;
    isFile: boolean;
    isFilePreview: boolean;
}) {
    const [addNumberLabel, setAddNumberLabel] = useState(0);
    const { t } = useTranslation();

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

    const handleAddFile = (item: number) => {
        console.log(item);
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
        </div>
    );
}
