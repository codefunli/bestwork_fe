import { isArrayEmpty } from "../utils/object-utils";

export const SUCCESS_MSG = {
    S01_001:"Retrieve data is successfully",
    S01_002:"Registration data is successfully",
    S01_003:"Updation data is successfully",
    S01_004:"Deletion data is successfully",
}

export const ERROR_MSG = {
    E01_001:'{0} is required'
}

export const getMessage = (msg:string, params:any[]) => {
    if (isArrayEmpty(params)) {
        return msg;
    }

    params.map((param, index) => {
        msg = msg.replace(`{${index}}`, param);
    });

    return msg
}