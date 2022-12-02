import { UrlServer } from '../core/constants/common';
import apiClient from '../core/services/api-service';
import { DataResSuccess, PageableDataResSuccess } from '../core/types/base';
import { NotificationsResDTO } from '../models/notifications-dto';

export const getNotifications = async (object: any) => {
    const res = await apiClient.post<PageableDataResSuccess<NotificationsResDTO[]>>(
        UrlServer.NOTIFICATIONS.GET_LIST,
        object,
    );
    return res.data;
};

export const changeStatus = async (id: any) => {
    const res = await apiClient.patch<any>(`${UrlServer.NOTIFICATIONS.CHANGE_STATUS}/${id}`);
    return res.data;
};

//change url delete
export const deleteNotifications = async (listId: any) => {
    const res = await apiClient.post<DataResSuccess<NotificationsResDTO[]>>(UrlServer.NOTIFICATIONS.GET_LIST, listId);
    return res.data;
};
