import { useEffect, useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import './file-upload.scss';

export default function MultipleFileUpload(props: any) {
    const { clearPreview, callbackFunc, imgData } = props;
    const [images, setImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>((imgData && imgData.length > 0) ? imgData : []);

    const onChangeImage = (event: any) => {
        setImages([...event.target.files]);
    };

    useEffect(() => {
        if (imgData && imgData.length > 0) setImagePreviews(imgData);
    }, [imgData]);

    useEffect(() => {
        if (clearPreview) setImagePreviews([]);
    }, [clearPreview]);

    useEffect(() => {
        if (images.length < 1) return;
        const newImageUrls: any = [];
        // images.forEach((image: any) => newImageUrls.push(URL.createObjectURL(image)));
        // setImagePreviews(imagePreviews.concat(newImageUrls));
        // callbackFunc(imagePreviews.concat(newImageUrls));
        for (let index = 0; index < images.length; index++) {
            if (images[index]) {
                const reader: any = new FileReader();
                reader.addEventListener('load', () => {
                    newImageUrls.push(reader.result);
                    setImagePreviews([...imagePreviews, ...newImageUrls]);
                    callbackFunc([...imagePreviews, ...newImageUrls]);
                });
                reader.readAsDataURL(images[index]);
            }
        }
    }, [images]);

    const removeImageItem = (index: number) => {
        let ImgPreviewTmp = JSON.parse(JSON.stringify(imagePreviews));
        ImgPreviewTmp.splice(index, 1);
        setImagePreviews(ImgPreviewTmp);
        callbackFunc(ImgPreviewTmp);
    };

    return (
        <div className="multiple-file-upload">
            <div className="image-area">
                <label htmlFor="chosen-image" className={`${imagePreviews.length > 0 ? 'label-selector-fixed' : 'label-selector'} `}>
                    <AddPhotoAlternateIcon />
                </label>
                <div className="row image-list">
                    {(imagePreviews && imagePreviews.length) > 0 && imagePreviews.reverse().map((image, index) => (
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
                multiple
                hidden
                onChange={onChangeImage}
            />
        </div >
    );
};
