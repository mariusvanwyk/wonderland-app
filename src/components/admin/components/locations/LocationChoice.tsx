import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Location} from "../../model/Location";
import {LocationServices} from "../../services/LocationServices";

type Properties = {

    label: string,
    locationId: number | undefined,
    onChange: (location: Location | undefined) => void;
}
const LocationChoice = ({label, locationId, onChange}: Properties) => {
    const [locations, setLocations] = useState<Location[]>();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        LocationServices.getInstance().getItems(0, Number.MAX_SAFE_INTEGER)
            .then((response) => {
                setLocations(response.data._embedded.locations);
            })
            .catch((error) => {
                console.debug("Error", error);
            })
            .finally(() => {
                setFetching(false);
            });
    }, []);

    const locationChanged = (id: number) => {
        if (locations) {
            for (let i = 0; i < locations?.length; i++) {
                if (locations[i].id === id) {
                    onChange(locations[i]);
                    break;
                }
            }
        }
    }

    return (
        <Form.Group className="mb-3" controlId="location-choice">
            <Form.Label>{label}</Form.Label>
            <Form.Select required={true} aria-label="Default select example" value={locationId ? locationId : ""}
                         disabled={fetching}
                         isInvalid={locationId === undefined || locationId <= 0}
                         onChange={(e) => {
                             locationChanged(Number(e.target.value));
                         }}>
                <option>{"Choose a Location"}</option>
                {locations && locations.map((location, index) => {
                    return (<option key={index} value={location.id}>{location.name}</option>)
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default LocationChoice
