import React, {ReactNode} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails, {ItemTab} from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {AdminState} from "../../features/AdminSlice";

import {ItemType} from "../../model/base/BaseItem";
import {ItemManager} from "../../managers/ItemManager";
import {Services} from "../../services/Services";

type Properties = {
    label: string,
    itemType: ItemType,
    services: Services<any, any>
    manager: ItemManager<any, any>,
    itemForm?: ReactNode,
    itemTabs?: ItemTab[],
    state: AdminState<any>,

}
const LargePage = ({label, itemType, services, manager, itemForm, state, itemTabs}:Properties) => {
    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={label}
                        itemType={itemType}
                        services={services}
                        manager={manager}
                        state={state}/>
                </Col>
                <Col sm={12} md={6} lg={8} className={"h-100 pb-2"}>
                    {state.selectedItem &&
                        <ItemDetails
                            state={state}
                            manager={manager}
                            itemType={itemType}
                            services={services}
                            itemForm={itemForm}
                            itemTabs={itemTabs}/>}
                </Col>
            </Row>
        </Container>
    );
}

export default LargePage;
