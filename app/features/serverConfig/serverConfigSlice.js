import { createSlice } from "@reduxjs/toolkit";

export const serverConfigSlice = createSlice({
    name: 'serverConfig',
    initialState: {
        baseUrl: null
    },
    reducers: {
        setBaseUrl: (state, action) => {
            state.baseUrl = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setOrgID: (state, action) => {
            state.orgID = action.payload;
        },
        setDatabase: (state, action) => {
            state.database = action.payload;
        },
        setCompanyName: (state, action) => {
            state.companyName = action.payload;
        }
    }
});

export const serverConfigSliceActions = serverConfigSlice.actions;

export default serverConfigSlice.reducer; 