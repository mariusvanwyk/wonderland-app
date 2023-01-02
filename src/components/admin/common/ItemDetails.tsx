import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {Button, Card, CloseButton, Modal, Toast, ToastContainer} from "react-bootstrap";
import {useAppDispatch} from "../../redux/hooks";
import {
    itemClosed,
    itemDeleted,
    itemSaved, SelectionState, setItem,
} from "../../redux/SelectionSlice";
import {ItemType} from "../model/BaseItem";
import {Converter} from "../Converter";
import {Services} from "../Services";


type Properties = {
    itemType: ItemType,
    services: Services<any, any>,
    converter: Converter<any, any>,
    state: SelectionState<any>,
    itemForm: ReactNode
}

const ItemDetails = ({itemType, converter, services, state, itemForm}: Properties) => {
    const dispatch = useAppDispatch()

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSavedFeedBack, setShowSavedFeedBack] = useState(false);
    const [showValidationFeedBack, setShowValidationFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    useEffect(() => {
        if (state.selectedId !== null) {
            closeFeedBack();
            services.getItem(state.selectedId)
                .then((response) => {
                    dispatch(setItem({itemType: itemType, item: converter.from(response.data)}));
                })
                .catch((error) => {
                    console.error(error)
                });
        }
    }, [state.selectedId, state.selectTime]);

    const handleDeleteConfirmation = () => {
        if (state.item) {
            services.deleteItem(state.item.id)
                .then((response) => {
                    dispatch(itemDeleted({itemType: itemType}));
                    setShowDeleteModal(false);
                })
                .catch((error) => {
                    feedback([error]);
                })
        } else {
            // TODO: How can we get in to this situation?
        }

    }

    const handleSaved = () => {
        if (state.item) {
            setShowSavedFeedBack(false);
            let errors = state.item.validate();
            if (errors.length === 0) {
                services.saveItem(state.item)
                    .then((response) => {
                        dispatch(setItem({itemType: itemType, item: converter.from(response.data)}));
                        dispatch(itemSaved({itemType: itemType, id: response.data.id}));
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
        } else {
            // TODO: How can we get in to this situation?
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

    // @ts-ignore
    return (
        <Fragment>
            {state.item &&
                <>
                    <Card className={"h-100"}>
                        <Card.Header className={"d-flex justify-content-between align-items-center"}>
                            <h3>{state.item.name}</h3>
                            <div className={"small text-muted ms-3"}>(Refreshed at: {new Date().toLocaleTimeString()})
                            </div>
                            <CloseButton aria-label="Close"
                                         onClick={() => dispatch(itemClosed({itemType: itemType}))}/>
                        </Card.Header>
                        <Card.Body className={"overflow-scroll h-100"}>
                            {itemForm}
                        </Card.Body>
                        <Card.Footer className={"d-flex justify-content-center"}>
                            {/* eslint-disable-next-line jsx-a11y/no-access-key */}
                            <Button variant="primary" type="button" className={"me-1"}
                                    onClick={() => handleSaved()}
                                    accessKey={"s"}>
                                Save
                            </Button>
                            {/* eslint-disable-next-line jsx-a11y/no-access-key */}
                            <Button variant="danger" type="button" onClick={() => setShowDeleteModal(true)}
                                    accessKey={"d"}>
                                Delete
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                        <Modal.Header closeButton>
                            <Modal.Title>{"Delete " + state.item.name}</Modal.Title>
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
                            <Button variant="danger" onClick={() => handleDeleteConfirmation()}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>
                    <ToastContainer className="p-3" position={"bottom-end"}>
                        <Toast show={showSavedFeedBack} onClose={() => setShowSavedFeedBack(false)} delay={3000}
                               autohide>
                            <Toast.Header closeButton={true}>
                                <strong className="me-auto">Details Saved</strong>
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
export default ItemDetails
