import axios from 'axios';
import { stringify } from 'qs';
import { BASE_API_PATH } from '../constants/urls';

let accessToken = localStorage.getItem('access_token');
let refreshToken = localStorage.getItem('refresh_token');

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

apiClient.interceptors.response.use(
    (res) => {
        const accessTokenRes = res.headers.access_token;
        const refreshTokenRes = res.headers.refresh_token;
        localStorage.setItem('access_token', accessTokenRes);
        localStorage.setItem('refresh_token', refreshTokenRes);
        apiClient = axios.create({
            baseURL: BASE_API_PATH,
            withCredentials: true,
            headers: {
                'content-type': 'application/json',
                prefix: 'Bearer',
                access_token: accessTokenRes,
                refresh_token: refreshTokenRes,
            },
            paramsSerializer(params: any) {
                return stringify(params);
            },
        });
        return res;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default apiClient;
