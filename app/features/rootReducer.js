import serverConfig from '@/app/features/serverConfig/serverConfigSlice';
import { combineReducers } from "@reduxjs/toolkit";

const combinedReducers = combineReducers({
    serverConfig
});

const rootReducer = (state, action) => {
    switch (action.type) {
        case 'REPLACE_STATE':
            return action.payload
    }

    return combinedReducers(state ?? undefined, action);
}

export default rootReducer;