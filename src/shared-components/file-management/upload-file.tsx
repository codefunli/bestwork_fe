import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect, useState } from 'react';
import { renderImage } from '../../core/constants/common';
import './upload-file.scss';

interface props {
    clearPreview?: any;
    callbackFunc: Function;
    imgData?: any;
    isEditUpload?: boolean;
    callBackClearEvent: Function;
}

export default function UploadFile(props: props) {
    const { clearPreview, callbackFunc, imgData, callBackClearEvent } = props;
    const [currentFiles, setCurrentFiles] = useState<any[]>([]);
    const [imagePreviews, setImagePreviews] = useState<any>([]);

    const onChangeImage = (event: any) => {
        setCurrentFiles(() => {
            return [...event.target.files];
        });
        callBackClearEvent(event);
    };

    useEffect(() => {
        if (clearPreview) setImagePreviews([]);
    }, [clearPreview]);

    useEffect(() => {
        if (currentFiles.length < 1) return;
        const newImageUrls: any = [];
        for (let index = 0; index < currentFiles.length; index++) {
            if (currentFiles[index]) {
                const reader: any = new FileReader();
                reader.addEventListener('load', () => {
                    newImageUrls.push(reader.result);

                    setImagePreviews([
                        ...imagePreviews,
                        {
                            name: currentFiles[index].name,
                            file: reader.result,
                        },
                    ]);
                    callbackFunc([
                        ...imagePreviews,
                        {
                            name: currentFiles[index].name,
                            file: reader.result,
                        },
                    ]);
                });
                reader.readAsDataURL(currentFiles[index]);
            }
        }
    }, [currentFiles]);

    const removeImageItem = (index: number) => {
        const deleteImagePreview = imagePreviews;
        deleteImagePreview.splice(index, 1);
        setImagePreviews(deleteImagePreview);
        callbackFunc(deleteImagePreview);
    };

    return (
        <div className="multiple-file-upload">
            <div className="image-area">
                <label
                    htmlFor="chosen-image"
                    className={`${imagePreviews.length > 0 ? 'label-selector-fixed' : 'label-selector'} `}
                >
                    <UploadFileIcon />
                </label>
                <div className="row image-list">
                    {imagePreviews &&
                        imagePreviews.length > 0 &&
                        imagePreviews.reverse().map((data: any, index: number) => (
                            <div className="col-6 col-lg-4 img-item" key={index}>
                                <HighlightOffIcon onClick={() => removeImageItem(index)} />
                                <div>
                                    {renderImage(data, index)}
                                    <div>
                                        <p className="text-center">{data.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <input accept=".xls,.pdf" id="chosen-image" type="file" multiple hidden onChange={onChangeImage} />
        </div>
    );
}
