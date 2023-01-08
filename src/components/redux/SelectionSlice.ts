import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {BaseItem, ItemType} from "../admin/model/base/BaseItem";
import {ListPage} from "../admin/model/base/ListPage";
import {VehicleCategory} from "../admin/model/VehicleCategory";
import {Vehicle} from "../admin/model/Vehicle";
import {Customer} from "../admin/model/Customer";
import {Location} from "../admin/model/Location";

export interface SelectionState<T extends BaseItem> {
    refreshTime: number | null,
    selectTime: number | null,
    sortedBy: string | undefined,
    sortedAscending: boolean,
    searchText: string,
    pageSize: number | undefined,
    currentPage: number | undefined,
    error: string | null | undefined,
    fetching: boolean,
    listPage: ListPage<T> | undefined,
    selectedItem: T | undefined
}

interface SelectionStates {
    isMobile: boolean,
    categoriesSelectionState: SelectionState<VehicleCategory>,
    vehiclesSelectionState: SelectionState<Vehicle>,
    customerSelectionState: SelectionState<Customer>,
    locationSelectionState: SelectionState<Location>,
}

const initialState: SelectionStates = {
    isMobile: (window.innerWidth <= 992),
    vehiclesSelectionState: {
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: "registrationNumber",
        sortedAscending: true,
        searchText: "",
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        selectedItem: undefined
    },
    categoriesSelectionState: {
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: "name",
        sortedAscending: true,
        searchText: "",
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        selectedItem: undefined
    },
    customerSelectionState: {
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: "name",
        sortedAscending: true,
        searchText: "",
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        selectedItem: undefined
    },
    locationSelectionState: {
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: "name",
        sortedAscending: true,
        searchText: "",
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        selectedItem: undefined
    },
}

export interface SelectionAction<T extends BaseItem> {
    itemType: ItemType,
    id?: number,
    sortBy?: string,
    searchText?: string,
    pageSize?: number,
    currentPage?: number
    error?: string,
    listPage?: ListPage<T> | undefined,
    item?: T | undefined
}

export const SelectionSlice = createSlice({
    name: 'selectionSlice',
    initialState,
    reducers: {
        itemSaved: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = action.payload.item;
            selectionState.selectTime = Date.now();
            selectionState.refreshTime = Date.now();
        },
        itemAdded: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = action.payload.item;
            selectionState.refreshTime = Date.now();
        },
        itemDeleted: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = null;
            selectionState.refreshTime = Date.now();
        },
        itemClosed: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = null;
        },
        refreshItems: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = null;
            selectionState.refreshTime = Date.now();
        },
        setSortItemsBy: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            if (selectionState.sortedBy === action.payload.sortBy) {
                selectionState.sortedAscending = !selectionState.sortedAscending;
            } else {
                selectionState.sortedBy = action.payload.sortBy;
            }
            selectionState.selectedItem = null;
            selectionState.refreshTime = Date.now();
        },
        setSearchItemsText: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.searchText = action.payload.searchText ? action.payload.searchText : "";
        },
        clearSearchItemsText: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.searchText = "";
        },
        setItemsPageSize: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.pageSize = action.payload.pageSize;
            selectionState.currentPage = 0;
            selectionState.selectedItem = null;
            selectionState.refreshTime = Date.now();
        },
        setItemsCurrentPage: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = null;
            selectionState.currentPage = action.payload.currentPage;
        },
        clearItemsFetchError: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.error = null;
        },
        setItemsFetchError: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.error = action.payload.error;
        },
        setFetchingItems: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.fetching = true;
        },
        setFetchingItemsComplete: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.fetching = false;
        },
        setItemsResultPage: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.listPage = action.payload.listPage;
        },
        setItem: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedItem = action.payload.item;
        },
        setIsMobile: (state, action: PayloadAction<number>) => {
            state.isMobile = (action.payload <= 992)
        }
    },
})

const getSelectionState = (state: Draft<SelectionStates>, itemType: ItemType) => {
    switch (itemType) {
        case "vehicle":
            return state.vehiclesSelectionState;
        case "customer":
            return state.customerSelectionState;
        case "location":
            return state.locationSelectionState;
        case "category":
            return state.categoriesSelectionState;
        default:
            throw new Error("The Type " + itemType + " is not defined in the Selection Slice");
    }
}

export const {
    itemSaved,
    itemAdded,
    itemDeleted,
    itemClosed,
    refreshItems,
    setSortItemsBy,
    setSearchItemsText,
    clearSearchItemsText,
    setItemsPageSize,
    setItemsCurrentPage,
    clearItemsFetchError,
    setItemsFetchError,
    setFetchingItems,
    setFetchingItemsComplete,
    setItemsResultPage,
    setItem,
    setIsMobile
} = SelectionSlice.actions

export const getCategoriesSelectionState = (state: RootState) => state.selections.categoriesSelectionState;
export const getVehicleSelectionState = (state: RootState) => state.selections.vehiclesSelectionState;
export const getCustomerSelectionState = (state: RootState) => state.selections.customerSelectionState;
export const getLocationSelectionState = (state: RootState) => state.selections.locationSelectionState;
export const isMobile = (state: RootState) => state.selections.isMobile;

export default SelectionSlice.reducer
