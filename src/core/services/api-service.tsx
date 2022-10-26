import axios from 'axios';
import { stringify } from 'qs';
import { BASE_API_PATH } from '../constants/urls';

const apiClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        prefix: 'Bearer',
    },
    paramsSerializer(params: any) {
        return stringify(params);
    },
});

apiClient.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        return Promise.reject(err);
    },
);

export default apiClient;
