import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { Card, CardHeader, IconButton, ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import './image-manager.scss';

export default function QuiltedImage(props: { images: any[]; callBackFn: Function; isOpenModal: boolean }) {
    const [addNumberLabel, setAddNumberLabel] = useState(0);

    useEffect(() => {
        let addNumberLabel = props.images.length - 9;
        if (addNumberLabel < 99) {
            setAddNumberLabel(addNumberLabel);
        } else {
            setAddNumberLabel(99);
        }
    }, [props.images]);

    const handleDeleteImage = (index: number) => {
        props.callBackFn(index);
    };

    return (
        <div className="image-manager-wrapper">
            <ImageList className="image-list-scroll" cols={3} rowHeight={164}>
                {props.images.map((item, index) => {
                    if (index < 9) {
                        return (
                            <ImageListItem>
                                <Card>
                                    {props.isOpenModal && (
                                        <CardHeader
                                            sx={{ padding: 0.5 }}
                                            className="card-img-overlay"
                                            action={
                                                <IconButton
                                                    aria-label="settings"
                                                    color="error"
                                                    onClick={() => handleDeleteImage(index)}
                                                >
                                                    <HighlightOffIcon />
                                                </IconButton>
                                            }
                                        />
                                    )}
                                    <img src={item.data} alt={item.data} loading="lazy" className="imgTag" />
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
