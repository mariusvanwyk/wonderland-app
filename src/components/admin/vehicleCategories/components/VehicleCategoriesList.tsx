import React, {ChangeEvent, KeyboardEventHandler, useEffect, useState} from 'react';
import {Button, Dropdown, Form, FormSelect, InputGroup, ListGroup} from "react-bootstrap";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import Paging from "../../../common/Paging";
import {CategoriesServices, VehicleCategoriesServices} from "../VehicleCategoriesServices";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {VehicleCategoriesPage} from "../../../model/VehicleCategoriesPage";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {
    getRefreshTime, getSelectedId, getSortedAscending, getSortedBy,
    refreshVehicleCategories, setSortVehicleCategoriesBy, vehicleCategorySelected
} from "../VehicleCategorySlice";

const services: CategoriesServices = new VehicleCategoriesServices();

const VehicleCategoriesList = () => {
    const dispatch = useAppDispatch();
    const selectedId = useAppSelector(getSelectedId);
    const refreshTime = useAppSelector(getRefreshTime);
    const sortedBy = useAppSelector(getSortedBy);
    const sortedAscending = useAppSelector(getSortedAscending);

    const [vehicleCategoriesPage, setVehicleCategoriesPage] = useState<VehicleCategoriesPage>();
    const [pageSize, setPageSize] = useState<number>(5);
    const [currentPage, setCurrentPage] = useState<number>(0);
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
        services.getVehicleCategories(currentPage, pageSize, sortedBy, sortedAscending)
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

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            refresh();
        }
    }

    const refresh = () => {
        dispatch(refreshVehicleCategories());
    }

    const select = (category: VehicleCategory | null) => {
        if (category) {
            dispatch(vehicleCategorySelected(category.id));
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
                    {!error && <AddVehicleCategoryButton/>}
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
                            onKeyDown={(e) => handleKeyDown(e)}
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
                        <div>
                            <Button variant="outline-secondary" title={"Refresh the list of Vehicle Categories"}
                                    size={"sm"}
                                    onClick={() => refresh()}>
                                <i className={"bi bi-arrow-clockwise"}></i>
                            </Button>
                        </div>
                        {vehicleCategoriesPage && <Paging page={vehicleCategoriesPage.page}
                                                          recordCount={vehicleCategoriesPage._embedded.vehicleCategories.length}
                                                          initialPage={currentPage}
                                                          onPaging={(pageNumber) => onPaging(pageNumber)}
                                                          fetching={fetching}/>
                        }
                        <Dropdown>
                            <Dropdown.Toggle id="dropdown-basic" variant={"outline-secondary"} size={"sm"}>
                                {sortedBy === "name" && (sortedAscending ? <i className={"bi bi-sort-alpha-down"}/> :
                                    <i className={"bi bi-sort-alpha-up"}/>)}
                                {sortedBy === "size" && (sortedAscending ? <i className={"bi bi-sort-numeric-down"}/> :
                                    <i className={"bi bi-sort-numeric-up"}/>)}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item className={"d-flex justify-content-between"}
                                               onClick={() => dispatch(setSortVehicleCategoriesBy("name"))}>
                                    {sortedBy === "name" ? <i className={"bi bi-check"}/> : <div>&nbsp;</div>}
                                    <div>By Name</div>
                                    {sortedBy === "name" ? (sortedAscending ? <i className={"bi bi-arrow-down"}/> :
                                        <i className={"bi bi-arrow-up"}/>) : <div>&nbsp;</div>}
                                </Dropdown.Item>
                                <Dropdown.Item className={"d-flex justify-content-between"}
                                               onClick={() => dispatch(setSortVehicleCategoriesBy("size"))}>
                                    {sortedBy === "size" ? <i className={"bi bi-check"}/> : <div>&nbsp;</div>}
                                    <div>By Size</div>
                                    {sortedBy === "size" ? (sortedAscending ? <i className={"bi bi-arrow-down"}/> :
                                        <i className={"bi bi-arrow-up"}/>) : <div>&nbsp;</div>}
                                </Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <ListGroup>
                        {vehicleCategoriesPage &&
                            vehicleCategoriesPage._embedded.vehicleCategories.map((current, index) => {
                                return (
                                    <ListGroup.Item action
                                                    active={selectedId != null && selectedId === current.id}
                                                    onClick={() => select(current)} key={index}
                                                    className="d-flex justify-content-between align-items-start">
                                        <div>{current.name}</div>
                                        <div>{"(" + current.size + " ton)"}</div>
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                    <div className={"d-flex justify-content-between mt-2 align-items-center"}>
                        <div className={"text-muted small"}>
                            {refreshTime && new Date(refreshTime).toLocaleTimeString()}
                        </div>
                        <div className={"d-flex justify-content-end align-items-center"}>
                            <FormSelect aria-label="Default select example" size={"sm"} defaultValue={pageSize}
                                        onChange={(event) => updateRecordsPerPage(event)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                            </FormSelect>
                            <div className={"ms-2 text-nowrap"}>Records per Page</div>
                        </div>

                    </div>
                </>
            }
        </>
    );
}

export default VehicleCategoriesList
