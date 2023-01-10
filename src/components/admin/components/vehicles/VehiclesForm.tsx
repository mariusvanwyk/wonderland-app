import React from 'react';
import {Col} from "react-bootstrap";
import {ItemType} from "../../model/base/BaseItem";
import {AdminState, setItem} from "../../features/AdminSlice";
import {useAppDispatch} from "../../../redux/hooks";
import _ from "lodash";
import VehicleCategoryChoice from "../categories/VehicleCategoryChoice";

type Properties = {
    itemType: ItemType,
    state: AdminState<any>,
}

const VehiclesForm = ({itemType, state}: Properties) => {
    const dispatch = useAppDispatch();

    const onCategoryChange = (categoryId: number | undefined) => {
        let vehicle = _.cloneDeep(state.selectedItem);
        vehicle.categoryId = categoryId;
        dispatch(setItem({itemType: itemType, item: vehicle}));
    }

    return (
        <Col sm={12} lg={6}>
            <VehicleCategoryChoice categoryId={state.selectedItem.categoryId}
                                   onChange={onCategoryChange}/>
        </Col>
    )
}

export default VehiclesForm
