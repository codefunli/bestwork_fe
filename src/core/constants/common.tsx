import { PREFIX_SERVER_URL } from './urls';

export const CharacterConstants = {
    SLASH: '/',
};

export const UseQueryConstants = {
    USER_INFO: 'userInfo',
};

export const ErrorPagePath = {
    PAGE_404_NOT_FOUND: '/not-found',
};

export const UrlFeApp = {
    LOGIN_URL: '/login',
    MAIN_APP: '/app',
    DASH_BOARD: '/app/dashboard',
    COMPANY: {
        SEARCH: '/app/company',
        CREATE: '/app/company/register',
        EDIT: '/app/company/edit',
        EDIT_HAS_ID: '/app/company/edit/:id',
    },
    USER: {
        SEARCH: '/app/user',
        INFO: '/app/user/info',
        CREATE: '/app/user/create',
    },
    PROJECT: {
        SEARCH: '/app/project',
        EDIT: '/app/project/edit',
        EDIT_HAS_ID: '/app/project/edit/:id',
        CREATE: '/app/project/register',
        DETAIL_HAS_ID: '/app/project/detail/:id',
        DETAIL: '/app/project/detail',
    },
    ROLE: {
        INDEX: '/app/role',
    },
    SCHEDULE: {
        MATERIAL_STATUS: '/app/material/status',
        MATERIAL_STATUS_HAS_ID: '/app/material/status/:id',
    },
    FORGOT_PASSWORD: {
        FORGOT: '/auth/forgot-password',
        RESET: '/auth/reset-password',
    },
};

export const UrlServer = {
    API_LOGIN_URL: '/bestwork/login',
    COMPANY: {
        GET_COMPANIES: `${PREFIX_SERVER_URL}/companies/list`,
        REGISTER: `${PREFIX_SERVER_URL}/companies/create`,
        DELETE: `${PREFIX_SERVER_URL}/companies/delete`,
        GET_COMPANY_BY_ID: `${PREFIX_SERVER_URL}/companies`,
        UPDATE_COMPANY: `${PREFIX_SERVER_URL}/companies/update`,
    },
    USER: {
        USER: `${PREFIX_SERVER_URL}/user`,
        USERS: `${PREFIX_SERVER_URL}/users/list`,
        DELETE_USERS: `${PREFIX_SERVER_URL}/users/delete`,
        CREATE: `${PREFIX_SERVER_URL}/users/create`,
        IS_LOGINED: `${PREFIX_SERVER_URL}/users/isCheckLogin`,
        ROLES: `${PREFIX_SERVER_URL}/users/roles`,
    },
    PROJECT: {
        GET: `${PREFIX_SERVER_URL}/projects/list`,
        DELETE: `${PREFIX_SERVER_URL}/projects/delete`,
        UPDATE: `${PREFIX_SERVER_URL}/projects`,
        CREATE: `${PREFIX_SERVER_URL}/projects/create`,
        CREATE_PROGRESS: `${PREFIX_SERVER_URL}/projects/create-progress`,
        UPDATE_PROGRESS: `${PREFIX_SERVER_URL}/projects/update-progress`,
        GET_TYPE: `${PREFIX_SERVER_URL}/projects/types`,
        GET_STATUS: `${PREFIX_SERVER_URL}/projects/status`,
    },
    ROLE: {
        GET: `${PREFIX_SERVER_URL}/roles`,
        CREATE: `${PREFIX_SERVER_URL}/roles/create`,
        UPDATE: `${PREFIX_SERVER_URL}/roles/update`,
        DELETE: `${PREFIX_SERVER_URL}/roles/delete`,
    },
    AUTH: {
        FORGOT_PASSWORD: `${PREFIX_SERVER_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${PREFIX_SERVER_URL}/auth/reset-password`,
    },
    MATERIAL: {
        POST_STATUS: `${PREFIX_SERVER_URL}/post/create`,
        GET_POST_BY_PROJECT_ID: `${PREFIX_SERVER_URL}/post`,
    },
};

export const FieldConstants = {
    ID: 'id',
    USER_NAME: 'User Name',
    PASSWORD: 'Password',
    COMPANY_NAME: 'Company name',
    EMAIL: 'Email',
    TEL_NO: 'Tel-No',
    TAX_NO: 'Tax-No',
    START_DATE: 'Start date',
    EXPIRED_DATE: 'Expired Date',
    FIRST_NAME: 'First Name',
    LAST_NAME: 'Last Name',
    ROLE: 'Role',
    DESCRIPTION: 'Description',
    NEW_PASSWORD: 'New Password',
    CONFIRM_PASSWORD: 'Confirm Password',
};

export const ConfirmConstants = {
    DELETE: {
        title: 'title.delete',
        content: 'message.delete',
    },
    OK_BTN: 'button.btnOk',
    NO_BTN: 'button.btnNo',
};

export const AlertColorConstants: any = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
};

export const StatusCode = {
    OK: 'OK',
    ERROR: 'ERROR',
};

export const HttpStatusCode = {
    OK: 200,
    ERROR: 403,
};

export const DefaultImage = {
    USER_AVATAR: '/default-avatar.png',
};

export const FieldProjectConstants = {
    PROJECT_NAME: 'Project Name',
    PROJECT_TYPE: 'Project Type',
    DESCRIPTION: 'Description',
    COMMENT: 'Comment',
    CREATE_DATE: 'Create date',
    STATUS: 'Status',
    UPDATE_DATE: 'Update date',
};

export const FieldProjectProgress = {
    PROGRESS_TITLE: 'Title',
    START_DATE: 'Start date',
    END_DATE: 'End date',
    STATUS: 'Status',
};
