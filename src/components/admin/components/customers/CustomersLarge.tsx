import React, {ReactNode} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails from "../../common/ItemDetails";
import ItemsListPanel from "../../common/ItemsListPanel";
import {useAppSelector} from "../../../redux/hooks";
import {getCustomerSelectionState} from "../../../redux/SelectionSlice";

import {ItemType} from "../../model/BaseItem";
import {CustomerServices} from "./CustomerServices";
import {CustomerManager} from "../../managers/CustomerManager";

type Properties = {
    itemType: ItemType,
    services: CustomerServices,
    converter: CustomerManager,
    form: ReactNode
}
const CustomersLarge = ({itemType, services, converter, form}:Properties) => {
    // @ts-ignore
    const state = useAppSelector(getCustomerSelectionState);

    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={"Customers"}
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

export default CustomersLarge;
