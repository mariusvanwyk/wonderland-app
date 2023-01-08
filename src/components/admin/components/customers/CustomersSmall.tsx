import React, {ReactNode} from 'react';
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../../redux/hooks";
import {getCustomerSelectionState} from "../../../redux/SelectionSlice";

import {ItemType} from "../../model/base/BaseItem";
import {CustomerServices} from "../../services/CustomerServices";
import {CustomerManager} from "../../managers/CustomerManager";

type Properties = {
    itemType: ItemType,
    services: CustomerServices,
    converter: CustomerManager,
    form: ReactNode
}

const CustomersSmall = ({itemType, services, converter, form}: Properties) => {
    // @ts-ignore
    const state = useAppSelector(getCustomerSelectionState);

    return (
        <Container fluid className={"h-100"}>
            {!state.selectedItem &&
                <ItemsListPanel
                    name={"Customers"}
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

export default CustomersSmall;
