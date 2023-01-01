import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormSelect, InputGroup, ListGroup} from "react-bootstrap";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import Paging from "../../../common/Paging";
import {CategoriesServices} from "../VehicleCategoriesServices";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {VehicleCategoriesPage} from "../../../model/VehicleCategoriesPage";

type Properties = {
    defaultSelectedId: number | null | undefined,
    onSelect: (id: number) => void;
    onAdd: (id: number) => void;
    onRefresh: () => void;
    refreshTimeRequest: number,
    services: CategoriesServices
}

const VehicleCategoriesList = ({
                                   defaultSelectedId,
                                   onSelect,
                                   onAdd,
                                   onRefresh,
                                   refreshTimeRequest,
                                   services
                               }: Properties) => {

    const [vehicleCategoriesPage, setVehicleCategoriesPage] = useState<VehicleCategoriesPage>();
    const [selectedId, setSelectedId] = useState<number | null | undefined>(defaultSelectedId);
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [refreshTime, setRefreshTime] = useState<number>(refreshTimeRequest);
    const [fetching, setFetching] = useState<boolean>(true);
    const [error, setError] = useState<string | null | undefined>();
    const [searchText, setSearchText] = useState<string>("")

    useEffect(() => {
        if (searchText.trim() === "") {
            getCategoriesPage()
        } else {
            getCategoriesPageByName()
        }
    }, [refreshTime, pageSize, currentPage]);

    useEffect(() => {
        setRefreshTime(refreshTimeRequest);
    }, [refreshTimeRequest]);

    useEffect(() => {
        setSelectedId(defaultSelectedId);
    }, [defaultSelectedId]);

    const getCategoriesPageByName = () => {
        setError(null);
        setFetching(true);
        services.getVehicleCategoriesByName(currentPage, pageSize, searchText)
            .then((response) => {
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
    const getCategoriesPage = () => {
        setError(null);
        setFetching(true);
        services.getVehicleCategories(currentPage, pageSize)
            .then((response) => {
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
        onRefresh();
    }

    const select = (category: VehicleCategory | null) => {
        if (category) {
            setSelectedId(category.id);
            onSelect(category.id);
        }
    }

    const updateRecordsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(event.target.value));
        setCurrentPage(0);
    }

    const onPaging = (pageNumber: number) => {
        select(null);
        setCurrentPage(pageNumber);
    }

    const clearSearch = () => {
        setSearchText("");
        refresh();
    }

    return (
        <>
            <div className={"d-flex justify-content-between align-items-center mb-2"}>
                <h3>Vehicle Categories</h3>
                <div>
                    {!error && <AddVehicleCategoryButton onAdd={onAdd}/>}
                </div>
            </div>

            {error && <div className={"text-danger"}>{error}</div>}
            {!error &&
                <>
                    <InputGroup className="mb-3" size={"sm"}>
                        <Form.Control
                            value={searchText}
                            placeholder={"Search here..."}
                            aria-label="Search Vehicle Categories input"
                            aria-describedby="search-button"
                            onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                setSearchText(e.target.value)}
                        />
                        <Button variant="outline-secondary" id="search-button"
                                onClick={() => refresh()}>
                            <i className={"bi bi-search"}/>
                        </Button>
                        <Button variant="outline-secondary" id="search-button"
                                onClick={() => clearSearch()}>
                            <i className={"bi bi-x"}/>
                        </Button>
                    </InputGroup>
                    <div className={"d-flex justify-content-between mb-2 flex-wrap"}>
                        <Button variant="outline-secondary" title={"Refresh the list of Vehicle Categories"}
                                size={"sm"}
                                onClick={() => refresh()}>
                            <i className={"bi bi-arrow-clockwise"}></i>
                        </Button>
                        {vehicleCategoriesPage && <Paging page={vehicleCategoriesPage.page}
                                                          recordCount={vehicleCategoriesPage._embedded.vehicleCategories.length}
                                                          initialPage={currentPage}
                                                          onPaging={(pageNumber) => onPaging(pageNumber)}
                                                          fetching={fetching}/>
                        }
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic">
                                ...
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <ListGroup>
                        {vehicleCategoriesPage &&
                            vehicleCategoriesPage._embedded.vehicleCategories.map((current, index) => {
                                return (
                                    <ListGroup.Item action
                                                    active={selectedId != null && selectedId === current.id}
                                                    onClick={() => select(current)} key={index}>
                                        {current.name + " (" + current.size + ")"}
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                    <div className={"d-flex justify-content-end mt-2 align-items-center"}>
                        <div>
                            <FormSelect aria-label="Default select example" size={"sm"} defaultValue={pageSize}
                                        onChange={(event) => updateRecordsPerPage(event)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </FormSelect>
                        </div>
                        <div className={"ms-2"}>Records per Page</div>
                    </div>
                </>
            }

        </>
    );
}

export default VehicleCategoriesList
