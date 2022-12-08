import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess } from '../core/types/base';
import { MonitorResDTO } from '../models/monitor-res-dto';

export const getMonitor = async () => {
    const res = await apiClient.get<DataResSuccess<MonitorResDTO[]>>(UrlServer.MONITOR.GET_LIST);
    return res.data;
};
