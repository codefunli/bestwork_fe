import axios from 'axios';
import { stringify } from 'qs';
import { BASE_API_PATH } from '../constants/urls';

const apiClient = axios.create({
    baseURL: BASE_API_PATH,
    withCredentials: true,
    headers: {
        'content-type': 'application/json',
        prefixToken: 'Bearer',
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

export const get = (url: string, param: any) => {
    axios
        .get(url, param)
        .then((res) => {
            return res;
        })
        .catch((error) => console.log(error));
};
