import apiClient from '../core/services/api-service';
import { UrlServer } from '../core/constants/common';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { UserResDto } from '../models/user-res-dto';

export const getUser = async (id: any) => {
    const res = await apiClient.get(`${UrlServer.USER.USER}/${id}`);
    return res.data;
};

export const getUsers = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<UserResDto[]>>(UrlServer.USER.USERS, object);
    return res.data;
};

export const putUser = async (id: any, user: any) => {
    const res = await apiClient.put<DataResSuccess<UserResDto[]>>(`${UrlServer.USER.USER}/${id}`, user);
    return res.data;
};

export const deleteUsers = async (userIdList: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.USER.DELETE_USERS, userIdList);
    return res.data;
};

export const createUsers = async (user: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.USER.CREATE, user);
    return res.data;
};

export const isCheckLogined = async () => {
    const res = await apiClient.get(`${UrlServer.USER.IS_LOGINED}`);
    return res.data;
};
