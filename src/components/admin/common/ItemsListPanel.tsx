import React, {Fragment, memo, useEffect} from 'react';
import {Badge, Button, ListGroup} from "react-bootstrap";
import Paging from "./Paging";

import {useAppDispatch} from "../../redux/hooks";
import {
    clearItemsFetchError,
    refreshItems,
    SelectionState,
    setFetchingItems,
    setFetchingItemsComplete,
    setItem,
    setItemsCurrentPage,
    setItemsFetchError,
    setItemsResultPage
} from "../../redux/SelectionSlice";
import SearchPanel from "./SearchPanel";
import SortDropDown from "./SortDropDown";
import PageSizeSelect from "./PageSizeSelect";
import {BaseItem, ItemType} from "../model/BaseItem";
import {ItemManager} from "../managers/ItemManager";
import {Services} from "../Services";
import {ListPage} from "../model/ListPage";
import Fetching from "./Fetching";

type Properties = {
    name: string,
    itemType: ItemType,
    services: Services<any, any>,
    state: SelectionState<any>,
    manager: ItemManager<any, any>,
}

const ItemsListPanel = ({name, itemType, services, state, manager}: Properties) => {
    const dispatch = useAppDispatch();

    const onItemSelected = (id: number) => {
        services.getItem(id)
            .then((response) => {
                dispatch(setItem({itemType: itemType, item: response.data}));
            })
            .catch((error) => {
                console.error(error)
            });
    }

    useEffect(() => {
        const fetchResultPage = () => {
            dispatch(clearItemsFetchError({itemType: itemType}));
            dispatch(setFetchingItems({itemType: itemType}));
            services.getItems(state.currentPage, state.pageSize, state.searchText, state.sortedBy, state.sortedAscending)
                .then((response) => {
                    const listPage: ListPage<any> = manager.convert(response.data);
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
        fetchResultPage();
    }, [dispatch, itemType, manager, services, state.refreshTime, state.pageSize, state.currentPage]);

    const refresh = () => {
        dispatch(refreshItems({itemType: itemType}));
    }

    const onPaging = (pageNumber: number) => {
        dispatch(setItemsCurrentPage({itemType: itemType, currentPage: pageNumber}));
    }

    const validationPill = (item: BaseItem) => {
        const errors = manager.validate(item);
        if (errors.length > 0) {
            return <Badge bg="danger" pill>{errors.length} Errors</Badge>;
        } else {
            return <></>;
        }
    }

    return (
        <Fragment>
            <div className={"d-flex justify-content-between align-items-center mb-2"}>
                <h3>{name}</h3>
                <div>
                    {!state.fetching && !state.error &&
                        <Button variant="success" title={"Add new"} size={"sm"}
                                onClick={() => dispatch(setItem({itemType: itemType, item: manager.newItem()}))}>
                            Add
                        </Button>}
                </div>
            </div>
            <Fetching visible={state.fetching}/>
            {state.error && <div className={"text-danger"}>{state.error}</div>}
            {!state.fetching && !state.error && state.listPage &&
                <>
                    <SearchPanel itemType={itemType} searchText={state.searchText}/>
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
                        <SortDropDown itemType={itemType} state={state} sortProperties={manager.getSortProperties()}/>
                    </div>
                    <ListGroup>
                        {state.listPage.items.map((current, index) => {
                            return (
                                <ListGroup.Item action
                                                active={state.selectedItem != null && state.selectedItem.id === current.id}
                                                onClick={() => onItemSelected(current.id)} key={index}
                                                className="d-flex justify-content-between align-items-center">
                                    <div>{manager.getListColumn(current)}</div>
                                    <div className={"d-flex align-items-center"}>
                                        {validationPill(current)}
                                    </div>
                                </ListGroup.Item>
                            )
                        })
                        }
                    </ListGroup>
                    <PageSizeSelect itemType={itemType} state={state}/>
                </>
            }
        </Fragment>
    )
        ;
}

export default memo(ItemsListPanel)
