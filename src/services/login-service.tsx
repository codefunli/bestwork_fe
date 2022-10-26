import apiClient from '../core/services/api-service';
import { UrlServer } from '../core/constants/common';

export const login = async (object: any) => {
    const res = await apiClient.post(`${UrlServer.API_LOGIN_URL}`, object);
    return res;
};
