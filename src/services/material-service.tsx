import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';

export const postMaterialStatus = async (object: any) => {
    const res = await apiClient.post<any>(UrlServer.MATERIAL.POST_STATUS, object);
    return res.data;
};

export const getPostByProjectId = async (projectId: any) => {
    const res = await apiClient.get<any>(`${UrlServer.MATERIAL.GET_POST_BY_PROJECT_ID}/${projectId}`);
    return res.data;
};
