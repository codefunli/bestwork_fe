import { productImages } from '../../assets';
import QuiltedImage from './quilted-image';

export default function ImageManager() {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <QuiltedImage images={productImages} />
        </div>
    );
}
