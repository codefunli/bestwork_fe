import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface InitialState {
    isAppLoading: boolean;
    isPageLoading: boolean;
    header: {};
    config: {
		language: string;
	};
	errCode: string;
}

const initialState : InitialState = {
    isAppLoading: true,
    isPageLoading: false,
    header: {},
    config: {
        language: '',
    },
    errCode: '',
}

export const appSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setAppLoading(state, action: PayloadAction<boolean>) {
            console.log("Action: " + action.payload);
            state.isAppLoading = action.payload;
        }
    }
});

export const appAction = appSlice.actions;
export default appSlice.reducer;