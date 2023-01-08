import React, {ReactNode} from 'react';
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesSelectionState} from "../../../redux/SelectionSlice";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import {ItemType} from "../../model/base/BaseItem";

type Properties = {
    itemType: ItemType,
    services: VehicleCategoriesServices,
    converter: VehicleCategoryManager,
    form: ReactNode
}
const VehicleCategoriesSmall = ({itemType, services, converter, form}:Properties) => {
    const state = useAppSelector(getCategoriesSelectionState);

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

export default VehicleCategoriesSmall;
