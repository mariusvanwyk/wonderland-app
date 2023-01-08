import React, {useEffect, useState} from "react";
import HttpService from "../../../../services/HttpService";
import {Vehicle} from "../../model/Vehicle";
import {ServiceError} from "../../model/ServiceError";
import {Table, Toast, ToastContainer} from "react-bootstrap";
import {ResultPage} from "../../model/ResultPage";
import {EmbeddedVehicles} from "../../model/embedded/EmbeddedVehicles";
import Fetching from "../../common/Fetching";
import {getDateAsString} from "../../../common/DateUtils";

type Properties = {
    url: string,
    visible: boolean
}
const VehiclesList = ({url, visible}: Properties) => {

    const [vehicles, setVehicles] = useState<Vehicle[]>()
    const [showServiceErrorFeedBack, setShowServiceErrorFeedBack] = useState(false);
    const [serviceError, setServiceError] = useState<ServiceError>();
    const [fetching, setFetching] = useState<boolean>(false);

    useEffect(() => {
        setVehicles(undefined);
        setShowServiceErrorFeedBack(false);
        if (visible) {
            console.log("Extracting vehicles for: ", url)
            setFetching(true);
            HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicles>>(url)
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
    }, [url, visible]);

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

export default VehiclesList
