export const STR_EMPTY = '';
/**
 * check undefined and null of object
 */
export const isObjectEmpty = (object: any) => {
    if (object === undefined || object === null || object === '') {
        return true;
    }

    return false;
};

/**
 * check undefined and null of array object
 */
export const isArrayEmpty = (object: any[]) => {
    if (object === undefined || object === null || object.length === 0) {
        return true;
    }

    return false;
};
