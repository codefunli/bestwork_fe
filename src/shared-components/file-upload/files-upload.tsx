import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useEffect, useState } from 'react';
import './file-upload.scss';

interface FilesUpLoad {
    defaultImages: string[];
    callbackFunc: Function;
    closeModal: boolean;
    updateImage: string[];
}

export default function FilesUpload(props: FilesUpLoad) {
    const { defaultImages, callbackFunc, closeModal, updateImage } = props;
    const [imagesPreview, setImagesPreview] = useState(defaultImages);

    useEffect(() => {
        setImagesPreview(updateImage);
    }, [updateImage]);

    const onChangeImage = (event: any) => {
        const arr: any = [];

        for (let index = 0; index < event.target.files.length; index++) {
            if (event.target.files[index]) {
                const reader: any = new FileReader();
                reader.addEventListener('load', () => {
                    arr.push(reader.result);
                    setImagesPreview([...imagesPreview, ...arr]);
                });
                reader.readAsDataURL(event.target.files[index]);
            }
        }
    };

    useEffect(() => {
        setImagesPreview([]);
    }, [closeModal == false]);

    useEffect(() => {
        callbackFunc(imagesPreview);
    }, [imagesPreview]);

    return (
        <div>
            <label htmlFor="chosen-image" className="btn btn-outline-primary">
                <CameraAltIcon />
            </label>
            <input accept="image/*" id="chosen-image" multiple={true} type="file" hidden onChange={onChangeImage} />
        </div>
    );
}
