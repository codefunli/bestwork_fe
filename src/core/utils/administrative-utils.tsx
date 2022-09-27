import districts from 'hanhchinhvn/dist/quan_huyen.json';
import wards from 'hanhchinhvn/dist/xa_phuong.json';
import { isObjectEmpty } from './object-utils';

export const getDistrictsByCityCode = (cityCode:string) => {
    if (isObjectEmpty(cityCode)) {
        return [];
    }

    return Object.values(districts)
        .filter(district => district.parent_code === cityCode);
}

export const getWardsByDistrictCode = (districtCode:string) => {
    if (isObjectEmpty(districtCode)) {
        return [];
    }

    return Object.values(wards)
        .filter(ward => ward.parent_code === districtCode);
}