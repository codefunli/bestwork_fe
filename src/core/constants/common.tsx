import Chip from '@mui/material/Chip';
import { PREFIX_SERVER_URL } from './urls';
import pdf from '../../../src/assets/pdf.png';
import excel from '../../../src/assets/excel.png';
import unknown from '../../../src/assets/unknown.jpg';

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
    FORGOT_PASSWORD: {
        FORGOT: '/auth/forgot-password',
        RESET: '/auth/reset-password',
    },
    AWB: {
        LIST: '/app/project/customsClearance',
        LIST_HAS_ID: '/app/project/customsClearance/:id',
    },
    CONSTRUCTION: {
        SEARCH: '/app/construction',
        CREATE: '/app/construction/register',
        CREATE_HAS_ID: '/app/construction/register/:id',
        EDIT: '/app/construction/edit',
        EDIT_HAS_ID: '/app/construction/edit/:id',
        DETAIL: '/app/construction/progress/detail',
        DETAIL_HAS_ID: '/app/construction/progress/detail/:id',
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
        INFO: `${PREFIX_SERVER_URL}/users/detect-infor`,
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
    CONSTRUCTION: {
        GET_LIST: `${PREFIX_SERVER_URL}/constructions/list`,
        GET_STATUS: `${PREFIX_SERVER_URL}/constructions/status`,
        DELETE: `${PREFIX_SERVER_URL}/constructions/delete`,
        DETAIL: `${PREFIX_SERVER_URL}/constructions/detail`,
        CREATE: `${PREFIX_SERVER_URL}/constructions/create`,
        UPDATE: `${PREFIX_SERVER_URL}/constructions/update`,
        PROGRESS_BY_CONSTRUCTION: `${PREFIX_SERVER_URL}/progress/by/construction`,
        CREATE_PROGRESS: `${PREFIX_SERVER_URL}/progress/create`,
        GET_PROGRESS_STATUS: `${PREFIX_SERVER_URL}/progress/status`,
        UPDATE_PROGRESS: `${PREFIX_SERVER_URL}/progress/update`,
    },
    ROLE: {
        GET: `${PREFIX_SERVER_URL}/users/roles`,
        CREATE: `${PREFIX_SERVER_URL}/roles/create`,
        UPDATE: `${PREFIX_SERVER_URL}/roles/update`,
        DELETE: `${PREFIX_SERVER_URL}/roles/delete`,
        SCREEN: `${PREFIX_SERVER_URL}/monitor`,
        PERMISSIONS: `${PREFIX_SERVER_URL}/permission/1`,
    },
    AUTH: {
        FORGOT_PASSWORD: `${PREFIX_SERVER_URL}/auth/forgot-password`,
        RESET_PASSWORD: `${PREFIX_SERVER_URL}/auth/reset-password`,
    },
    AWB: {
        GET_STATUS: `${PREFIX_SERVER_URL}/airway-bill/status`,
        CREATE_AWB: `${PREFIX_SERVER_URL}/airway-bill/create`,
        GET_AWB_BY_PROJECT_ID: `${PREFIX_SERVER_URL}/airway-bill/list/by`,
        UPDATE_INVOICE: `${PREFIX_SERVER_URL}/invoices/update-invoice`,
        GET_ALL_INVOICE: `${PREFIX_SERVER_URL}/invoices/list/by`,
        ADD_FILE_TO_CUSTOMS_CLEARANCE: `${PREFIX_SERVER_URL}/airway-bill/change-status-file`,
        GET_ALL_CUSTOMS_CLEARANCE_DOCUMENT: `${PREFIX_SERVER_URL}/airway-bill`,
        GET_ALL_PACKING_LIST: `${PREFIX_SERVER_URL}/packages/list/by`,
        UPLOAD_PACKING_LIST: `${PREFIX_SERVER_URL}/packages/update-package`,
        DOWNLOAD_CCD: `${PREFIX_SERVER_URL}/airway-bill`,
        GET_PDF_FILE: `${PREFIX_SERVER_URL}/invoices/view-file-pdf`,
        CHANGE_AWB_STATUS: `${PREFIX_SERVER_URL}/airway-bill`,
        ADD_INVOICE_POST_COMMENT: `${PREFIX_SERVER_URL}/invoices`,
        ADD_PACKING_POST_COMMENT: `${PREFIX_SERVER_URL}/packages`,
        GET_ALL_IMAGE_BEFORE: `${PREFIX_SERVER_URL}/evidence-before-post/list/by`,
        UPLOAD_IMAGE_BEFORE: `${PREFIX_SERVER_URL}/evidence-before-post/update`,
        ADD_IMAGE_BEFORE_COMMENT: `${PREFIX_SERVER_URL}/evidence-before-post`,
        GET_ALL_IMAGE_AFTER: `${PREFIX_SERVER_URL}/evidence-after-post/list/by`,
        UPLOAD_IMAGE_AFTER: `${PREFIX_SERVER_URL}/evidence-after-post/update`,
        ADD_IMAGE_AFTER_COMMENT: `${PREFIX_SERVER_URL}/evidence-after-post`,
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
    SCREEN: 'Screen Name',
    ICON: 'Icon',
    DESCRIPTION: 'Description',
    NEW_PASSWORD: 'New password',
    CONFIRM_PASSWORD: 'Confirm password',
    AIR_WAY_BILL_NO: 'AWB no',
    CONSTRUCTION_NAME: 'Construstion Name',
    CONSTRUCTION_CODE: 'Construction Code',
    STATUS: 'Status',
    AIR_WAY_BILL: 'Air way bill',
    END_DATE: 'End date',
    LOCATION: 'Location',
    AWB: 'AWB',
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
        ICON_CONSTRUCTION_NM_BAR: 'ConstructionIcon',
    },
    LABEL_BTN: {
        REGISTER: 'button.btnRegister',
        PENDING: 'button.btnPending',
        SEARCH: 'button.btnSearch',
        CLEAR: 'button.btnClear',
        ACTIVE: 'button.btnActive',
        SAVE: 'button.btnSave',
        CREATE: 'button.btnCreate',
        CREATE_SCREEN: 'button.btnCreateScreen',
        BACK: 'button.btnBack',
        FINISH: 'button.btnFinish',
        UPLOAD_CONSTRUCTION: 'button.btnConstruction',
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
        REGISTER_NATIONAL: 'company.register.national',
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
        SEARCH_ENABLE: 'user.search.enabled',
        SEARCH_DISABLE: 'user.search.notEnabled',
        SELECT_STATUS: 'user.search.selectStatus',
        SELECT_ROLE: 'user.search.selectRole',
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
    MATERIAL: {
        TITLE: 'material.title',
    },
    CONSTRUCTION: {
        TABLE_COL_CTTNAME: 'construction.table.colCttName',
        TABLE_COL_CTTCODE: 'construction.table.colCttCode',
        TABLE_COL_START_DATE: 'construction.table.colStartDate',
        TABLE_COL_AWB: 'construction.table.colAWB',
        TABLE_COL_STATUS: 'construction.table.colStatus',
        TABLE_COL_LOCATION: 'construction.table.colLocation',
        SEARCH_TITLE: 'construction.search.title',
        SEARCH_TITLE_CARD: 'construction.search.title_card',
        NAME: 'construction.search.constructionName',
        RU_TITLE: 'construction.register.title',
        RU_NAME: 'construction.register.cttName',
        RU_CODE: 'construction.register.cttCode',
        RU_START_DATE: 'construction.register.cttStartDate',
        RU_END_DATE: 'construction.register.cttEndDate',
        RU_STATUS: 'construction.register.cttStatus',
        RU_LOCATION: 'construction.register.cttLocation',
        RU_DRAWING: 'construction.register.cttDraw',
        RU_AWB: 'construction.register.cttAwb',
        RU_DESCRIPTION: 'construction.register.cttDescription',
    },
};

export const MenuItem = {
    DASHBOARD: 'menu.dashboard',
    COMPANY: 'menu.company',
    USER: 'menu.user',
    PROJECT: 'menu.project',
    CONSTRUCTION: 'menu.construction',
    ROLE: 'menu.role',
};

export const BreadcrumbReplaceList = ['with'];

export const NameElConstants = {
    USER_NAME: 'userName',
    PASSWORD: 'password',
};

export const renderImage = (data: any, index: any) => {
    if (data.file.includes('pdf;'))
        return (
            <img
                loading="lazy"
                className="imgTag"
                src={
                    'https://play-lh.googleusercontent.com/9XKD5S7rwQ6FiPXSyp9SzLXfIue88ntf9sJ9K250IuHTL7pmn2-ZB0sngAX4A2Bw4w'
                }
                key={index}
            />
        );
    if (data.file.includes('image/')) return <img loading="lazy" className="imgTag" src={data.file} key={index} />;
    if (data.file.includes('excel;'))
        return (
            <img
                loading="lazy"
                className="imgTag"
                src={'https://cdn1.iconfinder.com/data/icons/famous-brand-apps/100/_-04-512.png'}
                key={index}
            />
        );
    return (
        <img
            loading="lazy"
            className="imgTag"
            src={
                'https://static.vecteezy.com/system/resources/previews/002/303/215/original/modern-flat-design-of-unknown-format-file-icon-for-web-free-vector.jpg'
            }
            key={index}
        />
    );
};

export const renderFile = (data: any, index: any) => {
    switch (data.type.toLowerCase()) {
        case 'pdf':
            return <img loading="lazy" className="imgTag" src={pdf} key={index} />;
        case 'application/pdf':
            return <img loading="lazy" className="imgTag" src={pdf} key={index} />;
        case 'xls':
            return <img loading="lazy" className="imgTag" src={excel} key={index} />;
        case 'xlsx':
            return <img loading="lazy" className="imgTag" src={excel} key={index} />;
        case 'application/vnd.ms-excel':
            return <img loading="lazy" className="imgTag" src={excel} key={index} />;
        case 'jpeg':
            return (
                <img
                    loading="lazy"
                    className="imgTag"
                    src={`data:image/${data.type};base64,${data.content}`}
                    key={index}
                />
            );
        case 'jpg':
            return (
                <img
                    loading="lazy"
                    className="imgTag"
                    src={`data:image/${data.type};base64,${data.content}`}
                    key={index}
                />
            );
        case 'png':
            return (
                <img
                    loading="lazy"
                    className="imgTag"
                    src={`data:image/${data.type};base64,${data.content}`}
                    key={index}
                />
            );
        case 'image/jpeg':
        case 'image/jpg':
            return <img loading="lazy" className="imgTag" src={URL.createObjectURL(data)} key={index} />;
        case 'image/png':
            return <img loading="lazy" className="imgTag" src={URL.createObjectURL(data)} key={index} />;
        default:
            return <img loading="lazy" className="imgTag" src={unknown} key={index} />;
    }
};
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';

export const arrayBufferToBase64 = (arraybuffer: ArrayBuffer): string => {
    let bytes = new Uint8Array(arraybuffer),
        i,
        len = bytes.length,
        base64 = '';

    for (i = 0; i < len; i += 3) {
        base64 += chars[bytes[i] >> 2];
        base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
        base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
        base64 += chars[bytes[i + 2] & 63];
    }

    if (len % 3 === 2) {
        base64 = base64.substring(0, base64.length - 1) + '=';
    } else if (len % 3 === 1) {
        base64 = base64.substring(0, base64.length - 2) + '==';
    }

    return base64;
};

const lookup = typeof Uint8Array === 'undefined' ? [] : new Uint8Array(256);
for (let i = 0; i < chars.length; i++) {
    lookup[chars.charCodeAt(i)] = i;
}

export const Base64ToArrayBuffer = (base64: string): ArrayBuffer => {
    let bufferLength = base64.length * 0.75,
        len = base64.length,
        i,
        p = 0,
        encoded1,
        encoded2,
        encoded3,
        encoded4;

    if (base64[base64.length - 1] === '=') {
        bufferLength--;
        if (base64[base64.length - 2] === '=') {
            bufferLength--;
        }
    }

    const arraybuffer = new ArrayBuffer(bufferLength),
        bytes = new Uint8Array(arraybuffer);

    for (i = 0; i < len; i += 4) {
        encoded1 = lookup[base64.charCodeAt(i)];
        encoded2 = lookup[base64.charCodeAt(i + 1)];
        encoded3 = lookup[base64.charCodeAt(i + 2)];
        encoded4 = lookup[base64.charCodeAt(i + 3)];

        bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
        bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
        bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
    }

    return arraybuffer;
};

export const dataURLtoFile = (dataurl: any, filename: any) => {
 
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
}

export const prefixPdf = 'data:application/pdf;base64';

export const prefixZip = 'data:application/zip;base64';

export function downloadZIP(base64Data: any, name: string, prefix: string) {
    const linkSource = `${prefix},${base64Data}`;
    const downloadLink = document.createElement('a');
    const fileName = `${name}.zip`;

    downloadLink.href = linkSource;
    downloadLink.download = fileName;
    downloadLink.click();
}

export const renderChipAwbStatus = (value: any) => {
    switch (value) {
        case 'Not yet customs clearance':
            return (
                <Chip
                    label="Not yet customs clearance"
                    color="primary"
                    size="small"
                    className="btn"
                    sx={{ width: '100%' }}
                />
            );
        case 'In Customs Clearance Progress':
            return (
                <Chip
                    label="In Customs Clearance Progress"
                    color="secondary"
                    size="small"
                    className="btn"
                    sx={{ width: '100%' }}
                />
            );
        case 'Done':
            return <Chip label="Done" color="success" size="small" className="btn" sx={{ width: '100%' }} />;
        case 'Cancel':
            return <Chip label="Cancel" color="default" size="small" className="btn" sx={{ width: '100%' }} />;
        default:
            break;
    }
};

export const CUSTOMS_CLEARANCE = {
    PACKAGE: 'package',
    INVOICE: 'invoice',
    IMAGE_BEFORE: 'imageBefore',
    IMAGE_AFTER: 'imageAfter',
};

export const AWB_LOADING = {
    SUCCESS_INVOICE: 'Get list invoice successfully',
    SUCCESS_PACKAGE: 'Get list package successfully',
    SUCCESS_EVIDENCE_BEFORE: 'Get list evidence before successfully',
    SUCCESS_EVIDENCE_AFTER: 'Get list evidence after successfully',
    SUCCESS_CCD: 'Get customs clearance documents successfully',
    DATA_NOT_FOUND: 'Data is not found',
    HAS_DATA: 'HasData',
    NO_DATA: 'NoData',
    LOADING: 'Loading',
};
