import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import ShowImage from '../modal/show-image';
import QuiltedImage from './quilted-image';
interface ImageManager {
    data: any[];
    isFile?: boolean;
}
export default function ImageManager(props: ImageManager) {
    const { data, isFile } = props;
    const [isShowModal, setIsShowModal] = useState(false);
    const { t } = useTranslation();

    const showModal = () => {
        setIsShowModal(true);
    };
    const closeModal = () => {
        setIsShowModal(false);
    };

    const alertOkFunc = () => {
        setIsShowModal(false);
    };

    return (
        <>
            {!isFile ? (
                <button
                    onClick={showModal}
                    className="border-0 bg-white d-flex align-items-center justify-content-center w-100"
                >
                    <QuiltedImage
                        callBackFn={() => {}}
                        images={data}
                        isOpenModal={false}
                        isFile={false}
                        isFilePreview={false}
                    />
                </button>
            ) : (
                <div className="border-0 bg-white d-flex align-items-center justify-content-center w-100">
                    <QuiltedImage
                        callBackFn={() => {}}
                        images={data}
                        isOpenModal={false}
                        isFile={true}
                        isFilePreview={false}
                    />
                </div>
            )}
            {/* <ShowImage
                isOpen={isShowModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title={t('material.previewImage')}
                content={data}
                noBtn="NO"
                okBtn="OK"
            /> */}
        </>
    );
}
