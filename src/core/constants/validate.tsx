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
    userName: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    uEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    company: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.COMPANY_NAME])),
    role: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ROLE])),
});

export const validateUserEditForm = yup.object({
    userName: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    uEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    role: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ROLE])),
});

export const validateCreateUserForm = yup.object({
    userName: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    uEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    company: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.COMPANY_NAME])),
    role: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ROLE])),
    password: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        .matches(pattern.password, getMessage(ERROR_MSG.E01_004, [FieldConstants.NEW_PASSWORD])),
    uTelNo: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.TEL_NO]))
        .matches(pattern.telNo, getMessage(ERROR_MSG.E01_006, [FieldConstants.TEL_NO])),
});

export const validateCreateUserWithCompanyForm = yup.object({
    userName: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.USER_NAME]))
        .matches(pattern.userName, getMessage(ERROR_MSG.E01_005, [FieldConstants.USER_NAME])),
    uEmail: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
    firstName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.FIRST_NAME])),
    lastName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.LAST_NAME])),
    password: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        .matches(pattern.password, getMessage(ERROR_MSG.E01_004, [FieldConstants.NEW_PASSWORD])),
    uTelNo: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.TEL_NO]))
        .matches(pattern.telNo, getMessage(ERROR_MSG.E01_006, [FieldConstants.TEL_NO])),
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
    startDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.CREATE_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldProjectConstants.CREATE_DATE])),
    status: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.STATUS])),
    projectType: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldProjectProgress.PROJECT_TYPE])),
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

export const validateCreateScreenForm = yup.object({
    name: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.SCREEN])),
    icon: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.ICON])),
    url: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.URL])),
});

export const validateForgotPassword = yup.object({
    email: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.EMAIL]))
        .matches(pattern.email, getMessage(ERROR_MSG.E01_008, [FieldConstants.EMAIL])),
});

export const validateResetPassword = yup.object({
    password: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        .matches(pattern.password, getMessage(ERROR_MSG.E01_004, [FieldConstants.NEW_PASSWORD])),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], getMessage(ERROR_MSG.E01_010, [FieldConstants.CONFIRM_PASSWORD])),
});

export const validateChangePassword = yup.object({
    currentPassword: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD])),
    newPassword: yup
        .string()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.PASSWORD]))
        .matches(pattern.password, getMessage(ERROR_MSG.E01_004, [FieldConstants.NEW_PASSWORD])),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('newPassword'), null], getMessage(ERROR_MSG.E01_010, [FieldConstants.CONFIRM_PASSWORD])),
});

export const validateCreateAwbForm = yup.object({
    code: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.AIR_WAY_BILL_NO])),
});

export const validateConstruction = yup.object({
    constructionName: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.CONSTRUCTION_NAME])),
    startDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.START_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldConstants.START_DATE])),
    endDate: yup
        .date()
        .required(getMessage(ERROR_MSG.E01_001, [FieldConstants.END_DATE]))
        .typeError(getMessage(ERROR_MSG.E01_001, [FieldConstants.END_DATE]))
        .min(yup.ref('startDate'), getMessage(ERROR_MSG.E01_003, [FieldConstants.END_DATE, FieldConstants.START_DATE])),
    status: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.STATUS])),
    awbCodes: yup
        .array()
        .min(1, getMessage(ERROR_MSG.E01_001, [FieldConstants.AIR_WAY_BILL]))
        .nullable(true),
    nationId: yup.string().required(getMessage(ERROR_MSG.E01_001, [FieldConstants.NATION])),
});
