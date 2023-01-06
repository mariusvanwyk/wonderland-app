import {Button, Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, useEffect, useState} from "react";
import _ from "lodash";
import {SelectionState, setItem} from "../../redux/SelectionSlice";
import {ItemType} from "../model/BaseItem";
import {useAppDispatch} from "../../redux/hooks";
import {getDateAsString} from "../../common/DateUtils";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>,
    label: string,
    property: string,
    value: string,
    required: boolean,
    as?: "input" | "textarea",
    type?: "string" | "number" | "date" | "color",
    hideClear? : boolean

}

const ItemFormControl = ({itemType, state, label, property, value, required, as, type, hideClear}: Properties) => {
    const dispatch = useAppDispatch();
    const [localValue, setLocalValue] = useState<any>("");

    useEffect(() => {
        switch (type) {
            case "number": {
                setLocalValue(value ? Number(value) : "")
                break;
            }
            case "date": {
                if (value) {
                    const date: Date = new Date(value);
                    setLocalValue(value ? getDateAsString(date) : "")
                } else {
                    setLocalValue("");
                }
                break;
            }
            case "string":
            default : {
                setLocalValue(value ? value : "")
                break;
            }
        }

    }, [value]);
    const handleChange = (value: string) => {
        let updated = _.cloneDeep(state.selectedItem);
        switch (type) {
            case "number": {
                updated[property] = Number(value);
                break;
            }
            case "date": {
                const date: Date = new Date(value);
                updated[property] =  getDateAsString(date);
                break;
            }
            default: {
                updated[property] = value;
            }
        }
        setLocalValue(value);
        dispatch(setItem({itemType: itemType, item: updated}));
    }

    const clearValue = () => {
        let updated = _.cloneDeep(state.selectedItem);
        updated[property] = null;
        setLocalValue("");
        dispatch(setItem({itemType: itemType, item: updated}));
    }

    const isInvalid = () => {
        if (required) {
            if (type === "number") {
                return value === null || Number(value) <= 0
            } else {
                return value === null || value === undefined || value.trim() === "";
            }
        } else {
            return false;
        }
    }

    return (
        <Form.Group className="mb-3" controlId={property}>
            <Form.Label>{label}</Form.Label>
            <InputGroup>
                <Form.Control as={as ? as : "input"}
                              type={type ? type : "string"}
                              required={required}
                              value={localValue}
                              onChange={(event: ChangeEvent<HTMLInputElement>) => handleChange(event.target.value)}
                              isInvalid={isInvalid()}/>
                {!hideClear && <Button variant="outline-secondary" onClick={() => clearValue()}><i className={"bi bi-x"}/></Button>}
            </InputGroup>
        </Form.Group>
    )
}

export default ItemFormControl
