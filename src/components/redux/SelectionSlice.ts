import {createSlice, Draft, PayloadAction} from '@reduxjs/toolkit'
import type {RootState} from './store'
import {ItemType} from "../admin/model/BaseItem";
import {ListPage} from "../admin/model/ListPage";
import {VehicleCategory} from "../admin/model/VehicleCategory";

export interface SelectionState<T> {
    selectedId: number | null | undefined,
    refreshTime: number | null,
    selectTime: number | null,
    sortedBy: string | undefined,
    sortedAscending: boolean,
    searchText: string | undefined,
    pageSize: number | undefined,
    currentPage: number | undefined,
    error: string | null | undefined,
    fetching: boolean,
    listPage: ListPage<T> | undefined,
    item: T | undefined
}

interface SelectionStates {
    categoriesSelectionState: SelectionState<VehicleCategory>
}

const initialState: SelectionStates = {
    categoriesSelectionState: {
        selectedId: null,
        refreshTime: Date.now(),
        selectTime: null,
        sortedBy: "name",
        sortedAscending: true,
        searchText: undefined,
        pageSize: 5,
        currentPage: 0,
        error: undefined,
        fetching: false,
        listPage: undefined,
        item: undefined
    }
}

export interface SelectionAction<T> {
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
        itemSelected: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = action.payload.id;
            selectionState.selectTime = Date.now();
        },
        itemSaved: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = action.payload.id;
            selectionState.selectTime = Date.now();
            selectionState.refreshTime = Date.now();
        },
        itemAdded: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = action.payload.id;
            selectionState.refreshTime = Date.now();
        },
        itemDeleted: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        itemClosed: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = null;
        },
        refreshItems: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setSortItemsBy: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            if (selectionState.sortedBy === action.payload.sortBy) {
                selectionState.sortedAscending = !selectionState.sortedAscending;
            } else {
                selectionState.sortedBy = action.payload.sortBy;
            }
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setSearchItemsText: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.searchText = action.payload.searchText;
        },
        clearSearchItemsText: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.searchText = "";
        },
        setItemsPageSize: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.pageSize = action.payload.pageSize;
            selectionState.currentPage = 0;
            selectionState.selectedId = null;
            selectionState.refreshTime = Date.now();
        },
        setItemsCurrentPage: (state, action: PayloadAction<SelectionAction<any>>) => {
            const selectionState: SelectionState<any> = getSelectionState(state, action.payload.itemType);
            selectionState.selectedId = null;
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
            selectionState.item = action.payload.item;
        }

    },
})

const getSelectionState = (state: Draft<SelectionStates>, itemType: ItemType) => {
    switch (itemType) {
        case "CATEGORY":
            return state.categoriesSelectionState;
        default:
            return state.categoriesSelectionState;
    }
}

export const {
    itemSelected,
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
    setItem
} = SelectionSlice.actions

export const getCategoriesSelectionState = (state: RootState) => state.selections.categoriesSelectionState;

export default SelectionSlice.reducer