import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../redux/store'
import {stat} from "fs";

interface VehicleCategoriesState {
    selectedId: number | null,
    refreshTime: number | null,
    selectTime: number | null,
    sortedBy: string,
    sortedAscending: boolean
}

const initialState: VehicleCategoriesState = {
    selectedId: null,
    refreshTime: Date.now(),
    selectTime: null,
    sortedBy: "name",
    sortedAscending: true
} as VehicleCategoriesState

export const VehicleCategorySlice = createSlice({
    name: 'vehicleCategories',
    initialState,
    reducers: {
        vehicleCategorySelected: (state, action: PayloadAction<number | null>) => {
            state.selectedId = action.payload;
            state.selectTime = Date.now();
        },
        vehicleCategorySaved: (state, action: PayloadAction<number | null>) => {
            state.selectedId = action.payload;
            state.selectTime = Date.now();
            state.refreshTime = Date.now();
        },
        vehicleCategoryAdded: (state, action: PayloadAction<number>) => {
            state.selectedId = action.payload;
            state.refreshTime = Date.now();
        },
        vehicleCategoryDeleted: (state) => {
            state.selectedId = null;
            state.refreshTime = Date.now();
        },
        vehicleCategoryClosed: (state) => {
            state.selectedId = null;
        },
        refreshVehicleCategories: (state) => {
            state.selectedId = null;
            state.refreshTime = Date.now();
        },
        setSortVehicleCategoriesBy: (state, action: PayloadAction<string>) => {
            if (state.sortedBy === action.payload) {
                state.sortedAscending = !state.sortedAscending;
            } else {
                state.sortedBy = action.payload;
            }
            state.selectedId = null;
            state.refreshTime = Date.now();
        }
    },
})

export const {
    vehicleCategorySelected,
    vehicleCategorySaved,
    vehicleCategoryAdded,
    vehicleCategoryDeleted,
    vehicleCategoryClosed,
    refreshVehicleCategories,
    setSortVehicleCategoriesBy
} = VehicleCategorySlice.actions

export const getSelectedId = (state: RootState) => state.vehicleCategories.selectedId;
export const getSelectedTime = (state: RootState) => state.vehicleCategories.selectTime;
export const getRefreshTime = (state: RootState) => state.vehicleCategories.refreshTime;
export const getSortedBy = (state: RootState) => state.vehicleCategories.sortedBy;
export const getSortedAscending = (state: RootState) => state.vehicleCategories.sortedAscending;

export default VehicleCategorySlice.reducer