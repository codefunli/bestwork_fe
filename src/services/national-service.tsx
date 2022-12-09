import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess } from '../core/types/base';
import { NationResDto } from '../models/nation-res-dto';

export const getNationalList = async () => {
    const res = await apiClient.get<DataResSuccess<NationResDto[]>>(UrlServer.NATION.GET_LIST);
    return res.data;
};
