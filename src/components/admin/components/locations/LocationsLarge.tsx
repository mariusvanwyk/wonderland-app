import React, {ReactNode} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails from "../../common/ItemDetails";
import ItemsListPanel from "../../common/ItemsListPanel";
import {useAppSelector} from "../../../redux/hooks";
import {getLocationSelectionState} from "../../../redux/SelectionSlice";

import {ItemType} from "../../model/BaseItem";
import {LocationServices} from "./LocationServices";
import {LocationManager} from "../../managers/LocationManager";

type Properties = {
    itemType: ItemType,
    services: LocationServices,
    converter: LocationManager,
    form: ReactNode
}
const LocationsLarge = ({itemType, services, converter, form}:Properties) => {
    // @ts-ignore
    const state = useAppSelector(getLocationSelectionState);

    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={"Locations"}
                        itemType={itemType}
                        services={services}
                        manager={converter}
                        state={state}/>
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {state.selectedItem &&
                        <ItemDetails
                            state={state}
                            converter={converter}
                            itemType={itemType}
                            services={services}
                            itemForm={form}/>}
                </Col>
            </Row>
        </Container>
    );
}

export default LocationsLarge;
