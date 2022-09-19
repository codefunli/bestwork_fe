import axios from 'axios';
import { CharacterConstants } from '../constants/common';

export const get = (url:string, param:any) => {
    axios.get(url, param).then(res => {
        return res;
    }).catch(error => console.log(error));
}

export const post = (url:string, data: any) => {
    axios.post(url, data)
    .then(res => {
        return res;
    }).catch(error => console.log(error));
}

export const put = (url:string, data: any) => {
    axios.put(url, data)
    .then(res => {
        return res;
    }).catch(error => console.log(error));
}

export const deleteById = (url:string, id:number) => {
    var urlDelete = url + CharacterConstants.SLASH + id;
    axios.delete(urlDelete)
    .then(res => {
        return res;
    }).catch(error => console.log(error));
}