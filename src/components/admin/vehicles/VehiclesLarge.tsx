import React from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../redux/hooks";
import {getVehicleSelectionState} from "../../redux/SelectionSlice";

import {ItemType} from "../model/BaseItem";
import {VehicleServices} from "./VehicleServices";
import {VehicleConverter} from "./VehicleConverter";
import VehicleForm from "./VehicleForm";

const services: VehicleServices = new VehicleServices();
const converter: VehicleConverter = new VehicleConverter();
const VEHICLE: ItemType = "VEHICLE";

const VehiclesLarge = () => {
    // @ts-ignore
    const state = useAppSelector(getVehicleSelectionState);
    const vehicleForm = () => <VehicleForm state={state} itemType={VEHICLE} showTechnical={true}/>;
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={"Vehicles"}
                        itemType={VEHICLE}
                        services={services}
                        converter={converter}
                        state={state}
                        itemForm={vehicleForm()}/>
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {state.selectedId &&
                        <ItemDetails
                            state={state}
                            converter={converter}
                            itemType={VEHICLE}
                            services={services} itemForm={vehicleForm()}/>}
                </Col>
            </Row>
        </Container>
    );
}

export default VehiclesLarge;
