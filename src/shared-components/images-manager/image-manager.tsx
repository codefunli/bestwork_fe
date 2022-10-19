import { useState } from 'react';
import ShowImage from '../modal/show-image';
import QuiltedImage from './quilted-image';
interface ImageManager {
    images: any[];
}
export default function ImageManager(props: ImageManager) {
    const { images } = props;
    const [isShowModal, setIsShowModal] = useState(false);

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
            <div
                onClick={showModal}
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <QuiltedImage callBackFn={() => { }} images={images} isOpenModal={false} />
            </div>
            <ShowImage
                isOpen={isShowModal}
                closeFunc={closeModal}
                okFunc={alertOkFunc}
                title="Preview image"
                content={{ projectId: '1', comment: '', images: images }}
                noBtn="NO"
                okBtn="OK"
            />
        </>
    );
}
