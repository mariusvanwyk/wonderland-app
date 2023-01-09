import React, {ReactNode} from 'react';
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {AdminState} from "../../features/AdminSlice";

import {ItemType} from "../../model/base/BaseItem";
import {Services} from "../../services/Services";
import {ItemManager} from "../../managers/ItemManager";

type Properties = {
    label: string,
    itemType: ItemType,
    services: Services<any, any>
    manager: ItemManager<any, any>,
    form: ReactNode,
    state: AdminState<any>,
}

const SmallPage = ({label, itemType, services, manager, form, state}: Properties) => {
    return (
        <Container fluid className={"h-100"}>
            {!state.selectedItem &&
                <ItemsListPanel
                    name={label}
                    itemType={itemType}
                    services={services}
                    state={state}
                    manager={manager}/>}
            {state.selectedItem &&
                <ItemDetails
                    state={state}
                    converter={manager}
                    itemType={itemType}
                    itemForm={form}
                    services={services}/>}
        </Container>
    );
}

export default SmallPage;
