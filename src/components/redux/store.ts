import {combineReducers, configureStore} from '@reduxjs/toolkit'
import SelectionSlice from "./SelectionSlice";

const rootReducer = combineReducers({
    selections: SelectionSlice,
})

export function setupStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export type AppStore = ReturnType<typeof setupStore>