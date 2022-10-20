import { useEffect, useRef, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './file-upload.scss';

export default function MultipleFileUpload(props: any) {
    const { clearPreview, callbackFunc } = props;
    const [images, setImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);

    const onChangeImage = (event: any) => {
        setImages([...event.target.files]);
    };

    useEffect(() => {
        setImagePreviews([]);
    }, [clearPreview]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls: any = [];
        images.forEach((image: any) => newImageUrls.push(URL.createObjectURL(image)));
        setImagePreviews(imagePreviews.concat(newImageUrls));

        callbackFunc(imagePreviews.concat(newImageUrls));
        if (inputRef.current !== null) {
            inputRef.current.value = '';
        }
    }, [images]);

    const removeImageItem = (index: number) => {
        let ImgPreviewTmp = JSON.parse(JSON.stringify(imagePreviews));
        ImgPreviewTmp.splice(index, 1);
        setImagePreviews(ImgPreviewTmp);

        callbackFunc(ImgPreviewTmp);
        if (inputRef.current !== null) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className="multiple-file-upload">
            <div className="image-area">
                <label htmlFor="chosen-image" className={`${imagePreviews.length > 0 ? 'label-selector-fixed' : 'label-selector'} `}>
                    <AddPhotoAlternateIcon />
                </label>
                <div className="row image-list">
                    {imagePreviews.length > 0 && imagePreviews.reverse().map((image, index) => (
                        <div className="col-6 col-lg-4 img-item">
                            <HighlightOffIcon onClick={() => removeImageItem(index)} />
                            <img src={image} alt={image} key={index} />
                        </div>
                    ))}
                </div>
            </div>
            <input
                accept="image/*"
                id="chosen-image"
                type="file"
                ref={inputRef}
                multiple
                hidden
                onChange={onChangeImage}
            />
        </div >
    );
};
