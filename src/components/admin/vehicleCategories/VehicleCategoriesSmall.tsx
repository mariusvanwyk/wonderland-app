import React, {useState} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import VehicleCategoriesList from "./components/VehicleCategoriesList";
import {CategoriesServices, VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategory} from "../../model/VehicleCategory";
import {useAppSelector} from "../../redux/hooks";
import {getSelectedId} from "./VehicleCategorySlice";

const services: CategoriesServices = new VehicleCategoriesServices();

function VehicleCategoriesSmall() {
    const selectedId = useAppSelector(getSelectedId)
    return (
        <Container fluid className={"h-100"}>
            {!selectedId && <VehicleCategoriesList/>}
            {selectedId && <VehicleCategoryDetails/>}
        </Container>
    );
}

export default VehicleCategoriesSmall;
