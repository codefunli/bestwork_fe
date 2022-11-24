import axios from 'axios';
import { stringify } from 'qs';
import { BASE_API_PATH } from '../constants/urls';

const accessToken = localStorage.getItem('access_token');
const refreshToken = localStorage.getItem('refresh_token');

const apiClient = axios.create({
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
        const access_token = res.headers.access_token;
        const refresh_token = res.headers.refresh_token;
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);
        return res;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default apiClient;
