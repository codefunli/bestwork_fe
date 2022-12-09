import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderIconLeftBar = (iconNm: IconName) => {
    if (iconNm) {
        return <FontAwesomeIcon icon={['fas', iconNm]} size="lg" color="#DF6C4F" />;
    } else {
        return <FontAwesomeIcon icon={['fas', 'square']} size="lg" color="#DF6C4F" />;
    }
};
