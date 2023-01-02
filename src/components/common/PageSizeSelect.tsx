import {FormSelect} from "react-bootstrap";
import React, {ChangeEvent} from "react";
import {SelectionState, setItemsPageSize} from "../redux/SelectionSlice";
import {ObjectType} from "../model/BaseModelObject";
import {useAppDispatch} from "../redux/hooks";

type Properties = {
    objectType: ObjectType,
    state: SelectionState<any>
}
const PageSizeSelect = ({objectType, state}: Properties) => {
    const dispatch = useAppDispatch();

    const updateRecordsPerPage = (event: ChangeEvent<HTMLSelectElement>) => {
        const newPageSize = Number(event.target.value);
        dispatch(setItemsPageSize({objectType: objectType, pageSize: newPageSize}));
    }

    return (
        <div className={"d-flex justify-content-between mt-2 align-items-center"}>
            <div className={"text-muted small"}>
                {state.refreshTime && new Date(state.refreshTime).toLocaleTimeString()}
            </div>
            <div className={"d-flex justify-content-end align-items-center"}>
                <FormSelect aria-label="Default select example" size={"sm"} defaultValue={state.pageSize}
                            onChange={(event) => updateRecordsPerPage(event)}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                </FormSelect>
                <div className={"ms-2 text-nowrap"}>Records per Page</div>
            </div>
        </div>
    )
}

export default PageSizeSelect