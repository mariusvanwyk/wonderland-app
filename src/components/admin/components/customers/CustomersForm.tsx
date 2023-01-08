import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {ItemType} from "../../model/base/BaseItem";
import {SelectionState} from "../../../redux/SelectionSlice";
import ItemFormControl from "../common/ItemFormControl";
import ItemTechnicalDetails from "../common/ItemTechnicalDetails";
import ItemFormCheck from "../common/ItemFormCheck";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
}

const CustomersForm = ({itemType, state}: Properties) => {

    return (
        <Form noValidate>
            <Row>
                <Col sm={12} lg={6}>
                    <ItemFormControl itemType={itemType}
                                     state={state}
                                     value={state.selectedItem.name}
                                     property={"name"}
                                     required={true}
                                     label={"Name"}/>
                </Col>
                <Col sm={12} lg={6}>
                    <ItemFormCheck itemType={itemType}
                                   state={state}
                                   value={state.selectedItem.disabled}
                                   property={"disabled"}
                                   label={"Disabled"}/>
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
            </Row>
            <ItemTechnicalDetails state={state}/>
        </Form>
    )
}

export default CustomersForm
