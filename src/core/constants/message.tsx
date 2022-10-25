import { isArrayEmpty } from '../utils/object-utils';

export const SUCCESS_MSG = {
    S01_001: 'Retrieve data is successfully',
    S01_002: 'Registration data is successfully',
    S01_003: 'Updating data is successfully',
    S01_004: 'message.deleteSuccess',
};

export const ERROR_MSG = {
    E01_001: '{0} is required.',
    E01_002: '{0} invalid.',
    E01_003: "{0} can't be before {1}.",
    E01_004:
        '{0} minimum 8 characters and maximum 100 characters, at least one uppercase letter, one lowercase letter, one number and one special character.',
    E01_005: '{0} is 8-20 characters long.',
    E01_006: '{0} is number and must be start with 0 or +84. Ex: 0395XXXXXX.',
    E01_007: '{0} must be a number.',
    E01_008: '{0} should be in correct format.',
    E01_009: '{0} must be at earlier than current date',
    E01_010: '{0} must match',
};

export const getMessage = (msg: string, params: any[]) => {
    if (isArrayEmpty(params)) {
        return msg;
    }

    params.map((param, index) => {
        msg = msg.replace(`{${index}}`, param);
    });

    return msg;
};
