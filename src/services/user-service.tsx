import apiClient from "../core/services/api-service";
import { UrlServer } from '../core/constants/common';
import { DataResSuccess, PageableDataResSuccess } from "../core/types/base";
import { UserResDto } from "../models/user-res-dto";

export const getUser = async (id: any) => {
    const res = await apiClient.get(`${UrlServer.USER.GET_USER}/${id}`);
    return res.data;
};

export const getUsers = async () => {
    const res = await apiClient.get<PageableDataResSuccess<UserResDto[]>>(UrlServer.USER.GET_USER_LIST);
    return res.data;
};

export const putUser = async (id: any, user: any) => {
    const res = await apiClient.put<DataResSuccess<UserResDto[]>>(`${UrlServer.USER.PUT_USER}/${id}`, user);
    return res.data;
};
