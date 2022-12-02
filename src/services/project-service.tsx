import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { PageableDataResSuccess } from '../core/types/base';
import { ProjectResDTO } from '../models/project-res-dto';

export const getProjects = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.GET_LIST, object);
    return res.data;
};

export const deleteProjects = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(UrlServer.PROJECT.DELETE, object);
    return res.data;
};

export const getProject = async (id: string) => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(`${UrlServer.PROJECT.GET_DETAIL}/${id}`);
    return res.data;
};

export const updateProject = async (object: any, projectId: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(
        `${UrlServer.PROJECT.UPDATE}/${projectId}`,
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

export const updateProgress = async (object: any, progressId: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ProjectResDTO[]>>(
        `${UrlServer.PROJECT.UPDATE_PROGRESS}/${progressId}`,
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

export const getUsersAssignListCreate = async (object: any) => {
    const res = await apiClient.post(`${UrlServer.PROJECT.GET_USER_ASSIGN_CREATE}`, object);
    return res.data;
};
export const getProgressByProjectId = async (projectId: any) => {
    const res = await apiClient.get<PageableDataResSuccess<ProjectResDTO[]>>(
        `${UrlServer.PROJECT.GET_PROGRESS_BY_PROJECT_ID}/${projectId}`,
    );
    return res.data;
};

export const getUsersAssignListUpdate = async (object: any) => {
    const res = await apiClient.post(`${UrlServer.PROJECT.GET_USER_ASSIGN_UPDATE}`, object);
    return res.data;
};

export const getProgressStatus = async () => {
    const res = await apiClient.get<any>(`${UrlServer.PROJECT.GET_PROGRESS_STATUS}`);
    return res.data;
};
