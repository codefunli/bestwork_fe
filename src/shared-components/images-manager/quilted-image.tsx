import { ImageList, ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import './image-manager.scss';

export default function QuiltedImage(props: { images: any[] }) {
    const [addNumberLabel, setAddNumberLabel] = useState(0);

    useEffect(() => {
        let addNumberLabel = props.images.length - 8;
        if (addNumberLabel < 99) {
            setAddNumberLabel(addNumberLabel);
        } else {
            setAddNumberLabel(99);
        }
    }, [props.images]);

    return (
        <div className="image-manager-wrapper">
            <ImageList className="image-list-scroll" cols={3} rowHeight={164}>
                {props.images.map((item, index) => {
                    if (index < 9) {
                        return (
                            <ImageListItem key={index}>
                                <img
                                    src={`${item}?w=164&h=164&fit=crop&auto=format`}
                                    srcSet={`${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                    //alt={item.title}
                                    loading="lazy"
                                />
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
