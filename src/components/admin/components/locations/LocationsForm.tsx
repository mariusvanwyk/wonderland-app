import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {ItemType} from "../../model/base/BaseItem";
import {SelectionState} from "../../../redux/SelectionSlice";
import ItemFormControl from "../common/ItemFormControl";
import ItemTechnicalDetails from "../common/ItemTechnicalDetails";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
}

const LocationsForm = ({itemType, state}: Properties) => {

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
                <Col sm={12}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.address1}
                                     property={"address1"}
                                     required={true}
                                     label={"Address Line 1"}/>
                </Col>
                <Col sm={12}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.address2}
                                     property={"address2"}
                                     required={false}
                                     label={"Address Line 2"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.city}
                                     property={"city"}
                                     required={true}
                                     label={"City"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.zipCode}
                                     property={"zipCode"}
                                     required={false}
                                     label={"Zip/Postal Code"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.country}
                                     property={"country"}
                                     required={true}
                                     label={"Country"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.coordinates}
                                     property={"coordinates"}
                                     required={false}
                                     label={"Coordinates"}/>
                </Col>
            </Row>
            <ItemTechnicalDetails state={state}/>
        </Form>
    )
}

export default LocationsForm
