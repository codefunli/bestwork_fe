import { useState } from 'react';
import LocalSeeIcon from '@mui/icons-material/LocalSee';
import './file-upload.scss';

export default function FileUpload(props: any) {
    const { defaultImage, callbackFunc } = props;
    const [imagePreview, setImagePreview] = useState(defaultImage);

    const onChangeImage = (event: any) => {
        if (event.target.files[0]) {
            const reader: any = new FileReader();
            reader.addEventListener("load", () => {
                setImagePreview(reader.result);
            });
            reader.readAsDataURL(event.target.files[0]);
            callbackFunc(event);
        }
    };

    return (
        <div>
            <label htmlFor="chosen-image" className="file-upload">
                <img
                    alt={imagePreview}
                    src={imagePreview}
                />
                <span>
                    <LocalSeeIcon />
                </span>
            </label>
            <input
                accept="image/*"
                id="chosen-image"
                type="file"
                hidden
                onChange={onChangeImage}
            />
        </div>
    );
};
