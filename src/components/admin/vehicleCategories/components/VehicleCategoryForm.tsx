import React, {ChangeEvent, useEffect, useState} from 'react';
import {Accordion, Col, Form, Row} from "react-bootstrap";
import _ from "lodash";
import {VehicleCategory} from "../../../model/VehicleCategory";

type Properties = {
    formCategory: VehicleCategory,
    onUpdate: (category: VehicleCategory) => void,
    showTechnical: boolean
}
const VehicleCategoryForm = ({formCategory, onUpdate, showTechnical}: Properties) => {

    const [category, setCategory] = useState<VehicleCategory>(formCategory);

    useEffect(() => {
        setCategory(formCategory);
    }, [formCategory]);

    const handleNumberChange = (property: string, event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        // @ts-ignore
        updated[property] = Number(event.target.value);
        setCategory(updated);
        onUpdate(updated);
    }

    const handleStringChange = (property: string, event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        // @ts-ignore
        updated[property] = event.target.value;
        setCategory(updated);
        onUpdate(updated);
    }

    return (
        <Form noValidate>
            <Accordion flush={true} alwaysOpen={true} defaultActiveKey={"1"}>
                <Accordion.Item eventKey={"1"}>
                    <Accordion.Header className={"no-border"}>Basic Details
                        ({category.getBasicSummary()})</Accordion.Header>
                    <Accordion.Body>
                        <Form.Group className="mb-3" controlId="vehicleCategory.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={category.name}
                                          onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                              handleStringChange("name", e)}
                                          isInvalid={category.name.trim() === ""}/>
                        </Form.Group>
                        <Row>
                            <Col sm={12} md={2}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.name">
                                    <Form.Label>Color</Form.Label>
                                    <Form.Control required value={category.color} type={"color"}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleStringChange("color", e)}
                                                  isInvalid={category.color.trim() === ""}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={10}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.size">
                                    <Form.Label>Size</Form.Label>
                                    <Form.Control required type={"number"} value={category.size}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("size", e)}
                                                  isInvalid={category.size <= 0}/>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Form.Group className="mb-3" controlId="vehicleCategory.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3}
                                          value={category.description !== null ? category.description : ""}
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
                                    <Form.Control required type={"number"} value={category.roadTaxCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("roadTaxCost", e)}
                                                  isInvalid={category.roadTaxCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.insuranceCost">
                                    <Form.Label>Insurance</Form.Label>
                                    <Form.Control required type={"number"} value={category.insuranceCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("insuranceCost", e)}
                                                  isInvalid={category.insuranceCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.trackerCost">
                                    <Form.Label>Tracker</Form.Label>
                                    <Form.Control required type={"number"} value={category.trackerCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("trackerCost", e)}
                                                  isInvalid={category.trackerCost <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.extraCost">
                                    <Form.Label>Extra</Form.Label>
                                    <Form.Control required type={"number"} value={category.extraCost}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("extraCost", e)}
                                                  isInvalid={category.extraCost <= 0}/>
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
                                    <Form.Control required type={"number"} value={category.tireRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("tireRate", e)}
                                                  isInvalid={category.tireRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.serviceRate">
                                    <Form.Label>Service Rate (per km)</Form.Label>
                                    <Form.Control required type={"number"} value={category.serviceRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("serviceRate", e)}
                                                  isInvalid={category.serviceRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.overtimeRate">
                                    <Form.Label>Overtime Rate (per hour)</Form.Label>
                                    <Form.Control required type={"number"} value={category.overtimeRate}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("overtimeRate", e)}
                                                  isInvalid={category.overtimeRate <= 0}/>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.fuelConsumption">
                                    <Form.Label>Fuel Consumption (per km)</Form.Label>
                                    <Form.Control required type={"number"} value={category.fuelConsumption}
                                                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                                      handleNumberChange("fuelConsumption", e)}
                                                  isInvalid={category.fuelConsumption <= 0}/>
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
                                        <Col sm={10}><Form.Text>{category.id}</Form.Text></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                    <Row>
                                        <Col sm={2}>Version</Col>
                                        <Col sm={10}><Form.Text>{category.currentVersion}</Form.Text></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                    <Row>
                                        <Col sm={4}>Created By</Col>
                                        <Col sm={8}><Form.Text>{category.createdBy}</Form.Text></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.id">
                                    <Row>
                                        <Col sm={4}>Created At</Col>
                                        <Col sm={8}><Form.Text>{category.createdAt}</Form.Text></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.updatedBy">
                                    <Row>
                                        <Col sm={4}>Updated By</Col>
                                        <Col sm={8}><Form.Text>{category.updatedBy}</Form.Text></Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col sm={12} md={6}>
                                <Form.Group className="mb-3" controlId="vehicleCategory.updatedAt">
                                    <Row>
                                        <Col sm={4}>Updated At</Col>
                                        <Col sm={8}><Form.Text>{category.updatedAt}</Form.Text></Col>
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
