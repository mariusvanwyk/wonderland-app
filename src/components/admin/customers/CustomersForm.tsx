import React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import {ItemType} from "../model/BaseItem";
import {SelectionState} from "../../redux/SelectionSlice";
import ItemFormControl from "../common/ItemFormControl";
import ItemTechnicalDetails from "../common/ItemTechnicalDetails";

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
