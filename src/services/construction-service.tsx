import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { StatusResDTO } from '../models/common-res-dto';
import { ConstructionResDTO } from '../models/construction-res-dto';

export const getConstructions = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<ConstructionResDTO[]>>(
        UrlServer.CONSTRUCTION.GET_LIST,
        object,
    );
    return res.data;
};

export const getConstructionStatus = async () => {
    const res = await apiClient.get<PageableDataResSuccess<StatusResDTO[]>>(UrlServer.CONSTRUCTION.GET_STATUS);
    return res.data;
};

export const deleteConstructions = async (listId: any) => {
    const res = await apiClient.post<DataResSuccess<ConstructionResDTO[]>>(UrlServer.CONSTRUCTION.DELETE, listId);
    return res.data;
};

export const getConstruction = async (id: any) => {
    const res = await apiClient.get(`${UrlServer.CONSTRUCTION.DETAIL}/${id}`);
    return res.data;
};
