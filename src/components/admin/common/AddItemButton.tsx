import React, {ReactNode, useState} from 'react';
import {Button, Modal, Toast, ToastContainer} from "react-bootstrap";
import {useAppDispatch} from "../../redux/hooks";
import {itemAdded, SelectionState, setItem} from "../../redux/SelectionSlice";
import {Converter} from "../Converter";
import {Services} from "../Services";
import {ItemType} from "../model/BaseItem";


type Properties = {
    itemType: ItemType,
    services: Services<any, any>,
    converter: Converter<any, any>,
    state: SelectionState<any>,
    itemForm: ReactNode
}

const AddItemButton = ({itemType, services, converter, state, itemForm}: Properties) => {
    const dispatch = useAppDispatch()

    const [showModal, setShowModal] = useState(false);
    // const [item, setItem] = useState<BaseModelObject>(converter.newItem());
    const [showFeedBack, setShowFeedBack] = useState(false);
    const [validationErrors, setValidationErrors] = useState<string[]>([]);

    const handleShowModal = () => {
        dispatch(setItem({itemType: itemType, item: converter.newItem()}));
        setShowModal(true)
    }

    const handleAddConfirmation = () => {

        let errors = state.item.validate();

        if (errors.length === 0) {
            services.addItem(state.item)
                .then(function (response) {
                    dispatch(itemAdded({itemType: itemType, id: response.data.id}));
                    closeModal();
                })
                .catch(function (error) {
                    errors = [...errors, error];
                    feedback(errors);
                })
                .finally(() => {
                    dispatch(setItem({itemType: itemType, item: converter.newItem()}));
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
            <Button variant="success" title={"Add new"} size={"sm"}
                    onClick={() => handleShowModal()} accessKey={"n"}>
                New
            </Button>
            <Modal show={showModal}
                   onHide={() => closeModal()}
                   onBackdropClick={() => closeModal()}
                   scrollable={true}
                   centered={true}>
                <Modal.Header closeButton>
                    <Modal.Title>{"Add new"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {itemForm}
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

export default AddItemButton
