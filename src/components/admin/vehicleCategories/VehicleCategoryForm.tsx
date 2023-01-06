import React, {useState} from 'react';
import {Col, Form, Row, Tab, Tabs} from "react-bootstrap";
import {ItemType} from "../model/BaseItem";
import {SelectionState} from "../../redux/SelectionSlice";
import ItemFormControl from "../common/ItemFormControl";
import ItemTechnicalDetails from "../common/ItemTechnicalDetails";
import VehiclesList from "../vehicles/VehiclesList";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
}

const VehicleCategoryForm = ({itemType, state}: Properties) => {

    const [key, setKey] = useState<string>("details");

    return (
        <Tabs activeKey={key} onSelect={(k) => setKey(k ? k : "details")}>
            <Tab eventKey="details" title="Details">
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
                        <Col sm={12} lg={6}>
                            <ItemFormControl itemType={itemType}
                                             state={state}
                                             value={state.selectedItem.size}
                                             property={"size"}
                                             required={true}
                                             label={"Size"}
                                             type={"number"}/>
                        </Col>
                        <Col sm={12} lg={6}>
                            <div>
                                <ItemFormControl itemType={itemType}
                                                 state={state}
                                                 value={state.selectedItem.color}
                                                 property={"color"}
                                                 required={true}
                                                 label={"Color"}
                                                 type={"color"}/>
                            </div>
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
                    <ItemTechnicalDetails state={state}/>
                </Form>
            </Tab>
            <Tab eventKey="vehicles" title="Vehicles">
                <VehiclesList url={state.selectedItem._links.vehicles.href} visible={key === "vehicles"}/>
                {/*{<VehicleCategoryForm itemType={itemType} state={state}/>}*/}
            </Tab>
        </Tabs>
    )
}

export default VehicleCategoryForm
