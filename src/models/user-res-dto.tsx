export interface UserResDto {
    id: number,
    userId: string,
    currentCompanyId: string,
    enabled: boolean,
    role: string,
    userNm: string,
    email: string,
    firstNm: string,
    lastNm: string,
    isDeleted: boolean,
    isBlocked: boolean,
    countLoginFailed: number,
    createdDt: string,
    updatedDt: string,
}

export interface UserItemResDto {
    id: number,
    userId: string,
    currentCompanyId: number,
    userName: string,
    password: string,
    firstNm: string,
    lastNm: string,
    enabled: boolean,
    countLoginFailed: number,
    updatedDt: string,
    token: string,
    role: string,
    deleted: boolean,
    uEmail: string,
    uTelNo: string
}
