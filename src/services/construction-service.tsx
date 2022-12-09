import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { StatusResDTO } from '../models/common-res-dto';
import { CompanyResDTO } from '../models/company-res-dto';
import {
    ConstructionResDTO,
    ContructionProgressResDTO,
    ProgressByConstrucionDTO,
} from '../models/construction-res-dto';
import { NationResDto } from '../models/nation-res-dto';
import { ProjectResDTO } from '../models/project-res-dto';

export const getConstructions = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ConstructionResDTO[]>>(
        UrlServer.CONSTRUCTION.GET_LIST,
        object,
    );
    return res.data;
};

export const getConstructionStatus = async () => {
    const res = await apiClient.get<DataResSuccess<StatusResDTO[]>>(UrlServer.CONSTRUCTION.GET_STATUS);
    return res.data;
};

export const deleteConstructions = async (ids: any) => {
    const res = await apiClient.post<DataResSuccess<ConstructionResDTO[]>>(UrlServer.CONSTRUCTION.DELETE, ids);
    return res.data;
};

export const getConstruction = async (id: any) => {
    const res = await apiClient.get<DataResSuccess<ConstructionResDTO[]>>(`${UrlServer.CONSTRUCTION.DETAIL}/${id}`);
    return res.data;
};

export const registerConstruction = async (obj: any) => {
    const res = await apiClient.post<any>(UrlServer.CONSTRUCTION.CREATE, obj);
    return res.data;
};

export const updateConstruction = async (id: any, obj: any) => {
    const res = await apiClient.patch<any>(`${UrlServer.CONSTRUCTION.UPDATE}/${id}`, obj);
    return res.data;
};

export const getProgressByConstruction = async (constructionId: any) => {
    const res = await apiClient.get<DataResSuccess<ContructionProgressResDTO[]>>(
        `${UrlServer.CONSTRUCTION.PROGRESS_BY_CONSTRUCTION}/${constructionId}`,
    );
    return res.data;
};

export const createProgress = async (obj: any) => {
    const res = await apiClient.post<any>(UrlServer.CONSTRUCTION.CREATE_PROGRESS, obj);
    return res.data;
};

export const getProgressStatus = async () => {
    const res = await apiClient.get<any>(`${UrlServer.CONSTRUCTION.GET_PROGRESS_STATUS}`);
    return res.data;
};

export const updateProgress = async (object: any, progressId: any) => {
    const res = await apiClient.post<any>(`${UrlServer.CONSTRUCTION.UPDATE_PROGRESS}/${progressId}`, object);
    return res.data;
};

export const getCompaniesConstruction = async () => {
    const res = await apiClient.get<DataResSuccess<CompanyResDTO[]>>(UrlServer.CONSTRUCTION.GET_COMPANIES);
    return res.data;
};

export const getProjectsConstruction = async () => {
    const res = await apiClient.get<DataResSuccess<ProjectResDTO[]>>(UrlServer.CONSTRUCTION.GET_PROJECTS);
    return res.data;
};

export const getNationalConstruction = async () => {
    const res = await apiClient.get<DataResSuccess<NationResDto[]>>(UrlServer.CONSTRUCTION.GET_NATIONS);
    return res.data;
};
