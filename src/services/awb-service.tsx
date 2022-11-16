import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';

export const getAwbStatus = async () => {
    const res = await apiClient.get<any>(UrlServer.AWB.GET_STATUS);
    return res.data;
};

export const createAirWayBill = async (obj: any) => {
    const res = await apiClient.post<any>(UrlServer.AWB.CREATE_AWB, obj);
    return res.data;
};

export const getAirWayBillByProjectId = async (projectId: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.GET_AWB_BY_PROJECT_ID}/${projectId}`);
    return res.data;
};

export const uploadCommercialInvoice = async (formData: any, description: any, awbCode: string) => {
    const res = await apiClient.patch<any>(
        `${UrlServer.AWB.UPDATE_INVOICE}/${awbCode}?invoiceDescription=${description}`,
        formData,
    );
    return res.data;
};

export const getAllCommercialInvoice = async (awbCode: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.GET_ALL_INVOICE}/${awbCode}`);
    return res.data;
};
