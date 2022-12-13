import apiClient from '../core/services/api-service';
import { UrlServer } from '../core/constants/common';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { UserResDto } from '../models/user-res-dto';
import { PermissionResDTO } from '../models/permission-res-dto';
import { MonitorResDTO } from '../models/monitor-res-dto';
import { RoleResDto } from '../models/role-res-dto';

export const getRoles = async () => {
    const res = await apiClient.get<DataResSuccess<RoleResDto[]>>(UrlServer.ROLE.GET_ALL);
    return res.data;
};

export const getPermissionsList = async (id: any) => {
    const res = await apiClient.get<DataResSuccess<PermissionResDTO[]>>(`${UrlServer.ROLE.PERMISSIONS}/${id}`);
    return res.data;
};

export const createRole = async (role: any) => {
    const res = await apiClient.post<DataResSuccess<UserResDto[]>>(UrlServer.ROLE.CREATE, role);
    return res.data;
};

export const createScreen = async (screen: any) => {
    const res = await apiClient.post<DataResSuccess<MonitorResDTO>>(UrlServer.ROLE.SCREEN, screen);
    return res.data;
};

export const updateScreen = async (screen: any) => {
    const res = await apiClient.put<DataResSuccess<MonitorResDTO>>(UrlServer.ROLE.SCREEN, screen);
    return res.data;
};

export const deleteScreen = async (id: string) => {
    const res = await apiClient.delete<DataResSuccess<MonitorResDTO>>(`${UrlServer.ROLE.SCREEN}/${id}`);
    return res.data;
};

export const updateRole = async (role: any) => {
    const res = await apiClient.put<DataResSuccess<RoleResDto[]>>(UrlServer.ROLE.UPDATE, role);
    return res.data;
};

export const deleteRole = async (roleId: any) => {
    const res = await apiClient.post<DataResSuccess<any>>(UrlServer.ROLE.DELETE, roleId);
    return res.data;
};

export const updatePermissions = async (object: any) => {
    const res = await apiClient.post<DataResSuccess<PermissionResDTO[]>>(UrlServer.ROLE.PERMISSIONS, object);
    return res.data;
};
