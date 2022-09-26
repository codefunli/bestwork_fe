import { UrlApiPaths } from "../core/constants/common"
import apiClient, { get } from "../core/services/api-service";
import { PageableDataResSuccess } from "../core/types/base";
import { UserInfoRes } from "../core/types/user";

export const getUserInfo = async () => {
    const res = await get(UrlApiPaths.USER_INFO, null);
    return res;
}

export const getUsers = async () => {
	const res = await apiClient.get<PageableDataResSuccess<UserInfoRes[]>>('/users');
	return res.data;
};
