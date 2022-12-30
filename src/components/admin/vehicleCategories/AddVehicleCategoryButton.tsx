import React, {useState} from 'react';
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import {VehicleCategory} from "./model";
import VehicleCategoryForm from "./VehicleCategoryForm";
import HttpService from "../../../services/HttpService";

type Properties = {
    onAdd: (category: VehicleCategory) => void;
}

const newVehicleCategory: VehicleCategory = new VehicleCategory(-1, "", 0, "#ffffff", "", true)

const AddVehicleCategoryButton = ({onAdd}: Properties) => {
    const [showModal, setShowModal] = useState(false);
    const [category, setCategory] = useState<VehicleCategory>(newVehicleCategory);
    const [showFeedBack, setShowFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleShowModal = () => {
        setCategory(newVehicleCategory);
    }

    const handleAddConfirmation = () => {

        let errors = category.validate();

        if (errors.length === 0) {
            HttpService.getAxiosClient().post<VehicleCategory>('/api/v1/vehicleCategories', category)
                .then(function (response) {
                    onAdd(response.data);
                    closeModal();
                    console.log(response);

                })
                .catch(function (error) {
                    errors = [...errors, error];
                    feedback(errors);
                });
        } else {
            feedback(errors);
        }
    }

    const feedback = (errors: string[]) => {
        setValidationErrors(errors);
        setShowFeedBack(true);
    }

    const closeFeedBack = () => {
        setValidationErrors([])
        setShowFeedBack(false);
    }

    const closeModal = () => {
        closeFeedBack();
        setShowModal(false);
    }

    return (
        <>
            <Button variant="primary" title={"Add a new Vehicle Category"} className={"me-1"} size={"sm"}
                    onClick={() => setShowModal(true)}>
                <i className={"bi bi-plus-circle"}></i>
            </Button>
            <Modal show={showModal}
                   onHide={() => closeModal()}
                   onShow={() => handleShowModal()}
                   onBackdropClick={() => closeModal()}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Add new  category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VehicleCategoryForm formCategory={category} onUpdate={(category) => setCategory(category)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleAddConfirmation()}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
            {/* TODO: merge this - use only one validation toast */}
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast show={showFeedBack} onClose={() => closeFeedBack()}>
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

export default AddVehicleCategoryButton
