import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { CompanyResDTO } from '../models/company-res-dto';

export const getCompanys = async () => {
    const res = await apiClient.get<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANIES);
    return res.data;
};

export const postCompany = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.POST, object);
    return res.data;
};

export const getCompanies = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANIES, object);
    return res.data;
};

export const putCompany = async (object: any) => {
    const res = await apiClient.put<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANIES, object);
    return res.data;
};
