import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Monitor {
    createdDate: string;
    createUser: string;
    icon: string;
    id: number;
    name: string;
    updatedDate: string;
    updatedUser: string;
    url: string;
}

interface InitialState {
    monitor: Array<Monitor>;
}

const initialState: InitialState = {
    monitor: [
        {
            createdDate: '',
            createUser: '',
            icon: '',
            id: -1,
            name: '',
            updatedDate: '',
            updatedUser: '',
            url: '',
        },
    ],
};

export const monitorSlice = createSlice({
    name: 'monitor',
    initialState,
    reducers: {
        setMonitor(state, action: PayloadAction<Array<Monitor>>) {
            state.monitor = action.payload;
        },
    },
});

export const monitorActions = monitorSlice.actions;

export const getMonitorRedux = (state: any) => state.monitor.monitor;

export default monitorSlice.reducer;
