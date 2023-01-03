import React, {ChangeEvent} from 'react';
import {Accordion, Col, Form, Row} from "react-bootstrap";
import _ from "lodash";
import {ItemType} from "../model/BaseItem";
import {SelectionState, setItem} from "../../redux/SelectionSlice";
import {useAppDispatch} from "../../redux/hooks";
import ItemTechnicalDetails from "../common/ItemTechnicalDetails";

type Properties = {
    itemType: ItemType,
    showTechnical: boolean,
    state: SelectionState<any>,
}

const VehicleForm = ({itemType, state, showTechnical}: Properties) => {
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
                    <Accordion.Header className={"no-border"}>Basic Details</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="vehicle.registration">
                            <Form.Label>Registration Number</Form.Label>
                            <Form.Control required value={state.item.registrationNumber}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                              handleStringChange("registrationNumber", e)}
                                          isInvalid={state.item.registrationNumber.trim() === ""}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="vehicle.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={state.item.description !== null ? state.item.description : ""}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                              handleStringChange("description", e)}/>
                        </Form.Group>
                    </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey={"2"}>
                    <Accordion.Header>Extra</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicle.fuelConsumption">
                                    <Form.Label>Fuel Consumption</Form.Label>
                                    <Form.Control required type={"number"} value={state.item.fuelConsumption}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("fuelConsumption", e)}
                                                  isInvalid={state.item.fuelConsumption <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicle.purchasedOn">
                                    <Form.Label>Purchased On</Form.Label>
                                    <Form.Control required type={"date"} value={state.item.purchasedOn}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleStringChange("purchasedOn", e)}
                                                  isInvalid={state.item.purchasedOn <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicle.roadTaxDueDate">
                                    <Form.Label>Road Tax Due Date</Form.Label>
                                    <Form.Control required type={"date"} value={state.item.roadTaxDueDate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleStringChange("roadTaxDueDate", e)}
                                                  isInvalid={state.item.roadTaxDueDate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicle.motDate">
                                    <Form.Label>MOT Due Date</Form.Label>
                                    <Form.Control required type={"date"} value={state.item.motDate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleStringChange("motDate", e)}
                                                  isInvalid={state.item.motDate <= 0}/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>

                {showTechnical && <Accordion.Item eventKey={"0"}>
                    <Accordion.Header>Technical Details</Accordion.Header>
                    <Accordion.Body>
                        <ItemTechnicalDetails state={state}/>
                    </Accordion.Body>
                </Accordion.Item>}
            </Accordion>
        </Form>
    )
}

export default VehicleForm
