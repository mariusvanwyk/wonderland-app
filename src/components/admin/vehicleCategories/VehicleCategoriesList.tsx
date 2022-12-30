import React, {useEffect, useState} from 'react';
import {Button, FormSelect, ListGroup} from "react-bootstrap";
import {VehicleCategoriesPage, VehicleCategory} from "./model";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import Paging from "../../common/Paging";
import {CategoriesServices} from "./VehicleCategoriesServices";

type Properties = {
    defaultSelected: VehicleCategory | null | undefined,
    onSelect: (category: VehicleCategory) => void;
    onAdd: (category: VehicleCategory) => void;
    onRefresh: () => void;
    refreshTimeRequest: number,
    services: CategoriesServices<any>
}

const VehicleCategoriesList = ({
                                   defaultSelected,
                                   onSelect,
                                   onAdd,
                                   onRefresh,
                                   refreshTimeRequest,
                                   services
                               }: Properties) => {

    const [vehicleCategoriesPage, setVehicleCategoriesPage] = useState<VehicleCategoriesPage>();
    const [selected, setSelected] = useState<VehicleCategory | null | undefined>(defaultSelected);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [refreshTime, setRefreshTime] = useState<number>(refreshTimeRequest);
    const [fetching, setFetching] = useState<boolean>(true);
    const [error, setError] = useState<string | null | undefined>();

    useEffect(() => {
        getCategoriesPage(pageSize)
    }, [refreshTime, pageSize, currentPage]);

    useEffect(() => {
        setRefreshTime(refreshTimeRequest);
    }, [refreshTimeRequest]);

    useEffect(() => {
        setSelected(defaultSelected);
    }, [defaultSelected]);

    const getCategoriesPage = (size: number) => {
        setError(null);
        setFetching(true);
        services.getVehicleCategories(currentPage, size)
            .then((response) => {
                // handle success
                console.log(response);
                setVehicleCategoriesPage(response.data);

            })
            .catch((error) => {
                // handle error
                setError(error.message + " [" + error.code + "]");
            })
            .finally(() => {
                setFetching(false);
            });
    }

    const refresh = () => {
        setRefreshTime(Date.now());
        onRefresh();
    }

    const select = (category: VehicleCategory) => {
        setSelected(category);
        onSelect(category);
    }

    return (
        <>
            <h3>Vehicle Categories</h3>
            {error && <div className={"text-danger"}>{error}</div>}
            {!error && <>
                <div className={"d-flex justify-content-between mb-2"}>
                    {vehicleCategoriesPage && <Paging page={vehicleCategoriesPage.page}
                                                      initialPage={currentPage}
                                                      onPaging={(pageNumber) => setCurrentPage(pageNumber)}
                                                      fetching={fetching}/>
                    }
                    <div>
                        <AddVehicleCategoryButton onAdd={onAdd}/>
                        <Button variant="secondary" title={"Refresh the list of Vehicle Categories"} size={"sm"}
                                onClick={() => refresh()}>
                            <i className={"bi bi-arrow-clockwise"}></i>
                        </Button>

                    </div>
                </div>
                <ListGroup>
                    {vehicleCategoriesPage &&
                        vehicleCategoriesPage._embedded.vehicleCategories.map((current, index) => {
                            return (
                                <ListGroup.Item action
                                                active={selected != null && selected.id === current.id}
                                                onClick={() => select(current)} key={index}>
                                    {current.name}
                                </ListGroup.Item>
                            )
                        })
                    }
                </ListGroup>
                <div className={"d-flex justify-content-between mt-2"}>
                    <div>
                        <FormSelect aria-label="Default select example" size={"sm"} defaultValue={pageSize}
                                    onChange={(event) => setPageSize(Number(event.target.value))}>
                            <option value="1">1</option>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="15">15</option>
                        </FormSelect>
                    </div>
                </div>
            </>
            }
            <span>Refreshed at: {new Date(refreshTime).toDateString()}</span>
        </>
    );
}

export default VehicleCategoriesList
