import apiClient from "../core/services/api-service";
import { PageableDataResSuccess } from "../core/types/base";
import { UserResDto } from "../models/user-res-dto";

export const getUserInfo = async (id: any) => {
    const res = await apiClient.get(`/user/${id}`);
    return res.data;
}

export const getUsers = async () => {
    const res = await apiClient.get<PageableDataResSuccess<UserResDto[]>>('/users');
    return res.data;
};
