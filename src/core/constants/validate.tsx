import * as yup from 'yup';
import { pattern } from './regex-pattern';
import { ERROR_MSG, getMessage } from './message';
import { FieldConstants } from './common';

export const validateForm = yup.object({
    companyName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.COMPANY_NAME])),
    cpEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    cpTelNo: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.TEL_NO]))
        .matches(pattern.telNo, getMessage(ERROR_MSG.E01_006, [FieldConstants.TEL_NO])),
    taxNo: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.TAX_NO]))
        .matches(pattern.taxNo, getMessage(ERROR_MSG.E01_007, [FieldConstants.TAX_NO])),
    startDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.START_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_002, [FieldConstants.START_DATE])),
    expiredDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EXPIRED_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_002, [FieldConstants.EXPIRED_DATE]))
        .min(
            yup.ref('startDate'),
            getMessage(ERROR_MSG.E01_003, [FieldConstants.EXPIRED_DATE, FieldConstants.START_DATE]),
        ),
    userName: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    password: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        .matches(pattern.password, getMessage(ERROR_MSG.E01_004, [FieldConstants.PASSWORD])),
    uTelNo: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.TEL_NO]))
        .matches(pattern.telNo, getMessage(ERROR_MSG.E01_007, [FieldConstants.TEL_NO])),
    uEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
});
