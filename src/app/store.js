import { configureStore } from "@reduxjs/toolkit"
import { loadState, saveState } from "@/utils/localStorage";
import rootReducer from "../app/rootReducer"

const persistedState = loadState();

const store = configureStore({
    reducer: rootReducer,
    preloadedState: persistedState,
});

// Save to localStorage on every state change
store.subscribe(() =>{
    saveState({
        auth: store.getState().auth,
        tasks: store.getState().tasks
    });
})

export default store;