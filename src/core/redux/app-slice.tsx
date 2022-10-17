import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isShowMsgErrLogin: boolean;
    isPageLoading: boolean;
    header: {};
    config: {
        language: string;
    };
    errCode: string;
}

const initialState: InitialState = {
    isShowMsgErrLogin: false,
    isPageLoading: false,
    header: {},
    config: {
        language: '',
    },
    errCode: '',
};

export const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setIsPageLoading(state, action: PayloadAction<boolean>) {
            console.log('Action: ' + action.payload);
            state.isPageLoading = action.payload;
        },
        setIsShowMsgErrLogin(state, action: PayloadAction<boolean>) {
            console.log('Action: ' + action.payload);
            state.isShowMsgErrLogin = action.payload;
        },
    },
});

export const appAction = appSlice.actions;
export default appSlice.reducer;
