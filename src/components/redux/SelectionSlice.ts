import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {ObjectType} from "../model/BaseModelObject";

export interface SelectionState {
    selectedId: number | null | undefined,
    refreshTime: number | null,
    selectTime: number | null,
    sortedBy: string | undefined,
    sortedAscending: boolean,
    searchText: string | undefined,
    pageSize: number | undefined,
    currentPage: number | undefined,
    error: string | null | undefined,
    fetching: boolean
}

const initialSelectionState: SelectionState = {
    selectedId: null,
    refreshTime: Date.now(),
    selectTime: null,
    sortedBy: undefined,
    sortedAscending: true,
    searchText: undefined,
    pageSize: 5,
    currentPage: 0,
    error: undefined,
    fetching: false,
}

interface SelectionStates {
    categoriesSelectionState: SelectionState
}

const initialState: SelectionStates = {
    categoriesSelectionState: initialSelectionState
}

interface SelectionAction {
    objectType: ObjectType,
    id?: number,
    sortBy?: string,
    searchText?: string,
    pageSize?: number,
    currentPage?: number
    error?: string
}

export const SelectionSlice = createSlice({
    name: 'selectionSlice',
    initialState,
    reducers: {
        vehicleCategorySelected: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = action.payload.id;
            selectionState.selectTime = Date.now();
        },
        vehicleCategorySaved: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = action.payload.id;
            selectionState.selectTime = Date.now();
            selectionState.refreshTime = Date.now();
        },
        vehicleCategoryAdded: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = action.payload.id;
            selectionState.refreshTime = Date.now();
        },
        vehicleCategoryDeleted: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        vehicleCategoryClosed: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = null;
        },
        refreshVehicleCategories: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setSortVehicleCategoriesBy: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            if (selectionState.sortedBy === action.payload.sortBy) {
                selectionState.sortedAscending = !selectionState.sortedAscending;
            } else {
                selectionState.sortedBy = action.payload.sortBy;
            }
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setSearchText: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.searchText = action.payload.searchText;
        },
        clearSearchText: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.searchText = "";
        },
        setPageSize: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.pageSize = action.payload.pageSize;
            selectionState.currentPage = 0;
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setCurrentPage: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.selectedId = null;
            selectionState.currentPage = action.payload.currentPage;
        },
        clearError: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.error = null;
        },
        setError: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.error = action.payload.error;
        },
        setFetching: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.fetching = true;
        },
        setFetchingComplete: (state, action: PayloadAction<SelectionAction>) => {
            const selectionState: SelectionState = getSelectionState(state, action.payload.objectType);
            selectionState.fetching = false;
        }
    },
})

const getSelectionState = (state: Draft<SelectionStates>, objectType: ObjectType) => {
    switch (objectType) {
        case "CATEGORY":
            return state.categoriesSelectionState;
        default:
            return state.categoriesSelectionState;
    }
}

export const {
    vehicleCategorySelected,
    vehicleCategorySaved,
    vehicleCategoryAdded,
    vehicleCategoryDeleted,
    vehicleCategoryClosed,
    refreshVehicleCategories,
    setSortVehicleCategoriesBy,
    setSearchText,
    clearSearchText,
    setPageSize,
    setCurrentPage,
    clearError,
    setError,
    setFetching,
    setFetchingComplete
} = SelectionSlice.actions

export const getCategoriesSelectionState = (state: RootState) => state.selections.categoriesSelectionState;

export default SelectionSlice.reducer