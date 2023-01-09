import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from '../../redux/store'
import {BaseItem, ItemType} from "../model/base/BaseItem";
import {ListPage} from "../model/base/ListPage";
import {VehicleCategory} from "../model/VehicleCategory";
import {Vehicle} from "../model/Vehicle";
import {Customer} from "../model/Customer";
import {Location} from "../model/Location";
import {Driver} from "../model/Driver";

export interface AdminState<T extends BaseItem> {
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

interface AdminStates {
    isMobile: boolean,
    categoriesState: AdminState<VehicleCategory>,
    vehiclesState: AdminState<Vehicle>,
    customersState: AdminState<Customer>,
    locationsState: AdminState<Location>,
    driversState: AdminState<Driver>,
}

const getInitialAdminState = <T extends BaseItem>(sortedBy: string) => {
    const result: AdminState<T> = {
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: sortedBy,
        sortedAscending: true,
        searchText: "",
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        selectedItem: undefined
    }
    return result;
};

const initialState: AdminStates = {
    isMobile: (window.innerWidth <= 992),
    vehiclesState: getInitialAdminState<Vehicle>("registrationNumber"),
    categoriesState: getInitialAdminState<VehicleCategory>("name"),
    customersState: getInitialAdminState<Customer>("name"),
    locationsState: getInitialAdminState<Location>("name"),
    driversState: getInitialAdminState<Driver>("name"),
}

export interface AdminAction<T extends BaseItem> {
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

export const adminSlice = createSlice({
    name: 'adminSlice',
    initialState,
    reducers: {
        itemSaved: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = action.payload.item;
            adminState.selectTime = Date.now();
            adminState.refreshTime = Date.now();
        },
        itemAdded: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = action.payload.item;
            adminState.refreshTime = Date.now();
        },
        itemDeleted: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = null;
            adminState.refreshTime = Date.now();
        },
        itemClosed: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = null;
        },
        refreshItems: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = null;
            adminState.refreshTime = Date.now();
        },
        setSortItemsBy: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            if (adminState.sortedBy === action.payload.sortBy) {
                adminState.sortedAscending = !adminState.sortedAscending;
            } else {
                adminState.sortedBy = action.payload.sortBy;
            }
            adminState.selectedItem = null;
            adminState.refreshTime = Date.now();
        },
        setSearchItemsText: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.searchText = action.payload.searchText ? action.payload.searchText : "";
        },
        clearSearchItemsText: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.searchText = "";
        },
        setItemsPageSize: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.pageSize = action.payload.pageSize;
            adminState.currentPage = 0;
            adminState.selectedItem = null;
            adminState.refreshTime = Date.now();
        },
        setItemsCurrentPage: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = null;
            adminState.currentPage = action.payload.currentPage;
        },
        clearItemsFetchError: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.error = null;
        },
        setItemsFetchError: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.error = action.payload.error;
        },
        setFetchingItems: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.fetching = true;
        },
        setFetchingItemsComplete: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.fetching = false;
        },
        setItemsResultPage: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.listPage = action.payload.listPage;
        },
        setItem: (state, action: PayloadAction<AdminAction<any>>) => {
            const adminState: AdminState<any> = getAdminState(state, action.payload.itemType);
            adminState.selectedItem = action.payload.item;
        },
        setIsMobile: (state, action: PayloadAction<number>) => {
            state.isMobile = (action.payload <= 992)
        }
    },
})

const getAdminState = (state: Draft<AdminStates>, itemType: ItemType) => {
    switch (itemType) {
        case "vehicle":
            return state.vehiclesState;
        case "customer":
            return state.customersState;
        case "location":
            return state.locationsState;
        case "category":
            return state.categoriesState;
        case "driver":
            return state.driversState;
        default:
            throw new Error("The Type " + itemType + " is not defined in the Administration Slice");
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
} = adminSlice.actions

export const getCategoriesState = (state: RootState) => state.administration.categoriesState;
export const getVehiclesState = (state: RootState) => state.administration.vehiclesState;
export const getCustomersState = (state: RootState) => state.administration.customersState;
export const getLocationsState = (state: RootState) => state.administration.locationsState;
export const getDriversState = (state: RootState) => state.administration.driversState;
export const isMobile = (state: RootState) => state.administration.isMobile;

export default adminSlice.reducer
