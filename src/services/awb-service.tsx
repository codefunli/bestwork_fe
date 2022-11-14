import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { PageableDataResSuccess } from '../core/types/base';
import { CompanyResDTO } from '../models/company-res-dto';

export const getAwbStatus = async () => {
    const res = await apiClient.get<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.AWB.GET_STATUS);
    return res.data;
};

export const createAirWayBill = async (obj: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.AWB.CREATE_AWB, obj);
    return res.data;
};

export const getAirWayBillList = async (projectId: any) => {
    const res = await apiClient.get<PageableDataResSuccess<CompanyResDTO[]>>(
        `${UrlServer.AWB.GET_AWB_BY_PROJECT_ID}/${projectId}`,
    );
    return res.data;
};
