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

export const addFileToCustomsClearance = async (data: any) => {
    const res = await apiClient.post<any>(`${UrlServer.AWB.ADD_FILE_TO_CUSTOMS_CLEARANCE}`, data);
    return res.data;
};

export const getAllCustomsClearanceDocument = async (awbCode: any) => {
    const res = await apiClient.get<any>(
        `${UrlServer.AWB.GET_ALL_CUSTOMS_CLEARANCE_DOCUMENT}/${awbCode}/get-custom-clearance-doc`,
    );
    return res.data;
};

export const getAllPackingList = async (awbCode: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.GET_ALL_PACKING_LIST}/${awbCode}`);
    return res.data;
};

export const uploadPackingList = async (formData: any, description: any, awbCode: string) => {
    const res = await apiClient.patch<any>(
        `${UrlServer.AWB.UPLOAD_PACKING_LIST}/${awbCode}?packageDescription=${description}`,
        formData,
    );
    return res.data;
};

export const downloadCCD = async (awbCode: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.DOWNLOAD_CCD}/${awbCode}/download-clearance-doc`);
    return res.data;
};

export const getPdfFile = async (object: any) => {
    const res = await apiClient.post<any>(`${UrlServer.AWB.GET_PDF_FILE}`, object);
    return res.data;
};

export const changeAwbStatus = async (object: any, awbCode: string) => {
    const res = await apiClient.post<any>(`${UrlServer.AWB.CHANGE_AWB_STATUS}/${awbCode}/change-status`, object);
    return res.data;
};

export const addInvoicePostComment = async (object: any, postId: string) => {
    const res = await apiClient.patch<any>(`${UrlServer.AWB.ADD_INVOICE_POST_COMMENT}/${postId}/comment`, object);
    return res.data;
};

export const addPackingPostComment = async (object: any, postId: string) => {
    const res = await apiClient.patch<any>(`${UrlServer.AWB.ADD_PACKING_POST_COMMENT}/${postId}/comment`, object);
    return res.data;
};

export const getAllImageBefore = async (awbCode: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.GET_ALL_IMAGE_BEFORE}/${awbCode}`);
    return res.data;
};

export const uploadImageBefore = async (formData: any) => {
    const res = await apiClient.patch<any>(`${UrlServer.AWB.UPLOAD_IMAGE_BEFORE}`, formData);
    return res.data;
};

export const addImageBeforeComment = async (object: any, postId: string) => {
    const res = await apiClient.patch<any>(`${UrlServer.AWB.ADD_IMAGE_BEFORE_COMMENT}/${postId}/comment`, object);
    return res.data;
};

export const getAllImageAfter = async (awbCode: string) => {
    const res = await apiClient.get<any>(`${UrlServer.AWB.GET_ALL_IMAGE_AFTER}/${awbCode}`);
    return res.data;
};
