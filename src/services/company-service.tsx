import { object } from 'yup';
import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { CompanyResDTO } from '../models/company-res-dto';

export const registerCompany = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.REGISTER, object);
    return res.data;
};

export const getCompanies = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANIES, object);
    return res.data;
};

export const deleteCompanies = async (object: any) => {
    const res = await apiClient.post<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.DELETE, object);
    return res.data;
};

export const getCompanyById = async (id: string) => {
    const res = await apiClient.get<DataResSuccess<CompanyResDTO[]>>(UrlServer.COMPANY.GET_COMPANY_BY_ID + `/${id}`);
    return res.data;
};

export const updateCompany = async (Object: any) => {
    const res = await apiClient.put<DataResSuccess<CompanyResDTO[]>>(
        UrlServer.COMPANY.UPDATE_COMPANY + `/${Object.id}`,
        Object,
    );
    return res.data;
};
