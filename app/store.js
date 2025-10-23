import { configureStore } from "@reduxjs/toolkit";
import rootReducer from '@/app/features/rootReducer';

export function getState() {
    try {
        const serializedState = localStorage.getItem('appState');
        if (serializedState === null) return null;
        return JSON.parse(serializedState);
    } catch (err) {
        console.error("Failed to load state from localStorage:", err);
        return null;
    }

}

export function loadState(store) {
    const state = getState();
    store.dispatch({
        type: 'REPLACE_STATE',
        payload: state
    });
};

const localStorageMiddleware = storeAPI => next => action => {
    // Call the next dispatch method in the middleware chain.
    const result = next(action);

    // Save the updated state to localStorage after the action is processed.
    var state = storeAPI.getState();
    if (state == null) {
        localStorage.removeItem('appState');
        return result;
    }
    localStorage.setItem('appState', JSON.stringify(state));

    return result;
};

export default configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});