import {configureStore} from '@reduxjs/toolkit'
import SelectionSlice from "./SelectionSlice";

export const store = configureStore({
    reducer: {
        selections: SelectionSlice,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch