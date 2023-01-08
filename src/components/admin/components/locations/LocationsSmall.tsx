import React, {ReactNode} from 'react';
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

const LocationsSmall = ({itemType, services, converter, form}: Properties) => {
    // @ts-ignore
    const state = useAppSelector(getLocationSelectionState);

    return (
        <Container fluid className={"h-100"}>
            {!state.selectedItem &&
                <ItemsListPanel
                    name={"Locations"}
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

export default LocationsSmall;
