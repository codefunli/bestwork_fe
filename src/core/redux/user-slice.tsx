import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RoleUser } from '../types/user';

export interface UserInfo {
    id: number;
    userId: string;
    currentOrgId: number;
    userName: string;
    role: RoleUser;
    email: string;
    firstName: string;
    lastName: string;
    isDeleted: boolean;
    createdDt: string;
    createdPrgId: string;
    updatedDt: string;
    updatedPrgId: string;
}

interface initialUserState {
    isLogined: boolean;
    info: UserInfo;
}

const initialState: initialUserState = {
    isLogined: false,
    info: {
        id: -1,
        userId: '',
        currentOrgId: -1,
        userName: '',
        role: RoleUser.ORG_USER,
        email: '',
        firstName: '',
        lastName: '',
        isDeleted: false,
        createdDt: '',
        createdPrgId: '',
        updatedDt: '',
        updatedPrgId: '',
    },
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLogined(state, action: PayloadAction<boolean>) {
            state.isLogined = action.payload;
        },
    },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
