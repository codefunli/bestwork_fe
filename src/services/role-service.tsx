import apiClient from '../core/services/api-service';
import { UrlServer } from '../core/constants/common';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { UserResDto } from '../models/user-res-dto';

export const getRoles = async () => {
    const res = await apiClient.get<PageableDataResSuccess<UserResDto[]>>(UrlServer.ROLE.GET);
    return res.data;
};

export const getPermissionsList = async () => {
    const res = await apiClient.get<PageableDataResSuccess<UserResDto[]>>(UrlServer.ROLE.PERMISSIONS);
    return res.data;
};

export const createRole = async (role: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.ROLE.CREATE, role);
    return res.data;
};

export const createScreen = async (screen: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.ROLE.SCREEN, screen);
    return res.data;
};

export const updateRole = async (id: any, role: any) => {
    const res = await apiClient.put<DataResSuccess<UserResDto[]>>(`${UrlServer.ROLE.UPDATE}/${id}`, role);
    return res.data;
};

export const deleteRole = async (roleId: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.ROLE.DELETE, roleId);
    return res.data;
};
