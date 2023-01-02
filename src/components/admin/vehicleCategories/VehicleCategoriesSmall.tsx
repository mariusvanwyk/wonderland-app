import React from 'react';
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import ItemsListPanel from "./components/ItemsListPanel";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState} from "../../redux/SelectionSlice";

const VehicleCategoriesSmall = () => {
    const state = useAppSelector(getCategoriesSelectionState)
    return (
        <Container fluid className={"h-100"}>
            {!state.selectedId && <ItemsListPanel/>}
            {state.selectedId && <VehicleCategoryDetails/>}
        </Container>
    );
}

export default VehicleCategoriesSmall;
