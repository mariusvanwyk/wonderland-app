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

const VehiclesSmall = () => {
    // @ts-ignore
    const state = useAppSelector(getVehicleSelectionState);
    const vehicleForm = () => <VehicleForm state={state} itemType={VEHICLE} showTechnical={true}/>;
    return (
        <Container fluid className={"h-100"}>
            {!state.selectedId &&
                <ItemsListPanel
                    name={"Vehicle Categories"}
                    itemType={VEHICLE}
                    services={services}
                    state={state}
                    converter={converter}
                    itemForm={vehicleForm()}/>}
            {state.selectedId &&
                <ItemDetails
                    state={state}
                    converter={converter}
                    itemType={VEHICLE}
                    itemForm={vehicleForm()}
                    services={services}/>}
        </Container>
    );
}

export default VehiclesSmall;
