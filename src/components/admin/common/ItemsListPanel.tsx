import React, {Fragment, ReactNode, useEffect} from 'react';
import {Button, ListGroup} from "react-bootstrap";
import AddItemButton from "./AddItemButton";
import Paging from "./Paging";

import {useAppDispatch} from "../../redux/hooks";
import {
    clearItemsFetchError,
    refreshItems,
    setItemsCurrentPage,
    setItemsFetchError,
    setFetchingItems, setFetchingItemsComplete, setItemsResultPage,
    itemSelected, SelectionState
} from "../../redux/SelectionSlice";
import SearchPanel from "./SearchPanel";
import SortDropDown from "./SortDropDown";
import PageSizeSelect from "./PageSizeSelect";
import {ItemType} from "../model/BaseItem";
import {Converter} from "../Converter";
import {Services} from "../Services";
import {ListPage} from "../model/ListPage";

type Properties = {
    name: string,
    itemType: ItemType,
    services: Services<any, any>,
    state: SelectionState<any>,
    converter: Converter<any, any>,
    itemForm: ReactNode
}

const ItemsListPanel = ({name, itemType, services, state, converter, itemForm}: Properties) => {
    const dispatch = useAppDispatch();

    const fetchResultPage = () => {
        dispatch(clearItemsFetchError({itemType: itemType}));
        dispatch(setFetchingItems({itemType: itemType}));
        services.getItems(state.currentPage, state.pageSize, state.searchText, state.sortedBy, state.sortedAscending)
            .then((response) => {
                const listPage: ListPage<any> = converter.convert(response.data);
                dispatch(setItemsResultPage({itemType: itemType, listPage: listPage}));
            })
            .catch((error) => {
                dispatch(setItemsFetchError({
                    itemType: itemType,
                    error: (error.message + " [" + error.code + "]")
                }));
            })
            .finally(() => {
                dispatch(setFetchingItemsComplete({itemType: itemType}))
            });
    }

    useEffect(() => {
        fetchResultPage();
    }, [state.refreshTime, state.pageSize, state.currentPage]);

    const refresh = () => {
        dispatch(refreshItems({itemType: itemType}));
    }

    const onPaging = (pageNumber: number) => {
        dispatch(setItemsCurrentPage({itemType: itemType, currentPage: pageNumber}));
    }

    return (
        <Fragment>
            <div className={"d-flex justify-content-between align-items-center mb-2"}>
                <h3>{name}</h3>
                <div>
                    {!state.error && <AddItemButton
                        itemType={itemType}
                        services={services}
                        converter={converter}
                        state={state}
                        itemForm={itemForm}/>}
                </div>
            </div>
            {state.error && <div className={"text-danger"}>{state.error}</div>}
            {!state.error && state.listPage &&
                <>
                    <SearchPanel itemType={itemType} state={state}/>
                    <div className={"d-flex justify-content-between mb-2 flex-wrap"}>
                        <div>
                            <Button variant="outline-secondary" title={"Refresh"}
                                    size={"sm"}
                                    onClick={() => refresh()}>
                                <i className={"bi bi-arrow-clockwise"}></i>
                            </Button>
                        </div>
                        <Paging page={state.listPage.page}
                                recordCount={state.listPage.items.length}
                                itemType={itemType} state={state}
                                onPaging={(pageNumber) => onPaging(pageNumber)}/>
                        <SortDropDown itemType={itemType} state={state}/>
                    </div>
                    <ListGroup>
                        {state.listPage.items.map((current, index) => {
                            return (
                                <ListGroup.Item action
                                                active={state.selectedId != null && state.selectedId === current.id}
                                                onClick={() => dispatch(itemSelected({
                                                    itemType: itemType,
                                                    id: current.id
                                                }))} key={index}
                                                className="d-flex justify-content-between align-items-start">
                                    <div>{converter.getListColumn(current)}</div>
                                    <div>{converter.getListExtraColumn(current)}</div>
                                </ListGroup.Item>
                            )
                        })
                        }
                    </ListGroup>
                    <PageSizeSelect itemType={itemType} state={state}/>
                </>
            }
        </Fragment>
    );
}

export default ItemsListPanel
