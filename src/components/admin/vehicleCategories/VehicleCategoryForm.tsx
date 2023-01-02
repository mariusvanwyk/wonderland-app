import React, {ChangeEvent} from 'react';
import {Accordion, Col, Form, Row} from "react-bootstrap";
import _ from "lodash";
import {ItemType} from "../model/BaseItem";
import {SelectionState, setItem} from "../../redux/SelectionSlice";
import {useAppDispatch} from "../../redux/hooks";

type Properties = {
    itemType: ItemType,
    showTechnical: boolean,
    state: SelectionState<any>,
}

const VehicleCategoryForm = ({itemType, state, showTechnical}: Properties) => {
    const dispatch = useAppDispatch();

    const handleNumberChange = (property: string, event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(state.item);
        // @ts-ignore
        updated[property] = Number(event.target.value);
        dispatch(setItem({itemType: itemType, item: updated}));
    }

    const handleStringChange = (property: string, event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(state.item);
        // @ts-ignore
        updated[property] = event.target.value;
        dispatch(setItem({itemType: itemType, item: updated}));
    }

    return (
        <Form noValidate>
            <Accordion flush={true} alwaysOpen={true} defaultActiveKey={"1"}>
                <Accordion.Item eventKey={"1"}>
                    <Accordion.Header className={"no-border"}>Basic Details
                        ({state.item.getBasicSummary()})</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="vehicleCategory.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={state.item.name}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                              handleStringChange("name", e)}
                                          isInvalid={state.item.name.trim() === ""}/>
                        </Form.Group>
                        <Row>
                            <Col sm={12} md={2}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.name">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control required value={state.item.color} type={"color"}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleStringChange("color", e)}
                                                  isInvalid={state.item.color.trim() === ""}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={10}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.size">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.size}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("size", e)}
                                                  isInvalid={state.item.size <= 0}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="vehicleCategory.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={state.item.description !== null ? state.item.description : ""}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                              handleStringChange("description", e)}/>
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={"2"}>
                    <Accordion.Header>Monthly Cost Details</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.roadTaxCost">
                                    <Form.Label>Road Tax</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.roadTaxCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("roadTaxCost", e)}
                                                  isInvalid={state.item.roadTaxCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.insuranceCost">
                                    <Form.Label>Insurance</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.insuranceCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("insuranceCost", e)}
                                                  isInvalid={state.item.insuranceCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.trackerCost">
                                    <Form.Label>Tracker</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.trackerCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("trackerCost", e)}
                                                  isInvalid={state.item.trackerCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.extraCost">
                                    <Form.Label>Extra</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.extraCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("extraCost", e)}
                                                  isInvalid={state.item.extraCost <= 0}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={"3"}>
                    <Accordion.Header>Rates</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.tireRate">
                                    <Form.Label>Tire Rate (per km)</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.tireRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("tireRate", e)}
                                                  isInvalid={state.item.tireRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.serviceRate">
                                    <Form.Label>Service Rate (per km)</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.serviceRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("serviceRate", e)}
                                                  isInvalid={state.item.serviceRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.overtimeRate">
                                    <Form.Label>Overtime Rate (per hour)</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.overtimeRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("overtimeRate", e)}
                                                  isInvalid={state.item.overtimeRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.fuelConsumption">
                                    <Form.Label>Fuel Consumption (per km)</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.fuelConsumption}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("fuelConsumption", e)}
                                                  isInvalid={state.item.fuelConsumption <= 0}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
                {showTechnical && <Accordion.Item eventKey={"0"}>
                    <Accordion.Header>Technical Details</Accordion.Header>
                    <Accordion.Body>
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
                    </Accordion.Body>
                </Accordion.Item>}
            </Accordion>
        </Form>
    )
}

export default VehicleCategoryForm
