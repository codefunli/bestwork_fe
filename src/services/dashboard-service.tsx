import { UrlServer } from "../core/constants/common";
import apiClient from "../core/services/api-service";

export const countAwb = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.COUNT_AWB}`);
    return res.data;
};

export const countCompany = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.COUNT_COMPANY}`);
    return res.data;
};

export const countProject = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.COUNT_PROJECT}`);
    return res.data;
};

export const countConstruction = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.COUNT_CONSTRUCTION}`);
    return res.data;
};

export const getProjConstr = async (year: any) => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.GET_PROJ_CONSTR}/${year}`);
    return res.data;
};

export const getAwbStatusData = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.GET_AWB_STATUS}`);
    return res.data;
};

export const getLatestProgress = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.GET_LATEST_PROGRESS}`);
    return res.data;
};

export const getTopLocation = async () => {
    const res = await apiClient.get<any>(`${UrlServer.DASHBOARD.GET_TOP_LOCATION}`);
    return res.data;
};