import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { PageableDataResSuccess } from '../core/types/base';
import { ProjectResDTO } from '../models/project-res-dto';

export const getProjects = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.GET, object);
    return res.data;
};

export const deleteProjects = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.DELETE, object);
    return res.data;
};

export const getProject = async (id: string) => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(`${UrlServer.PROJECT.GET}/${id}`);
    return res.data;
};

export const updateProject = async (object: any) => {
    const res = await apiClient.put<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.UPDATE, object);
    return res.data;
};

export const createProject = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.CREATE, object);
    return res.data;
};
