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

export const postComment = async (postId: string, projectId: string, object: any) => {
    const res = await apiClient.patch<any>(
        `${UrlServer.MATERIAL.POST_COMMENT}/${postId}/project/${projectId}/comment`,
        object,
    );
    return res.data;
};

export const getPostByPostId = async (postId: string, projectId: string) => {
    const res = await apiClient.get<any>(`${UrlServer.MATERIAL.POST_COMMENT}/${projectId}/detail/${postId}`);
    return res.data;
};

export const updatePost = async (postId: string, projectId: string, obj: any) => {
    const res = await apiClient.patch<any>(`${UrlServer.MATERIAL.UPDATE_POST}/${projectId}/update/${postId}`, obj);
    return res.data;
};
