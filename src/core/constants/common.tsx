export const CharacterConstants = {
    SLASH: '/',
};

export const UrlApiPaths = {
    USER_INFO: '/users/info',
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
        CREATE: '/app/project/register',
        EDIT: '/app/project/edit',
        EDIT_HAS_ID: '/app/project/edit/:id',
    },
};

const prefixServerUrl = '/bestwork/api/v1';

export const UrlServer = {
    API_LOGIN_URL: '/login',
    COMPANY: {
        GET_COMPANIES: '/bestwork/api/v1/companies',
        POST: '/bestwork/api/v1/companies/create',
        DELETE: '/bestwork/api/v1/companies/delete',
        GET_COMPANY: '/bestwork/api/v1/companies',
        UPDATE_COMPANY: '/bestwork/api/v1/companies/updates',
    },
    USER: {
        USER: `${prefixServerUrl}/user`,
        USERS: `${prefixServerUrl}/users`,
        DELETE_USERS: `${prefixServerUrl}/users/delete`,
        CREATE: `${prefixServerUrl}/users/create`,
    },
    PROJECT: {
        GET: '/bestwork/api/v1/projects',
        DELETE: '/bestwork/api/v1/projects/delete',
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

export const DefaultImage = {
    USER_AVATAR: '/default-avatar.png',
};
