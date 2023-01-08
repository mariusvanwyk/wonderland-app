import React, {ReactNode} from 'react';
import {Col, Row} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import ItemDetails from "../../common/ItemDetails";
import ItemsListPanel from "../../common/ItemsListPanel";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesSelectionState} from "../../../redux/SelectionSlice";
import {VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import {ItemType} from "../../model/BaseItem";

type Properties = {
    itemType: ItemType,
    services: VehicleCategoriesServices,
    converter: VehicleCategoryManager,
    form: ReactNode
}
const VehicleCategoriesLarge = ({itemType, services, converter, form}:Properties) => {
    // @ts-ignore
    const state = useAppSelector(getCategoriesSelectionState);

    return (
        <Container fluid className={"h-100"}>
            <Row className={"h-100"}>
                <Col sm={12} md={6} lg={4} className={"h-100 border-end"}>
                    <ItemsListPanel
                        name={"Vehicle Categories"}
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

export default VehicleCategoriesLarge;
