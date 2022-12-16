import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup, FormSelect, ListGroup} from "react-bootstrap";
import {VehicleCategoriesPage, VehicleCategory} from "./model";
import AddVehicleCategoryButton from "./AddVehicleCategoryButton";
import HttpService from "../services/HttpService";


type Properties = {
    defaultSelected: VehicleCategory | null | undefined,
    onSelect: (category: VehicleCategory) => void;
    onAdd: (category: VehicleCategory) => void;
    onRefresh: () => void;
    refreshTimeRequest: number
}

const VehicleCategoriesList = ({
                                   defaultSelected,
                                   onSelect,
                                   onAdd,
                                   onRefresh,
                                   refreshTimeRequest
                               }: Properties) => {

    const [vehicleCategoriesPage, setVehicleCategoriesPage] = useState<VehicleCategoriesPage>();
    const [selected, setSelected] = useState<VehicleCategory | null | undefined>(defaultSelected);
    const [pageSize, setPageSize] = useState<number>(5);
    const [refreshTime, setRefreshTime] = useState<number>(refreshTimeRequest)

    useEffect(() => {
        getCategoriesPage(pageSize)
    }, [refreshTime, pageSize]);

    useEffect(() => {
        setRefreshTime(refreshTimeRequest);
    }, [refreshTimeRequest]);

    useEffect(() => {
        setSelected(defaultSelected);
    }, [defaultSelected]);

    const getCategoriesPage = (size: number) => {
        HttpService.getAxiosClient().get<VehicleCategoriesPage>(
            `/api/v1/vehicleCategories?size=${size}&sort=id,asc`)
            .then((response) => {
                // handle success
                console.log(response);
                setVehicleCategoriesPage(response.data)
            })
            .catch((error) => {
                // handle error
                console.log(error);
            })
    }

    const select = (category: VehicleCategory) => {
        setSelected(category);
        onSelect(category);
    }

    return (
        <>
            <h3>Vehicle Categories</h3>
            <div className={"d-flex justify-content-end mb-2"}>
                <AddVehicleCategoryButton onAdd={onAdd}/>
                <Button variant="secondary" title={"Refresh the list of Vehicle Categories"} size={"sm"}
                        onClick={() => setRefreshTime(Date.now())}>
                    <i className={"bi bi-arrow-clockwise"}></i>
                </Button>
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
                <ButtonGroup aria-label="Basic example" size={"sm"}>
                    <Button variant="secondary"><i className="bi bi-chevron-double-left"></i></Button>
                    <Button variant="secondary"><i className="bi bi-chevron-left"></i></Button>
                    <Button variant="secondary"><i className="bi bi-chevron-right"></i></Button>
                    <Button variant="secondary"><i className="bi bi-chevron-double-right"></i></Button>
                </ButtonGroup>
            </div>
            <span>Refreshed at: {new Date(refreshTime).toDateString()}</span>
        </>
    );
}

export default VehicleCategoriesList
