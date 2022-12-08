import { IconName } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const renderIconLeftBar = (iconNm: IconName) => {
    return <FontAwesomeIcon icon={['fas', iconNm]} size="lg" color="#DF6C4F" />;
};
