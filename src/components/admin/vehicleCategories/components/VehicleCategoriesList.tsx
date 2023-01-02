import React, {Fragment, useEffect, useState} from 'react';
import {Button, ListGroup} from "react-bootstrap";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import Paging from "../../../common/Paging";
import {VehicleCategoriesServices} from "../VehicleCategoriesServices";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {VehicleCategoriesPage} from "../../../model/VehicleCategoriesPage";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {
    clearError,
    getCategoriesSelectionState,
    refreshVehicleCategories,
    setCurrentPage,
    setError,
    setFetching, setFetchingComplete,
    vehicleCategorySelected
} from "../../../redux/SelectionSlice";
import SearchPanel from "../../../common/SearchPanel";
import SortDropDown from "../../../common/SortDropDown";
import PageSizeSelect from "../../../common/PageSizeSelect";
import {ObjectType} from "../../../model/BaseModelObject";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const objectType: ObjectType = "CATEGORY";

const VehicleCategoriesList = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(getCategoriesSelectionState);
    const [vehicleCategoriesPage, setVehicleCategoriesPage] = useState<VehicleCategoriesPage>();

    useEffect(() => {
        if (!state.searchText || state.searchText.trim() === "") {
            getCategoriesPage()
        } else {
            getCategoriesPageByName(state.searchText)
        }
    }, [state.refreshTime, state.pageSize, state.currentPage]);

    const getCategoriesPageByName = (searchText: string) => {
        dispatch(clearError({objectType: objectType}));
        dispatch(setFetching({objectType: objectType}));
        services.getVehicleCategoriesByName(state.currentPage, state.pageSize, searchText, state.sortedBy, state.sortedAscending)
            .then((response) => {
                setVehicleCategoriesPage(response.data);
            })
            .catch((error) => {
                dispatch(setError({objectType: objectType, error: (error.message + " [" + error.code + "]")}));
            })
            .finally(() => {
                dispatch(setFetchingComplete({objectType: objectType}))
            });
    }
    const getCategoriesPage = () => {
        dispatch(clearError({objectType: objectType}));
        dispatch(setFetching({objectType: objectType}));
        services.getVehicleCategories(state.currentPage, state.pageSize, state.sortedBy, state.sortedAscending)
            .then((response) => {
                setVehicleCategoriesPage(response.data);
            })
            .catch((error) => {
                dispatch(setError({objectType: objectType, error: (error.message + " [" + error.code + "]")}));
            })
            .finally(() => {
                dispatch(setFetchingComplete({objectType: objectType}))
            });
    }

    const refresh = () => {
        dispatch(refreshVehicleCategories({objectType: objectType}));
    }

    const select = (category: VehicleCategory | null) => {
        if (category) {
            dispatch(vehicleCategorySelected({objectType: objectType, id: category.id}));
        }
    }

    const onPaging = (pageNumber: number) => {
        dispatch(setCurrentPage({objectType: objectType, currentPage: pageNumber}));
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
            {!state.error && vehicleCategoriesPage &&
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
                        <Paging page={vehicleCategoriesPage.page}
                                recordCount={vehicleCategoriesPage._embedded.vehicleCategories.length}
                                objectType={objectType} state={state}
                                onPaging={(pageNumber) => onPaging(pageNumber)}/>
                        <SortDropDown objectType={objectType} state={state}/>
                    </div>
                    <ListGroup>
                        {vehicleCategoriesPage &&
                            vehicleCategoriesPage._embedded.vehicleCategories.map((current, index) => {
                                return (
                                    <ListGroup.Item action
                                                    active={state.selectedId != null && state.selectedId === current.id}
                                                    onClick={() => select(current)} key={index}
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

export default VehicleCategoriesList
