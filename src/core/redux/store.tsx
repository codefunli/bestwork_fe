import { configureStore } from '@reduxjs/toolkit';
import appSlice from './app-slice';
import customsClearanceSlice from './customs-clearance-slice';
import userSlice from './user-slice';

export const store = configureStore({
    reducer: {
        app: appSlice,
        user: userSlice,
        customsClearance: customsClearanceSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
