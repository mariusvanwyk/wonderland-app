import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {ItemType} from "../../model/BaseItem";
import {SelectionState, setItem} from "../../../redux/SelectionSlice";
import ItemFormControl from "../../common/ItemFormControl";
import {useAppDispatch} from "../../../redux/hooks";
import _ from "lodash";
import VehicleCategoryChoice from "../categories/VehicleCategoryChoice";
import ItemTechnicalDetails from "../../common/ItemTechnicalDetails";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
}

const VehicleForm = ({itemType, state}: Properties) => {
    const dispatch = useAppDispatch();

    const onCategoryChange = (categoryId: number | undefined) => {
        let vehicle = _.cloneDeep(state.selectedItem);
        vehicle.categoryId = categoryId;
        dispatch(setItem({itemType: itemType, item: vehicle}));
    }

    return (
        <Form noValidate>
            <Row>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.registrationNumber}
                                     property={"registrationNumber"}
                                     required={true}
                                     label={"Registration Number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <VehicleCategoryChoice categoryId={state.selectedItem.categoryId}
                                           onChange={onCategoryChange}/>
                </Col>
                <Col sm={12}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.description}
                                     property={"description"}
                                     required={false}
                                     label={"Description"}
                                     as={"textarea"}
                                     hideClear={true}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.fuelConsumption}
                                     property={"fuelConsumption"}
                                     required={true}
                                     label={"Fuel Consumption"}
                                     type={"number"}/>

                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.purchasedOn}
                                     property={"purchasedOn"}
                                     required={true}
                                     label={"Purchased On"}
                                     type={"date"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.roadTaxDueDate}
                                     property={"roadTaxDueDate"}
                                     required={true}
                                     label={"Road Tax Due Date"}
                                     type={"date"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.motDate}
                                     property={"motDate"}
                                     required={true}
                                     label={"MOT Due Date"}
                                     type={"date"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.instalment}
                                     property={"instalment"}
                                     required={true}
                                     label={"Instalment"}
                                     type={"number"}/>
                </Col>
            </Row>
            <ItemTechnicalDetails state={state}/>
        </Form>
    )
}

export default VehicleForm
