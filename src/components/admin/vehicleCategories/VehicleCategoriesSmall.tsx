import React from 'react';
import Container from "react-bootstrap/Container";
import ItemDetails from "../common/ItemDetails";
import ItemsListPanel from "../common/ItemsListPanel";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState} from "../../redux/SelectionSlice";
import {VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategoryConverter} from "./VehicleCategoryConverter";
import {ItemType} from "../model/BaseItem";
import VehicleCategoryForm from "./VehicleCategoryForm";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const converter: VehicleCategoryConverter = new VehicleCategoryConverter();
const CATEGORY: ItemType = "CATEGORY";

const VehicleCategoriesSmall = () => {
    const state = useAppSelector(getCategoriesSelectionState);

    const categoryForm = () => <VehicleCategoryForm showTechnical={false} state={state} itemType={CATEGORY}/>;

    return (
        <Container fluid className={"h-100"}>
            {!state.selectedId &&
                <ItemsListPanel
                    name={"Vehicle Categories"}
                    itemType={CATEGORY}
                    services={services}
                    state={state}
                    converter={converter}
                    itemForm={categoryForm()}/>}
            {state.selectedId &&
                <ItemDetails
                    state={state}
                    converter={converter}
                    itemType={CATEGORY}
                    itemForm={categoryForm()}
                    services={services}/>}
        </Container>
    );
}

export default VehicleCategoriesSmall;
