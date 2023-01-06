import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {ItemType} from "../model/BaseItem";
import {SelectionState} from "../../redux/SelectionSlice";
import ItemFormControl from "../common/ItemFormControl";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
}

const VehicleCategoryForm = ({itemType, state}: Properties) => {

    return (
        <Form noValidate>
            <Row>
                <Col sm={12}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.name}
                                     property={"name"}
                                     required={true}
                                     label={"Name"}/>
                </Col>
                <Col sm={12} md={10}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.size}
                                     property={"size"}
                                     required={true}
                                     label={"Size"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} md={2}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.color}
                                     property={"color"}
                                     required={true}
                                     label={"Color"}
                                     type={"color"}/>
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
                                     value={state.selectedItem.roadTaxCost}
                                     property={"roadTaxCost"}
                                     required={true}
                                     label={"Road Tax"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.insuranceCost}
                                     property={"insuranceCost"}
                                     required={true}
                                     label={"Insurance"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.trackerCost}
                                     property={"trackerCost"}
                                     required={true}
                                     label={"Tracker"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.extraCost}
                                     property={"extraCost"}
                                     required={true}
                                     label={"Extra"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.tireRate}
                                     property={"tireRate"}
                                     required={true}
                                     label={"Tire Rate (per km)"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.serviceRate}
                                     property={"serviceRate"}
                                     required={true}
                                     label={"Service Rate (per km)"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.overtimeRate}
                                     property={"overtimeRate"}
                                     required={true}
                                     label={"Overtime Rate (per hour)"}
                                     type={"number"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.fuelConsumption}
                                     property={"fuelConsumption"}
                                     required={true}
                                     label={"Fuel Consumption (per km)"}
                                     type={"number"}/>
                </Col>
            </Row>
        </Form>
    )
}

export default VehicleCategoryForm
