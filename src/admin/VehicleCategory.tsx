import React, {ChangeEvent, useEffect, useState} from 'react';
import {Button, CloseButton, Form, Modal} from "react-bootstrap";
import {Category} from "./VehicleCategories";

type Properties = {
    selected: Category,
    saved: (category: Category) => void,
    deleted: (category: Category) => void,
    closed: () => void,

}
const VehicleCategory = ({selected, saved, deleted, closed}: Properties) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [category, setCategory] = useState(selected);

    useEffect(() => {
        setCategory(selected);
    }, [selected]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            name: event.target.value
        });
    }

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCategory({
            ...category,
            description: event.target.value
        });
    }

    const handleDeleteConfirmation = () => {
        deleted(selected);
        setShowDeleteModal(false);
    }

    return (
        <>
            <div className={"d-flex justify-content-end"}>
                <CloseButton aria-label="Close" onClick={() => closed()}/>
            </div>
            <Form>
                <Form.Group className="mb-3" controlId="vehicleCategory.name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control value={category.name} onChange={handleNameChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="vehicleCategory.description">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={3} value={category.description}
                                  onChange={handleDescriptionChange}/>
                </Form.Group>
                <div className={"d-flex justify-content-center"}>
                    <Button variant="primary" type="button" className={"me-1"} onClick={() => saved(category)}>
                        Save
                    </Button>
                    <Button variant="danger" type="button" onClick={() => setShowDeleteModal(true)}>
                        Delete
                    </Button>
                </div>
            </Form>

            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Delete " + category.name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete this Vehicle Category?
                    <p className={"text-danger"}>
                        This cannot be undone - be sure you want to do this.
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Close
                    </Button>
                    <Button variant="danger" onClick={() => handleDeleteConfirmation()}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
export default VehicleCategory
