import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import {Button, Card, CloseButton, Col, Modal, Row, Tab, Tabs, Toast, ToastContainer} from "react-bootstrap";
import {useAppDispatch} from "../../../redux/hooks";
import {AdminState, itemAdded, itemClosed, itemDeleted, itemSaved,} from "../../features/AdminSlice";
import {ItemType} from "../../model/base/BaseItem";
import {ItemManager} from "../../managers/ItemManager";
import {Services} from "../../services/Services";
import {ServiceError} from "../../services/ServiceError";
import {AxiosError} from "axios";
import {getDateTimeAsString} from "../../../common/DateUtils";
import ItemFormControl from "./ItemFormControl";
import ItemFormCheck from "./ItemFormCheck";
import ItemTechnicalDetails from "./ItemTechnicalDetails";

export type ItemTab = {
    label: string,
    component: ReactNode,
}

type Properties = {
    itemType: ItemType,
    services: Services<any, any>,
    manager: ItemManager<any, any>,
    state: AdminState<any>,
    itemForm?: ReactNode,
    itemTabs?: ItemTab[],
}

const ItemDetails = ({itemType, manager, services, state, itemForm, itemTabs}: Properties) => {
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
            .then(() => {
                dispatch(itemDeleted({itemType: itemType}));
                setShowDeleteModal(false);
            })
            .catch((error) => {
                serviceErrorFeedback(error);
            })
    }

    const handleAdd = () => {
        closeFeedBack();
        let validationErrors = manager.validate(state.selectedItem);
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
        let validationErrors = manager.validate(state.selectedItem);
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

    const getHeading = (item: any) => {
        const heading = manager.getHeading(item);
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
                            <h3 data-testid={"item-heading"}>{getHeading(state.selectedItem)}</h3>
                            <div className={"small text-muted ms-3"}>(Refreshed at: {getDateTimeAsString(Date.now())})
                            </div>
                            <CloseButton aria-label="Close"
                                         onClick={() => dispatch(itemClosed({itemType: itemType}))}/>
                        </Card.Header>
                        <Card.Body className={"overflow-auto h-100 card-body p-2"}>
                            <Tabs>
                                <Tab eventKey={"details"} title={"Details"}>
                                    <div className={"border-start border-end border-bottom p-2"}>
                                        <Row>
                                            {itemForm}
                                            {manager.getEditableProperties().map((editable, index) => {
                                                if (editable.hidden) {
                                                    return <Fragment key={index}></Fragment>
                                                }
                                                switch (editable.type) {
                                                    case "color":
                                                    case "date":
                                                    case "number":
                                                    case "string": {
                                                        return (
                                                            <Col sm={12} lg={6} key={index}>
                                                                <ItemFormControl itemType={itemType}
                                                                                 state={state}
                                                                                 value={state.selectedItem[editable.property]}
                                                                                 property={editable.property}
                                                                                 required={editable.required}
                                                                                 label={editable.label}
                                                                                 type={editable.type}/>
                                                            </Col>
                                                        )
                                                    }
                                                    case "text": {
                                                        return (
                                                            <Col sm={12} key={index}>
                                                                <ItemFormControl itemType={itemType}
                                                                                 state={state}
                                                                                 value={state.selectedItem[editable.property]}
                                                                                 property={editable.property}
                                                                                 required={editable.required}
                                                                                 label={editable.label}
                                                                                 as={"textarea"}
                                                                                 hideClear={true}/>
                                                            </Col>
                                                        )
                                                    }
                                                    case "boolean": {
                                                        return (
                                                            <Col sm={12} lg={6} key={index}>
                                                                <ItemFormCheck itemType={itemType}
                                                                               state={state}
                                                                               value={state.selectedItem[editable.property]}
                                                                               property={editable.property}
                                                                               label={editable.label}/>
                                                            </Col>
                                                        )
                                                    }
                                                    default: {
                                                        return <div key={index}>{editable.type} not supported yet</div>
                                                    }
                                                }
                                            })}
                                        </Row>
                                        <ItemTechnicalDetails state={state}/>
                                    </div>
                                </Tab>
                                {itemTabs && itemTabs.map((itemTab, index) => {
                                    return (
                                        <Tab eventKey={itemTab.label} title={itemTab.label} key={index}>
                                            {itemTab.component}
                                        </Tab>
                                    )
                                })}
                            </Tabs>
                        </Card.Body>
                        <Card.Footer className={"d-flex justify-content-center"}>
                            {(state.selectedItem.id !== undefined) &&
                                <>
                                    <Button variant="primary" type="button" className={"me-1"}
                                            data-testid={"update-item-button"}
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
                                    <Button variant="success" type="button" className={"me-1"}
                                            data-testid={"add-item-button"}
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
                            <Button variant="danger" onClick={() => handleDelete()}
                                    data-testid={"delete-item-confirm-button"}>
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
