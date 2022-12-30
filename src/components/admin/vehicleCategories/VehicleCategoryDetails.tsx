import React, {useEffect, useState} from 'react';
import {Button, CloseButton, Form, Modal, Toast, ToastContainer} from "react-bootstrap";
import {VehicleCategory} from "./model";
import VehicleCategoryForm from "./VehicleCategoryForm";
import HttpService from "../../../services/HttpService";

type Properties = {
    selected: VehicleCategory,
    onSaved: () => void,
    onDeleted: () => void,
    onClosed: () => void,

}
const VehicleCategoryDetails = ({selected, onSaved, onDeleted, onClosed}: Properties) => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [category, setCategory] = useState(selected);
    const [showSavedFeedBack, setShowSavedFeedBack] = useState(false);
    const [showValidationFeedBack, setShowValidationFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        setCategory(selected);
    }, [selected]);

    const handleDeleteConfirmation = () => {
        HttpService.getAxiosClient().delete(`/api/v1/vehicleCategories/${category.id}`)
            .then((response) => {
                onDeleted();
                setShowDeleteModal(false);
            })
            .catch((error) => {
                feedback([error]);
            })
    }

    const handleSaved = () => {
        setShowSavedFeedBack(false);
        let errors = category.validate();
        if (errors.length === 0) {
            HttpService.getAxiosClient().put(`/api/v1/vehicleCategories/${category.id}`, category)
                .then((response) => {
                    onSaved();
                    setShowSavedFeedBack(true);
                })
                .catch((error) => {
                    feedback([error.code]);
                });
        } else {
            feedback(errors);
        }
    }

    const feedback = (errors: string[]) => {
        setValidationErrors(errors);
        setShowValidationFeedBack(true);
    }

    const closeFeedBack = () => {
        setValidationErrors([])
        setShowValidationFeedBack(false);
    }

    return (
        <>
            <div className={"d-flex justify-content-end"}>
                <CloseButton aria-label="Close" onClick={() => onClosed()}/>
            </div>
            <Form.Group className="mb-3" controlId="vehicleCategory.name">
                <Form.Text>Id: {category.id}</Form.Text>
            </Form.Group>
            <VehicleCategoryForm formCategory={category} onUpdate={(category) => setCategory(category)}/>
            <div className={"d-flex justify-content-center"}>
                <Button variant="primary" type="button" className={"me-1"} onClick={() => handleSaved()}>
                    Save
                </Button>
                <Button variant="danger" type="button" onClick={() => setShowDeleteModal(true)}>
                    Delete
                </Button>
            </div>
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
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast show={showSavedFeedBack} onClose={() => setShowSavedFeedBack(false)} delay={3000} autohide>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Category Saved</strong>
                    </Toast.Header>
                    <Toast.Body>Your changes has been saved.</Toast.Body>
                </Toast>
            </ToastContainer>
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast show={showValidationFeedBack} onClose={() => closeFeedBack()}>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Validation failed</strong>
                    </Toast.Header>
                    <Toast.Body>
                        <ol>
                            {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                        </ol>
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </>
    )
}
export default VehicleCategoryDetails
