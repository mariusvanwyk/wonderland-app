import React, {Fragment, useEffect} from 'react';
import {Button, ListGroup} from "react-bootstrap";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import Paging from "../../../common/Paging";
import {VehicleCategoriesServices} from "../VehicleCategoriesServices";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {
    clearItemsFetchError,
    getCategoriesSelectionState,
    refreshItems,
    setItemsCurrentPage,
    setItemsFetchError,
    setFetchingItems, setFetchingItemsComplete, setItemsResultPage,
    itemSelected
} from "../../../redux/SelectionSlice";
import SearchPanel from "../../../common/SearchPanel";
import SortDropDown from "../../../common/SortDropDown";
import PageSizeSelect from "../../../common/PageSizeSelect";
import {ObjectType} from "../../../model/BaseModelObject";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const objectType: ObjectType = "CATEGORY";



const ItemsListPanel = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(getCategoriesSelectionState);

    const fetchResultPage = () => {
        dispatch(clearItemsFetchError({objectType: objectType}));
        dispatch(setFetchingItems({objectType: objectType}));
        services.getVehicleCategories(state.currentPage, state.pageSize, state.searchText, state.sortedBy, state.sortedAscending)
            .then((response) => {
                dispatch(setItemsResultPage({objectType: objectType, resultPage: response.data}));
            })
            .catch((error) => {
                dispatch(setItemsFetchError({objectType: objectType, error: (error.message + " [" + error.code + "]")}));
            })
            .finally(() => {
                dispatch(setFetchingItemsComplete({objectType: objectType}))
            });
    }

    useEffect(() => {
        fetchResultPage();
    }, [state.refreshTime, state.pageSize, state.currentPage]);

    const refresh = () => {
        dispatch(refreshItems({objectType: objectType}));
    }

    const onPaging = (pageNumber: number) => {
        dispatch(setItemsCurrentPage({objectType: objectType, currentPage: pageNumber}));
    }

    return (
        <Fragment>
            <div className={"d-flex justify-content-between align-items-center mb-2"}>
                <h3>Vehicle Categories</h3>
                <div>
                    {!state.error && <AddVehicleCategoryButton/>}
                </div>
            </div>
            {state.error && <div className={"text-danger"}>{state.error}</div>}
            {!state.error && state.resultPage &&
                <>
                    <SearchPanel objectType={objectType} state={state}/>
                    <div className={"d-flex justify-content-between mb-2 flex-wrap"}>
                        <div>
                            <Button variant="outline-secondary" title={"Refresh"}
                                    size={"sm"}
                                    onClick={() => refresh()}>
                                <i className={"bi bi-arrow-clockwise"}></i>
                            </Button>
                        </div>
                        <Paging page={state.resultPage.page}
                                recordCount={state.resultPage._embedded.vehicleCategories.length}
                                objectType={objectType} state={state}
                                onPaging={(pageNumber) => onPaging(pageNumber)}/>
                        <SortDropDown objectType={objectType} state={state}/>
                    </div>
                    <ListGroup>
                        {state.resultPage._embedded.vehicleCategories.map((current, index) => {
                            return (
                                <ListGroup.Item action
                                                active={state.selectedId != null && state.selectedId === current.id}
                                                onClick={() => dispatch(itemSelected({
                                                    objectType: objectType,
                                                    id: current.id
                                                }))} key={index}
                                                className="d-flex justify-content-between align-items-start">
                                    <div>{current.name}</div>
                                    <div>{"(" + current.size + " ton)"}</div>
                                </ListGroup.Item>
                            )
                        })
                        }
                    </ListGroup>
                    <PageSizeSelect objectType={objectType} state={state}/>
                </>
            }
        </Fragment>
    );
}

export default ItemsListPanel
