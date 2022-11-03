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
        CREATE_WITH_COMPANY: '/app/user/create/with/company',
        CREATE_WITH_COMPANY_ID: '/app/user/create/with/company/:id',
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
    API_LOGOUT_URL: '/bestwork/logout',
    CHANGE_PASSWORD: `${PREFIX_SERVER_URL}/change-password`,
    COMPANY: {
        GET_COMPANIES: `${PREFIX_SERVER_URL}/companies/list`,
        REGISTER: `${PREFIX_SERVER_URL}/companies/create`,
        DELETE: `${PREFIX_SERVER_URL}/companies/delete`,
        GET_COMPANY_BY_ID: `${PREFIX_SERVER_URL}/companies`,
        UPDATE_COMPANY: `${PREFIX_SERVER_URL}/companies/update`,
        GET_COMPANIES_BY_USER: `${PREFIX_SERVER_URL}/users/companies`,
        GET_ALL: `${PREFIX_SERVER_URL}/companies/all`,
    },
    USER: {
        USER: `${PREFIX_SERVER_URL}/users`,
        USERS: `${PREFIX_SERVER_URL}/users/list`,
        DELETE_USERS: `${PREFIX_SERVER_URL}/users/delete`,
        CREATE: `${PREFIX_SERVER_URL}/users/create`,
        IS_LOGINED: `${PREFIX_SERVER_URL}/users/isCheckLogin`,
        FORGOT_PASSWORD: `${PREFIX_SERVER_URL}/auth/forgot_password`,
        RESET_PASSWORD: `${PREFIX_SERVER_URL}/auth/reset_password`,
        ROLES: `${PREFIX_SERVER_URL}/users/roles`,
        UPDATE: `${PREFIX_SERVER_URL}/users/update`,
    },
    PROJECT: {
        GET_LIST: `${PREFIX_SERVER_URL}/projects/list`,
        GET_DETAIL: `${PREFIX_SERVER_URL}/projects`,
        DELETE: `${PREFIX_SERVER_URL}/projects/delete`,
        UPDATE: `${PREFIX_SERVER_URL}/projects/update`,
        CREATE: `${PREFIX_SERVER_URL}/projects/regist`,
        CREATE_PROGRESS: `${PREFIX_SERVER_URL}/progress/create`,
        UPDATE_PROGRESS: `${PREFIX_SERVER_URL}/progress/update`,
        GET_TYPE: `${PREFIX_SERVER_URL}/projects/types`,
        GET_STATUS: `${PREFIX_SERVER_URL}/projects/status`,
        GET_USER_ASSIGN: `${PREFIX_SERVER_URL}/projects/assign-list`,
        GET_PROGRESS_BY_PROJECT_ID: `${PREFIX_SERVER_URL}/progress/by/project`,
        GET_PROGRESS_STATUS: `${PREFIX_SERVER_URL}/progress/status`,
        GET_USER_ASSIGN_CREATE: `${PREFIX_SERVER_URL}/projects/assign-list-create`,
        GET_USER_ASSIGN_UPDATE: `${PREFIX_SERVER_URL}/projects/assign-list-edit`,
    },
    ROLE: {
        GET: `${PREFIX_SERVER_URL}/role/all`,
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
        POST_COMMENT: `${PREFIX_SERVER_URL}/post`,
        UPDATE_POST: `${PREFIX_SERVER_URL}/post`,
    },
};

export const FieldConstants = {
    ID: 'id',
    USER_NAME: 'User name',
    PASSWORD: 'Password',
    COMPANY_NAME: 'Company name',
    EMAIL: 'Email',
    TEL_NO: 'Tel-No',
    TAX_NO: 'Tax-No',
    START_DATE: 'Start date',
    EXPIRED_DATE: 'Expired date',
    FIRST_NAME: 'First name',
    LAST_NAME: 'Last name',
    ROLE: 'Role',
    DESCRIPTION: 'Description',
    NEW_PASSWORD: 'New password',
    CONFIRM_PASSWORD: 'Confirm password',
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
    PROJECT_TYPE: 'Project type',
};

export const Item = {
    TOOL_TIP: {
        EDIT: 'tooltip.edit',
        ADD_USER: 'tooltip.addUser',
    },
    ICON_BTN: {
        MODE_EDIT_ICON: 'ModeEditIcon',
        MODE_ADD_USER_ICON: 'AddUser',
    },
    ICON_NM: {
        ICON_DASHBOARD_NM_BAR: 'DashBoardIcon',
        ICON_COM_NM_BAR: 'CompanyIcon',
        ICON_USER_NM_BAR: 'UserIcon',
        ICON_PRJ_NM_BAR: 'ProjectIcon',
        ICON_ROLE_NM_BAR: 'RoleIcon',
    },
    LABEL_BTN: {
        REGISTER: 'button.btnRegister',
        PENDING: 'button.btnPending',
        SEARCH: 'button.btnSearch',
        CLEAR: 'button.btnClear',
        ACTIVE: 'button.btnActive',
        SAVE: 'button.btnSave',
        CREATE: 'button.btnCreate',
        BACK: 'button.btnBack',
    },
    COMPANY: {
        TITLE: 'company.title',
        SEARCH_TITLE: 'company.search.title',
        SEARCH_STATUS: 'company.search.status',
        SEARCH_KEYWORD: 'company.search.keyword',
        REGISTER_TITLE: 'company.register.title',
        REGISTER_TITLE_CARD: 'company.register.title_card',
        REGISTER_NAME: 'company.register.name',
        REGISTER_EMAIL: 'company.register.email',
        REGISTER_TELNO: 'company.register.telNo',
        REGISTER_TAX_NO: 'company.register.taxNo',
        REGISTER_CITY: 'company.register.city',
        REGISTER_DISTRICT: 'company.register.district',
        REGISTER_WARD: 'company.register.ward',
        REGISTER_STREET: 'company.register.street',
        REGISTER_START_DATE: 'company.register.startDate',
        REGISTER_END_DATE: 'company.register.endDate',
    },
    USER: {
        REGISTER_TITLE: 'user.register.title',
        REGISTER_TITLE_CARD: 'user.register.title_card',
        REGISTER_USER_NAME: 'user.register.userName',
        REGISTER_PASSWORD: 'user.register.password',
        REGISTER_FIRST_NAME: 'user.register.firstName',
        REGISTER_LAST_NAME: 'user.register.lastName',
        REGISTER_TELNO: 'user.register.telNo',
        REGISTER_EMAIL: 'user.register.email',
        REGISTER_ALLOW_LOGIN: 'user.register.allowLogin',
        REGISTER_ROLE_ASSIGNED: 'user.register.roleAssigned',
    },
    COMMON: {
        PLACE_HOLDER: 'common.placeholder',
        STATUS: 'common.status',
        RADIO_ADMIN: 'radio.admin',
        RADIO_USER: 'radio.user',
        RADIO_ENABLED: 'radio.enabled',
    },
    MESSAGE: {
        ERROR: 'message.error',
        CITY_LABEL: 'message.cityLabel',
        WARD_LABEL: 'message.wardLabel',
        DISTRICT_LABEL: 'message.districtLabel',
    },
};
