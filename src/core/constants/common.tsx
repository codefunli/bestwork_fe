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
        SEARCH: "/app/company",
        CREATE: "/app/company/register",
        EDIT: "/app/company/edit",
        EDIT_HAS_ID: "/app/company/edit/:id",
    },
    USER: {
        SEARCH: "/app/user",
        INFO: "/app/user",
    }
}

export const UrlServer = {
    API_LOGIN_URL: '/login',
    COMPANY: {
        GET_COMPANIES: '/bestwork/api/v1/companies',
        POST: '/bestwork/api/v1/companies/create',
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
};

export const ConfirmConstants = {
    DELETE: {
        title: 'DELETE',
        content: 'Are you certain that you want to delete this record!',
    },
    OK_BTN: 'OK',
    NO_BTN: 'NO',
};
