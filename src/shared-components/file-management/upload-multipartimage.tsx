import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useEffect, useState } from 'react';
import { renderFile } from '../../core/constants/common';
import './upload-file.scss';

interface props {
    clearPreview?: any;
    callbackFunc: Function;
    imgData?: any;
    isEditUpload?: boolean;
    callBackClearEvent: Function;
}

export default function UploadMultipartImage(props: props) {
    const { clearPreview, callbackFunc, imgData, callBackClearEvent } = props;
    const [currentFiles, setCurrentFiles] = useState<any[]>([]);
    const [eventFile, setEventFile] = useState<any>();

    const onChangeImage = (event: any) => {
        if (currentFiles.length > 0) {
            for (let i = 0; i < event.target.files.length; i++) {
                const element = event.target.files[i];
                if (areEqual(currentFiles, element)) {
                    setCurrentFiles([...currentFiles, element]);
                }
            }
        } else {
            setCurrentFiles([...currentFiles, ...event.target.files]);
        }

        callBackClearEvent(event);
        setEventFile(event);
    };

    function areEqual(array1: any, newFile: any) {
        for (let i = 0; i < array1.length; i++) {
            const currentFile = array1[i];
            if (currentFile.lastModified === newFile.lastModified) return false;
        }
        return true;
    }

    useEffect(() => {
        if (clearPreview) setCurrentFiles([]);
    }, [clearPreview]);

    useEffect(() => {
        if (currentFiles.length < 1) return;
        callbackFunc(currentFiles);
    }, [currentFiles]);

    const removeImageItem = (index: number) => {
        let deleteFile = [...currentFiles];
        deleteFile.splice(index, 1);
        setCurrentFiles(() => deleteFile);
        eventFile.target.value = '';
    };

    return (
        <div className="multiple-file-upload">
            <div className="image-area">
                <label
                    htmlFor="chosen-image"
                    className={`${currentFiles.length > 0 ? 'label-selector-fixed' : 'label-selector'} `}
                >
                    <UploadFileIcon />
                </label>
                <div className="row image-list">
                    {currentFiles &&
                        currentFiles.length > 0 &&
                        currentFiles.reverse().map((data: any, index: number) => (
                            <div className="col-6 col-lg-4 img-item" key={index}>
                                <HighlightOffIcon onClick={() => removeImageItem(index)} />
                                <div>
                                    {renderFile(data, index)}
                                    <div>
                                        <p className="text-center">{data.name}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
            <input accept="image/*" id="chosen-image" type="file" multiple hidden onChange={onChangeImage} />
        </div>
    );
}
