import React, {useEffect, useState} from "react";
import HttpService from "../../../../services/HttpService";
import {Vehicle} from "../../model/Vehicle";
import {ServiceError} from "../../services/ServiceError";
import {Table, Toast, ToastContainer} from "react-bootstrap";
import {ResultPage} from "../../model/base/ResultPage";
import {EmbeddedVehicles} from "../../model/embedded/EmbeddedVehicles";
import Fetching from "../common/Fetching";
import {getDateAsString} from "../../../common/DateUtils";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesState} from "../../features/AdminSlice";

const VehiclesListForCategory = () => {
    const state = useAppSelector(getCategoriesState);
    const [vehicles, setVehicles] = useState<Vehicle[]>()
    const [showServiceErrorFeedBack, setShowServiceErrorFeedBack] = useState(false);
    const [serviceError, setServiceError] = useState<ServiceError>();
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        setVehicles(undefined);
        setShowServiceErrorFeedBack(false);
        if (state.selectedItem?._links) {
            console.debug("Extracting vehicles for: ", state.selectedItem._links.vehicles.href)
            setFetching(true);
            HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicles>>(state.selectedItem._links.vehicles.href)
                .then((response) => {
                    setVehicles(response.data._embedded.vehicles);
                })
                .catch((error) => {
                    setShowServiceErrorFeedBack(true);
                    setServiceError(new ServiceError(error));
                })
                .finally(() => {
                    setFetching(false);
                });
        }
    }, [state.selectedItem]);

    const closeFeedBack = () => {
        setServiceError(undefined)
        setShowServiceErrorFeedBack(false);
    }

    return (
        <div className={"mt-3"}>
            <Fetching visible={fetching}/>
            {!fetching &&
                <div className={"d-flex justify-content-end"}>
                    <a href={"/vehicles"}>Goto Vehicles</a>
                </div>
            }
            {vehicles && vehicles.length > 0 &&
                <>
                    <Table responsive>
                        <thead>
                        <tr>
                            <th>Registration</th>
                            <th>Purchased On</th>
                            <th>Road Tax Due</th>
                            <th>MOT Date</th>
                            <th>Fuel Consumption</th>
                            <th>Instalment</th>
                        </tr>
                        </thead>
                        <tbody>
                        {vehicles.map((vehicle, index) => {
                            return (
                                <tr key={index}>
                                    <td>{vehicle.registrationNumber}</td>
                                    <td>{getDateAsString(vehicle.purchasedOn)}</td>
                                    <td>{getDateAsString(vehicle.roadTaxDueDate)}</td>
                                    <td>{getDateAsString(vehicle.motDate)}</td>
                                    <td>{vehicle.fuelConsumption}</td>
                                    <td>{vehicle.instalment}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </Table>
                </>

            }
            {vehicles && vehicles.length === 0 && <div className={"d-flex justify-content-center"}>No vehicles</div>}
            <ToastContainer className="p-3" position={"bottom-end"}>
                <Toast show={showServiceErrorFeedBack} onClose={() => closeFeedBack()} bg={"danger"}>
                    <Toast.Header closeButton={true}>
                        <strong className="me-auto">Error</strong>
                    </Toast.Header>
                    <Toast.Body className={"text-white"}>
                        {serviceError?.status}: {serviceError?.code}
                    </Toast.Body>
                </Toast>
            </ToastContainer>
        </div>
    )
}

export default VehiclesListForCategory
