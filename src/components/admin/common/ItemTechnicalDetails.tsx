import {Col, Form, Row} from "react-bootstrap";
import React from "react";
import {ItemType} from "../model/BaseItem";
import {SelectionState} from "../../redux/SelectionSlice";

type Properties = {
    state: SelectionState<any>,
}
const ItemTechnicalDetails = ({state}:Properties) => {
    return (
        <Row>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                    <Row>
                        <Col sm={2}>Id</Col>
                        <Col sm={10}><Form.Text>{state.item.id}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                    <Row>
                        <Col sm={2}>Version</Col>
                        <Col sm={10}><Form.Text>{state.item.currentVersion}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                    <Row>
                        <Col sm={4}>Created By</Col>
                        <Col sm={8}><Form.Text>{state.item.createdBy}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                    <Row>
                        <Col sm={4}>Created At</Col>
                        <Col sm={8}><Form.Text>{state.item.createdAt}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.updatedBy">
                    <Row>
                        <Col sm={4}>Updated By</Col>
                        <Col sm={8}><Form.Text>{state.item.updatedBy}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
            <Col sm={12} md={6}>
                <Form.Group className="mb-3" controlId="vehicleCategory.updatedAt">
                    <Row>
                        <Col sm={4}>Updated At</Col>
                        <Col sm={8}><Form.Text>{state.item.updatedAt}</Form.Text></Col>
                    </Row>
                </Form.Group>
            </Col>
        </Row>

    )
}

export default ItemTechnicalDetails