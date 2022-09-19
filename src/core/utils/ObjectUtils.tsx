
/**
 * check undefined and null of object
 */
export const isEmpty = (object: any) => {
    if (object === undefined || object === null) {
        return false;
    }

    return true;
}