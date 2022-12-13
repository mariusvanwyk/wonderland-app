import React, {ChangeEvent, useState} from 'react';
import {Button, Col, Form, ListGroup, Modal, Row, Toast, ToastContainer} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import VehicleCategory from "./VehicleCategory";

export type Category = {
    id: number,
    name: string,
    description?: string,
    enabled?: boolean,
}

const defaultCategories: Category[] = [
    {id: 1, name: "Large Trucks", description: "25 ton and above trucks"},
    {id: 2, name: "Medium Trucks", description: ""},
    {id: 3, name: "Small Trucks", description: ""},
];

function VehicleCategories() {

    const [categories, setCategories] = useState<Category[]>(defaultCategories);
    const [selected, setSelected] = useState<Category | null>();
    const [newCategory, setNewCategory] = useState<Category>({
        name: "",
        description: "",
        id: -1
    });
    const [showAddModal, setShowAddModal] = useState(false);
    const [showSavedFeedBack, setShowSavedFeedBack] = useState(false);

    const saveCategory = (category: Category) => {
        const updated = [...categories];
        for (const i in updated) {
            if (updated[i].id == category.id) {
                updated[i].name = category.name;
                updated[i].description = category.description;
                break;
            }
        }
        setCategories(updated);
        setShowSavedFeedBack(true);
    }

    const deleteCategory = (category: Category) => {
        const updated = categories.filter(function (current) {
            return current.id != category.id;
        });
        setCategories(updated);
        setSelected(null);
    }

    const handleAddConfirmation = () => {
        if (newCategory.name && newCategory.name !== "") {
            const updated = [...categories, newCategory];
            setCategories(updated);
            setSelected(newCategory);
            setShowAddModal(false);
        }
    }

    const handleShowAddModal = () => {
        setNewCategory({
            name: "",
            description: "",
            id: -1
        });
    }

    const handleNewNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewCategory({
            ...newCategory,
            name: event.target.value
        });
    }

    const handleNewDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewCategory({
            ...newCategory,
            description: event.target.value
        });
    }

    return (
        <Container fluid>
            <h3>Vehicle Categories</h3>
            <Row>
                <Col sm={12} md={4} lg={3} className={"border-end"}>
                    <div className={"d-flex justify-content-end mb-2"}>
                        <Button variant="success" size={"sm"} title={"Add a new Vehicle Category"}
                                onClick={() => setShowAddModal(true)}>Add</Button>
                    </div>
                    <ListGroup variant="flush">
                        {
                            categories.map((current, index) => {
                                return (
                                    <ListGroup.Item action
                                                    active={selected != null && selected.id === current.id}
                                                    onClick={() => setSelected(current)} key={index}>
                                        {current.name}
                                    </ListGroup.Item>
                                )
                            })
                        }
                    </ListGroup>
                </Col>
                <Col sm={12} md={8} lg={9}>
                    {selected &&
                        <VehicleCategory selected={selected}
                                         saved={(category) => saveCategory(category)}
                                         deleted={(category) => deleteCategory(category)}
                                         closed={() => setSelected(null)}
                        />
                    }
                </Col>
            </Row>

            <Modal show={showAddModal}
                   onHide={() => setShowAddModal(false)}
                   onShow={() => handleShowAddModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Add new  category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form noValidate>
                        <Form.Group className="mb-3" controlId="vehicleCategory.name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control required value={newCategory && newCategory.name} onChange={handleNewNameChange}
                                          isInvalid={newCategory == null || newCategory.name.trim() === ""}/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="vehicleCategory.description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={newCategory.description}
                                          onChange={handleNewDescriptionChange}/>
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleAddConfirmation()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>

            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast show={showSavedFeedBack} onClose={() => setShowSavedFeedBack(false)} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Category Saved</strong>
                    </Toast.Header>
                    <Toast.Body>Your changes has been saved.</Toast.Body>
                </Toast>
            </ToastContainer>
        </Container>
    );
}

export default VehicleCategories;
