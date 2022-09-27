import apiClient from "../core/services/api-service";
import { DataResSuccess, PageableDataResSuccess } from "../core/types/base";
import { CompanyResDTO } from "../models/company-req-dto";

export const getCompanys = async () => {
	const res = await apiClient.get<PageableDataResSuccess<CompanyResDTO[]>>('/organization/page');
	return res.data;
};

export const postCompany = async (object: any) => {
	const res = await apiClient.post<PageableDataResSuccess<CompanyResDTO[]>>('/organization/page', object);
	return res.data;
}

export const putCompany = async (object: any) => {
	const res = await apiClient.put<DataResSuccess<CompanyResDTO[]>>('/organization/page', object);
	return res.data;
}

