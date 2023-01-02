import React from 'react';
import Container from "react-bootstrap/Container";
import VehicleCategoryDetails from "./components/VehicleCategoryDetails";
import VehicleCategoriesList from "./components/VehicleCategoriesList";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState} from "../../redux/SelectionSlice";

const VehicleCategoriesSmall = () => {
    const state = useAppSelector(getCategoriesSelectionState)
    return (
        <Container fluid className={"h-100"}>
            {!state.selectedId && <VehicleCategoriesList/>}
            {state.selectedId && <VehicleCategoryDetails/>}
        </Container>
    );
}

export default VehicleCategoriesSmall;
