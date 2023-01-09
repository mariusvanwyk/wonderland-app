import {Accordion, Col, Form, Row} from "react-bootstrap";
import React from "react";
import {AdminState} from "../../features/AdminSlice";
import ReactJson from "react-json-view";
import {getDateTimeAsString} from "../../../common/DateUtils";

type Properties = {
    state: AdminState<any>,
}
const ItemTechnicalDetails = ({state}: Properties) => {

    return (
        <Accordion flush={true} alwaysOpen={true}>
            <Accordion.Item eventKey={"1"}>
                <Accordion.Header>Technical Details</Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                <Row>
                                    <Col sm={4}>Id</Col>
                                    <Col sm={8}><Form.Text>{state.selectedItem.id}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                <Row>
                                    <Col sm={4}>Version</Col>
                                    <Col sm={8}><Form.Text>{state.selectedItem.currentVersion}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                <Row>
                                    <Col sm={4}>Created By</Col>
                                    <Col sm={8}><Form.Text>{state.selectedItem.createdBy}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                <Row>
                                    <Col sm={4}>Created At</Col>
                                    <Col
                                        sm={8}><Form.Text>{getDateTimeAsString(state.selectedItem.createdAt)}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.updatedBy">
                                <Row>
                                    <Col sm={4}>Updated By</Col>
                                    <Col sm={8}><Form.Text>{state.selectedItem.updatedBy}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                        <Col sm={12} xl={6}>
                            <Form.Group className="mb-3" controlId="vehicleCategory.updatedAt">
                                <Row>
                                    <Col sm={4}>Updated At</Col>
                                    <Col
                                        sm={8}><Form.Text>{getDateTimeAsString(state.selectedItem.updatedAt)}</Form.Text></Col>
                                </Row>
                            </Form.Group>
                        </Col>
                    </Row>
                </Accordion.Body>
            </Accordion.Item>
            <Accordion.Item eventKey={"2"}>
                <Accordion.Header>Raw</Accordion.Header>
                <Accordion.Body>
                    <ReactJson src={state.selectedItem}/>
                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}

export default ItemTechnicalDetails
