import React, {Fragment, useEffect, useState} from 'react';
import {Button, Card, CloseButton, Modal, Toast, ToastContainer} from "react-bootstrap";
import {VehicleCategory} from "../../../model/VehicleCategory";
import {VehicleCategoriesServices} from "../VehicleCategoriesServices";
import VehicleCategoryForm from "./VehicleCategoryForm";
import {useAppDispatch, useAppSelector} from "../../../redux/hooks";
import {
    getCategoriesSelectionState,
    vehicleCategoryClosed,
    vehicleCategoryDeleted,
    vehicleCategorySaved,
} from "../../../redux/SelectionSlice";


const services: VehicleCategoriesServices = new VehicleCategoriesServices();

const VehicleCategoryDetails = () => {
    const dispatch = useAppDispatch()
    const state = useAppSelector(getCategoriesSelectionState);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [category, setCategory] = useState<VehicleCategory>();
    const [name, setName] = useState<string>();
    const [showSavedFeedBack, setShowSavedFeedBack] = useState(false);
    const [showValidationFeedBack, setShowValidationFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        if (state.selectedId !== null) {
            closeFeedBack();
            services.getVehicleCategory(state.selectedId)
                .then((response) => {
                    setCategory(VehicleCategory.from(response.data));
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [state.selectedId, state.selectTime]);

    useEffect(() => {
        if (category) {
            setName(category.name)
        }
    }, [category])

    const handleDeleteConfirmation = (id: number) => {
        services.deleteVehicleCategory(id)
            .then((response) => {
                dispatch(vehicleCategoryDeleted({objectType:"CATEGORY"}));
                setShowDeleteModal(false);
            })
            .catch((error) => {
                feedback([error]);
            })
    }

    const handleSaved = (category: VehicleCategory) => {
        setShowSavedFeedBack(false);
        let errors = category.validate();
        if (errors.length === 0) {
            services.saveVehicleCategory(category)
                .then((response) => {
                    setCategory(VehicleCategory.from(response.data));
                    dispatch(vehicleCategorySaved({objectType:"CATEGORY", id: response.data.id}));
                    setShowSavedFeedBack(true);
                })
                .catch((error) => {
                    switch (error.response.status) {
                        case 412: {
                            feedback(["Your data is old. Refresh the screen"]);
                            break;
                        }
                        default: {
                            feedback([error.message]);
                        }
                    }

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
        <Fragment>
            {category && <>
                <Card className={"h-100"}>
                    <Card.Header className={"d-flex justify-content-between align-items-center"}>
                        <h3>{name}</h3>
                        <div className={"small text-muted ms-3"}>(Refreshed at: {new Date().toLocaleTimeString()})</div>
                        <CloseButton aria-label="Close" onClick={() => dispatch(vehicleCategoryClosed({objectType:"CATEGORY"}))}/>
                    </Card.Header>
                    <Card.Body className={"overflow-scroll h-100"}>
                        <VehicleCategoryForm showTechnical={true} formCategory={category}
                                             onUpdate={(category) => setCategory(category)}/>
                    </Card.Body>
                    <Card.Footer className={"d-flex justify-content-center"}>
                        {/* eslint-disable-next-line jsx-a11y/no-access-key */}
                        <Button variant="primary" type="button" className={"me-1"} onClick={() => handleSaved(category)}
                                accessKey={"s"}>
                            Save
                        </Button>
                        {/* eslint-disable-next-line jsx-a11y/no-access-key */}
                        <Button variant="danger" type="button" onClick={() => setShowDeleteModal(true)} accessKey={"d"}>
                            Delete
                        </Button>
                    </Card.Footer>
                </Card>
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
                        <Button variant="danger" onClick={() => handleDeleteConfirmation(category.id)}>
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
                            <strong className="me-auto">Error</strong>
                        </Toast.Header>
                        <Toast.Body>
                            <ol>
                                {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                            </ol>
                        </Toast.Body>
                    </Toast>
                </ToastContainer>
            </>
            }
        </Fragment>
    )
}
export default VehicleCategoryDetails
