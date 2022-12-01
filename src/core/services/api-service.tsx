import axios from 'axios';
import { stringify } from 'qs';
import { BASE_API_PATH } from '../constants/urls';

let accessToken = window.localStorage.getItem('access_token');
let refreshToken = window.localStorage.getItem('refresh_token');

let apiClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        prefix: 'Bearer',
        access_token: accessToken ? accessToken : '',
        refresh_token: refreshToken ? refreshToken : '',
    },
    paramsSerializer(params: any) {
        return stringify(params);
    },
});

apiClient.interceptors.request.use((res: any) => {
    let at = window.localStorage.getItem('access_token');
    let rt = window.localStorage.getItem('refresh_token');
    if (at && rt) {
        res.headers.access_token = at;
        res.headers.refresh_token = rt;
    }
    if (!(res.headers.access_token && res.headers.refresh_token)) {
        res.headers.access_token = accessToken;
        res.headers.refresh_token = refreshToken;
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
