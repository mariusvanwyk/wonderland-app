import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import VehicleCategoriesList from "./components/VehicleCategoriesList";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState} from "../../redux/SelectionSlice";

const VehicleCategoriesLarge = () => {
    const state = useAppSelector(getCategoriesSelectionState)
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <VehicleCategoriesList/>
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {state.selectedId && <VehicleCategoryDetails/>}
                </Col>
            </Row>
        </Container>
    );
}

export default VehicleCategoriesLarge;
