import React, {ReactNode} from 'react';
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../redux/hooks";
import {getVehicleSelectionState} from "../../redux/SelectionSlice";

import {ItemType} from "../model/BaseItem";
import {VehicleServices} from "./VehicleServices";
import {VehicleManager} from "../managers/VehicleManager";

type Properties = {
    itemType: ItemType,
    services: VehicleServices,
    converter: VehicleManager,
    form: ReactNode
}

const VehiclesSmall = ({itemType, services, converter, form}: Properties) => {
    // @ts-ignore
    const state = useAppSelector(getVehicleSelectionState);

    return (
        <Container fluid className={"h-100"}>
            {!state.selectedItem &&
                <ItemsListPanel
                    name={"Vehicle Categories"}
                    itemType={itemType}
                    services={services}
                    state={state}
                    manager={converter}/>}
            {state.selectedItem &&
                <ItemDetails
                    state={state}
                    converter={converter}
                    itemType={itemType}
                    itemForm={form}
                    services={services}/>}
        </Container>
    );
}

export default VehiclesSmall;
