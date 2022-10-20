import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { CompanyResDTO } from '../models/company-res-dto';

export const getCompanys = async () => {
    const res = await apiClient.get<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANIES);
    return res.data;
};

export const registerCompany = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.REGISTER, object);
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

export const deleteCompanies = async (object: any) => {
    const res = await apiClient.post<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.DELETE, object);
    return res.data;
};

export const getCompany = async (id: string) => {
    const res = await apiClient.get<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANY + `/${id}`);
    return res.data;
};

export const updateCompany = async (Object: any) => {
    const res = await apiClient.post<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.UPDATE_COMPANY, Object);
    return res.data;
};
