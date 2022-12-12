import axios from 'axios';
import { stringify } from 'qs';
import { UrlFeApp } from '../constants/common';
import { BASE_API_PATH, PREFIX_SERVER_URL } from '../constants/urls';

let accessToken = window.localStorage.getItem('access_token');
let refreshToken = window.localStorage.getItem('refresh_token');
let acceptLanguage = window.localStorage.getItem('Accept-Language');

let apiClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        prefix: 'Bearer',
        access_token: accessToken ? accessToken : '',
        refresh_token: refreshToken ? refreshToken : '',
        accept_language: acceptLanguage ? acceptLanguage : '',
    },
    paramsSerializer(params: any) {
        return stringify(params);
    },
});

apiClient.interceptors.request.use((res: any) => {
    let at = window.localStorage.getItem('access_token');
    let rt = window.localStorage.getItem('refresh_token');
    let al = window.localStorage.getItem('accept_language');

    if (at && rt && al) {
        res.headers = {
            ...res.headers,
            access_token: at,
            refresh_token: rt,
            'Accept-Language': al,
        };
    }
    if (!(res.headers.access_token && res.headers.refresh_token && res.headers.accept_language)) {
        res.headers = {
            ...res.headers,
            access_token: at,
            refresh_token: rt,
            'Accept-Language': al,
        };
    }

    if (location.pathname !== UrlFeApp.MAIN_APP && location.pathname !== UrlFeApp.LOGIN_URL && !(at || rt)) {
        const downloadLink = document.createElement('a');
        downloadLink.href = UrlFeApp.LOGIN_URL;
        downloadLink.click();
    }
    return res;
});

apiClient.interceptors.response.use(
    (res) => {
        if (res.headers.access_token && res.headers.refresh_token) {
            localStorage.setItem('access_token', res.headers.access_token);
            localStorage.setItem('refresh_token', res.headers.refresh_token);
            accessToken = res.headers.access_token;
            refreshToken = res.headers.refresh_token;

            apiClient = axios.create({
                baseURL: BASE_API_PATH,
                withCredentials: true,
                headers: {
                    'content-type': 'application/json',
                    prefix: 'Bearer',
                    access_token: res.headers.access_token,
                    refresh_token: res.headers.refresh_token,
                },
                paramsSerializer(params: any) {
                    return stringify(params);
                },
            });
        }

        return res;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default apiClient;
