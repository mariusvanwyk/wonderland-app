import React, {useState} from 'react';
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import VehicleCategoryForm from "./VehicleCategoryForm";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {CategoriesServices, VehicleCategoriesServices} from "../VehicleCategoriesServices";

type Properties = {
    onAdd: (id: number) => void;
}

const newVehicleCategory: VehicleCategory = new VehicleCategory()
const services: CategoriesServices = new VehicleCategoriesServices();

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
            services.addVehicleCategory(category)
                .then(function (response) {
                    onAdd(response.data.id);
                    closeModal();

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
            <Button variant="success" title={"Add a new Vehicle Category"} size={"sm"}
                    onClick={() => setShowModal(true)} accessKey={"n"}>
                New
            </Button>
            <Modal show={showModal}
                   onHide={() => closeModal()}
                   onShow={() => handleShowModal()}
                   onBackdropClick={() => closeModal()}
                   scrollable={true}
                   centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Add new  category"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <VehicleCategoryForm showTechnical={false} formCategory={category}
                                         onUpdate={(category) => setCategory(category)}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => closeModal()}>
                        Close
                    </Button>
                    <Button variant="success" onClick={() => handleAddConfirmation()} accessKey={"a"}>
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
