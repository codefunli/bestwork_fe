import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleUser } from '../types/user';

interface UserInformation {
    id: number,
    userName: string,
    firstName: string,
    lastName: string,
    uEmail: string,
    enabled: number,
    uTelNo: string,
    uRole: string,
    loginFailedNum: string,
    company: {
        id: number,
        companyName: string,
        cpEmail: string,
        cpTelNo: string,
        taxNo: string,
        city: string,
        district: string,
        ward: string,
        street: string,
        startDate: string,
        expiredDate: string,
        status: number
    },
    project: Array<{
        id: string,
        name: string,
        canView: boolean,
        canEdit: boolean
    }>
}

interface initialUserState {
    isLogined: boolean;
    info: UserInformation;
}

const initialState: initialUserState = {
    isLogined: false,
    info: {
        id: -1,
        userName: '',
        firstName: '',
        lastName: '',
        uEmail: '',
        enabled: 0,
        uTelNo: '',
        uRole: RoleUser.COMPANY_USER,
        loginFailedNum: '',
        company: {
            id: -1,
            companyName: '',
            cpEmail: '',
            cpTelNo: '',
            taxNo: '',
            city: '',
            district: '',
            ward: '',
            street: '',
            startDate: '',
            expiredDate: '',
            status: 0
        },
        project: [
            {
                id: '',
                name: '',
                canView: false,
                canEdit: false
            }
        ]
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogined(state, action: PayloadAction<boolean>) {
            state.isLogined = action.payload;
        },
        setUserInfo(state, action: PayloadAction<UserInformation>) {
            state.info = action.payload;
        },
    },
});

export const userActions = userSlice.actions;

export const getUserInfo = (state: any) => state.user.info;

export default userSlice.reducer;
