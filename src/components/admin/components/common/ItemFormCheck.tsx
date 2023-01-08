import {Form,} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import _ from "lodash";
import {SelectionState, setItem} from "../../../redux/SelectionSlice";
import {ItemType} from "../../model/base/BaseItem";
import {useAppDispatch} from "../../../redux/hooks";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
    label: string,
    property: string,
    value: boolean,
    type?: "checkbox" | "radio",

}

const ItemFormCheck = ({itemType, state, label, property, value}: Properties) => {
    const dispatch = useAppDispatch();
    const [localValue, setLocalValue] = useState<boolean>(value);

    useEffect(() => {
        setLocalValue(value)
    }, [value]);
    const handleChange = (value: boolean) => {
        const updated = _.cloneDeep(state.selectedItem);
        updated[property] = value;
        setLocalValue(value);
        dispatch(setItem({itemType: itemType, item: updated}));
    }

    return (
        <Form.Group className="mb-3" controlId={property}>
            <Form.Label>{label}</Form.Label>
            <Form.Check
                checked={localValue}
                onChange={(event) => {
                    handleChange(event.target.checked)
                }}
                type={"checkbox"}
                label={state.selectedItem.disabled ? "Yes" : "No"}
            />
        </Form.Group>
    )
}

export default ItemFormCheck
