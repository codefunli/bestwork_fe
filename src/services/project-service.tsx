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

export const getProjectById = async (id: string) => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(`${UrlServer.PROJECT.GET_BY_ID}/${id}`);
    return res.data;
};

export const updateProject = async (object: any) => {
    const res = await apiClient.patch<PageableDataResSuccess<ProjectResDTO[]>>(
        `${UrlServer.PROJECT.UPDATE}/${object.id}`,
        object,
    );
    return res.data;
};

export const createProject = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.CREATE, object);
    return res.data;
};

export const createProgress = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(
        UrlServer.PROJECT.CREATE_PROGRESS,
        object,
    );
    return res.data;
};

export const updateProgress = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(
        UrlServer.PROJECT.UPDATE_PROGRESS,
        object,
    );
    return res.data;
};

export const getProjectTypes = async () => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.GET_TYPE);
    return res.data;
};

export const getProjectStatus = async () => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.GET_STATUS);
    return res.data;
};
