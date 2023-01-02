import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState} from "../../redux/SelectionSlice";
import {VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategoryConverter} from "./VehicleCategoryConverter";
import {ItemType} from "../model/BaseItem";
import VehicleCategoryForm from "./VehicleCategoryForm";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const converter: VehicleCategoryConverter = new VehicleCategoryConverter();
const CATEGORY: ItemType = "CATEGORY";

const VehicleCategoriesLarge = () => {
    // @ts-ignore
    const state = useAppSelector(getCategoriesSelectionState);
    const categoryForm = () => <VehicleCategoryForm showTechnical={false} state={state} itemType={CATEGORY}/>;
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={"Vehicle Categories"}
                        itemType={CATEGORY}
                        services={services}
                        converter={converter}
                        state={state}
                        itemForm={categoryForm()}/>
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {state.selectedId &&
                        <ItemDetails
                            state={state}
                            converter={converter}
                            itemType={CATEGORY}
                            services={services} itemForm={categoryForm()}/>}
                </Col>
            </Row>
        </Container>
    );
}

export default VehicleCategoriesLarge;
