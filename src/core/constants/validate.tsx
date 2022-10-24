import * as yup from 'yup';
import { pattern } from './regex-pattern';
import { ERROR_MSG, getMessage } from './message';
import { FieldConstants, FieldProjectConstants, FieldProjectProgress } from './common';

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

export const validateUserForm = yup.object({
    userNm: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    email: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstNm: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastNm: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    currentCompanyId: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.COMPANY_NAME])),
});

export const validateCreateUserForm = yup.object({
    userNm: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    email: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstNm: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastNm: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    companyId: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.COMPANY_NAME])),
    role: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ROLE])),
});
export const validateEditCompanyForm = yup.object({
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
});
export const validateProjectRegisterForm = yup.object({
    projectName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.PROJECT_NAME])),
    createDate: yup.date().required(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.CREATE_DATE])),
});

export const validateProjectEditForm = yup.object({
    projectName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.PROJECT_NAME])),
    updateDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.UPDATE_DATE]))
        .max(new Date(), getMessage(ERROR_MSG.E01_009, [FieldProjectConstants.UPDATE_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.UPDATE_DATE])),
});

export const validateProjectProgress = yup.object({
    title: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.PROGRESS_TITLE])),
    startDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.START_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.START_DATE])),
    endDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.END_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.END_DATE])),
    status: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.STATUS])),
});

export const validateCreateRoleForm = yup.object({
    roleName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ROLE])),
    description: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.DESCRIPTION])),
});
