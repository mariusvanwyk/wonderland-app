import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {Button, Card, CloseButton, Modal, Toast, ToastContainer} from "react-bootstrap";
import {useAppDispatch} from "../../../redux/hooks";
import {itemAdded, itemClosed, itemDeleted, itemSaved, SelectionState,} from "../../../redux/SelectionSlice";
import {ItemType} from "../../model/base/BaseItem";
import {ItemManager} from "../../managers/ItemManager";
import {Services} from "../../services/Services";
import {ServiceError} from "../../services/ServiceError";
import {AxiosError} from "axios";
import {getDateTimeAsString} from "../../../common/DateUtils";


type Properties = {
    itemType: ItemType,
    services: Services<any, any>,
    converter: ItemManager<any, any>,
    state: SelectionState<any>,
    itemForm: ReactNode
}

const ItemDetails = ({itemType, converter, services, state, itemForm}: Properties) => {
    const dispatch = useAppDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSavedFeedBack, setShowSavedFeedBack] = useState(false);

    const [showServiceErrorFeedBack, setShowServiceErrorFeedBack] = useState(false);
    const [serviceError, setServiceError] = useState<ServiceError>();

    const [showValidationFeedBack, setShowValidationFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        closeFeedBack();
    }, [state]);

    const handleDelete = () => {
        closeFeedBack();
        services.deleteItem(state.selectedItem)
            .then((response) => {
                dispatch(itemDeleted({itemType: itemType}));
                setShowDeleteModal(false);
            })
            .catch((error) => {
                serviceErrorFeedback(error);
            })
    }

    const handleAdd = () => {

        closeFeedBack();
        let validationErrors = converter.validate(state.selectedItem);
        if (validationErrors.length === 0) {
            console.debug("Adding")
            services.addItem(state.selectedItem)
                .then(function (response) {
                    console.debug(JSON.stringify(response.data))
                    dispatch(itemAdded({itemType: itemType, id: response.data}));
                    // dispatch(refreshItems({itemType: itemType}));
                })
                .catch(function (error) {
                    serviceErrorFeedback(error);
                })
        } else {
            console.debug("Add Validation failed")
            validationFeedback(validationErrors);
        }
    }

    const handleSaved = () => {
        closeFeedBack();
        let validationErrors = converter.validate(state.selectedItem);
        if (validationErrors.length === 0) {
            services.saveItem(state.selectedItem)
                .then((response) => {
                    dispatch(itemSaved({itemType: itemType, item: response.data}));
                    // dispatch(refreshItems({itemType: itemType}))
                    setShowSavedFeedBack(true);
                })
                .catch((error) => {
                    serviceErrorFeedback(error);
                });
        } else {
            validationFeedback(validationErrors);
        }
    }

    const serviceErrorFeedback = (axiosError: AxiosError) => {
        setServiceError(new ServiceError(axiosError));
        setShowServiceErrorFeedBack(true);
    }

    const validationFeedback = (validationErrors: string[]) => {
        setValidationErrors(validationErrors);
        setShowValidationFeedBack(true);
    }

    const closeFeedBack = () => {
        setValidationErrors([])
        setServiceError(undefined)
        setShowValidationFeedBack(false);
        setShowServiceErrorFeedBack(false);
    }

    const getHeading = () => {
        const heading = converter.getHeading(state.selectedItem);
        if (!heading || heading.trim() === "") {
            return "..."
        } else {
            return heading;
        }
    }

    return (
        <Fragment>
            {!state.fetching && state.selectedItem &&
                <>
                    <Card className={"h-100"}>
                        <Card.Header className={"d-flex justify-content-between align-items-center"}>
                            <h3 data-testid={"item-heading"}>{getHeading()}</h3>
                            <div className={"small text-muted ms-3"}>(Refreshed at: {getDateTimeAsString(Date.now())})
                            </div>
                            <CloseButton aria-label="Close"
                                         onClick={() => dispatch(itemClosed({itemType: itemType}))}/>
                        </Card.Header>
                        <Card.Body className={"overflow-scroll h-100"}>
                            {itemForm}
                        </Card.Body>
                        <Card.Footer className={"d-flex justify-content-center"}>
                            {/* eslint-disable-next-line jsx-a11y/no-access-key */}
                            {(state.selectedItem.id !== undefined) &&
                                <>
                                    <Button variant="primary" type="button" className={"me-1"}
                                            onClick={() => handleSaved()}>
                                        Update
                                    </Button>
                                    <Button variant="danger" type="button" className={"me-1"}
                                            data-testid={"delete-item-button"}
                                            onClick={() => setShowDeleteModal(true)}>
                                        Delete
                                    </Button>
                                    <Button variant="secondary" type="button" className={"me-1"}
                                            onClick={() => dispatch(itemClosed({itemType: itemType}))}>
                                        Close
                                    </Button>
                                </>
                            }
                            {(state.selectedItem.id === undefined) &&
                                <>
                                    <Button variant="success" type="button" className={"me-1"} data-testid={"add-item-button"}
                                            onClick={() => handleAdd()}>
                                        Add
                                    </Button>
                                    <Button variant="secondary" type="button" className={"me-1"}
                                            onClick={() => dispatch(itemClosed({itemType: itemType}))}>
                                        Cancel
                                    </Button>
                                </>
                            }
                        </Card.Footer>
                    </Card>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"Delete " + state.selectedItem.name}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to delete this item?
                            <p className={"text-danger"}>
                                This cannot be undone - be sure you want to do this.
                            </p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                                Close
                            </Button>
                            <Button variant="danger" onClick={() => handleDelete()} data-testid={"delete-item-confirm-button"}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <ToastContainer className="p-3" position={"bottom-end"}>
                        <Toast show={showSavedFeedBack} onClose={() => setShowSavedFeedBack(false)} delay={5000}
                               autohide bg={"success"}>
                            <Toast.Header closeButton={true}>
                                <strong className="me-auto">Details Saved</strong>
                            </Toast.Header>
                            <Toast.Body className={"text-white"}>
                                Your changes has been saved.
                            </Toast.Body>
                        </Toast>
                        <Toast show={showValidationFeedBack} onClose={() => closeFeedBack()} bg={"warning"}>
                            <Toast.Header closeButton={true}>
                                <strong className="me-auto">Validation Failed</strong>
                            </Toast.Header>
                            <Toast.Body>
                                <ol>
                                    {validationErrors.map((error, index) => <li key={index}>{error}</li>)}
                                </ol>
                            </Toast.Body>
                        </Toast>
                        <Toast show={showServiceErrorFeedBack} onClose={() => closeFeedBack()} bg={"danger"}>
                            <Toast.Header closeButton={true}>
                                <strong className="me-auto">Error</strong>
                            </Toast.Header>
                            <Toast.Body className={"text-white"}>
                                {serviceError?.status}: {serviceError?.code}
                            </Toast.Body>
                        </Toast>
                    </ToastContainer>
                </>
            }
        </Fragment>
    )
}
export default ItemDetails
