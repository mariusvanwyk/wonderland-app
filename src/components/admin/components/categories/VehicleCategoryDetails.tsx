import React, {useEffect, useState} from "react";
import {VehicleCategory} from "../../model/VehicleCategory";
import HttpService from "../../../../services/HttpService";
import ReactJson from "react-json-view";


type Properties = {
    url: string
}

const VehicleCategoryDetails = ({url}: Properties) => {
    const [vehicleCategory, setVehicleCategory] = useState<VehicleCategory>();
    const [error, setError] = useState<String>();

    useEffect(() => {
        HttpService.getAxiosClient().get<VehicleCategory>(url)
            .then((response) => {
                setVehicleCategory(response.data);
            })
            .catch((error) => {
                console.debug("Error", error)
                setError(JSON.stringify(error.response.status))
            });
    }, [url]);

    return (
        <>
            <div>{url}</div>
            {error && <>{error}</>}
            {vehicleCategory && <ReactJson src={vehicleCategory}/>}
        </>
    )
}

export default VehicleCategoryDetails
