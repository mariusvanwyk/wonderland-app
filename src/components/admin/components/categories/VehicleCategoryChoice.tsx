import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {VehicleCategory} from "../../model/VehicleCategory";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";

type Properties = {
    categoryId: number | undefined,
    onChange: (categoryId: number | undefined) => void;
}
const VehicleCategoryChoice = ({categoryId, onChange}: Properties) => {
    const [vehicleCategories, setVehicleCategories] = useState<VehicleCategory[]>();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        VehicleCategoriesServices.getInstance().getItems(0, Number.MAX_SAFE_INTEGER)
            .then((response) => {
                setVehicleCategories(response.data._embedded.vehicleCategories);
            })
            .catch((error) => {
                console.debug("Error", error);
            })
            .finally(() => {
                setFetching(false);
            });
    }, []);

    const categoryChanged = (id: number) => {
        if (vehicleCategories) {
            for (let i = 0; i < vehicleCategories?.length; i++) {
                if (vehicleCategories[i].id === id) {
                    onChange(vehicleCategories[i].id);
                    break;
                }
            }
        }
    }

    return (
        <Form.Group className="mb-3" controlId="vehicle-category-choice">
            <Form.Label>Category</Form.Label>
            <Form.Select required={true} aria-label="Default select example" value={categoryId ? categoryId : ""}
                         disabled={fetching}
                         isInvalid={categoryId === undefined || categoryId <= 0}
                         onChange={(e) => {
                             categoryChanged(Number(e.target.value));
                         }}>
                <option>{"Choose a Category"}</option>
                {vehicleCategories && vehicleCategories.map((category, index) => {
                    return (<option key={index} value={category.id}>{category.name}</option>)
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default VehicleCategoryChoice
