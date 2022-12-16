import React, {ChangeEvent, useEffect, useState} from 'react';
import {Form} from "react-bootstrap";
import {VehicleCategory} from "./model";
import _ from "lodash";

type Properties = {
    formCategory: VehicleCategory,
    onUpdate: (category: VehicleCategory) => void
}
const VehicleCategoryForm = ({formCategory, onUpdate}:Properties) => {

    const [category, setCategory] = useState<VehicleCategory>(formCategory);

    useEffect(() => {
        setCategory(formCategory);
    }, [formCategory]);

    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        updated.description = event.target.value;
        setCategory(updated);
        onUpdate(updated)
    }

    const handleSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        updated.size = Number(event.target.value);
        setCategory(updated);
        onUpdate(updated);
    }

    const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        updated.color = event.target.value;
        setCategory(updated);
        onUpdate(updated);
    }

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        let updated = _.cloneDeep(category);
        updated.name = event.target.value;
        setCategory(updated);
        onUpdate(updated);
    }

    return (
        <Form noValidate>
            <Form.Group className="mb-3" controlId="vehicleCategory.name">
                <Form.Label>Name</Form.Label>
                <Form.Control required value={category.name}
                              onChange={handleNameChange}
                              isInvalid={category.name.trim() === ""}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehicleCategory.name">
                <Form.Label>Color</Form.Label>
                <Form.Control required value={category.color} type={"color"}
                              onChange={handleColorChange}
                              isInvalid={category.color.trim() === ""}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehicleCategory.size">
                <Form.Label>Size</Form.Label>
                <Form.Control required type={"number"} value={category.size}
                              onChange={handleSizeChange}
                              isInvalid={category.size <= 0}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="vehicleCategory.description">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} value={category.description !== null ? category.description : ""}
                              onChange={handleDescriptionChange}/>
            </Form.Group>
        </Form>

    )
}

export default VehicleCategoryForm
