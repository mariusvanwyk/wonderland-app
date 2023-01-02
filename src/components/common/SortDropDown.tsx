import {Dropdown} from "react-bootstrap";
import {SelectionAction, SelectionState, setSortItemsBy} from "../redux/SelectionSlice";
import React from "react";
import {useAppDispatch} from "../redux/hooks";
import {ObjectType} from "../model/BaseModelObject";

type Properties = {
    objectType: ObjectType,
    state: SelectionState<any>
}
const SortDropDown = ({objectType, state}:Properties) => {
    const dispatch = useAppDispatch();

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant={"outline-secondary"} size={"sm"}>
                {state.sortedBy === "name" && (state.sortedAscending ?
                    <i className={"bi bi-sort-alpha-down"}/> :
                    <i className={"bi bi-sort-alpha-up"}/>)}
                {state.sortedBy === "size" && (state.sortedAscending ?
                    <i className={"bi bi-sort-numeric-down"}/> :
                    <i className={"bi bi-sort-numeric-up"}/>)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item className={"d-flex justify-content-between"}
                               onClick={() => dispatch(setSortItemsBy({
                                   objectType: objectType,
                                   sortBy: "name"
                               }))}>
                    {state.sortedBy === "name" ? <i className={"bi bi-check"}/> : <div>&nbsp;</div>}
                    <div>By Name</div>
                    {state.sortedBy === "name" ? (state.sortedAscending ?
                        <i className={"bi bi-arrow-down"}/> :
                        <i className={"bi bi-arrow-up"}/>) : <div>&nbsp;</div>}
                </Dropdown.Item>
                <Dropdown.Item className={"d-flex justify-content-between"}
                               onClick={() => dispatch(setSortItemsBy({
                                   objectType: objectType,
                                   sortBy: "size"
                               }))}>
                    {state.sortedBy === "size" ? <i className={"bi bi-check"}/> : <div>&nbsp;</div>}
                    <div>By Size</div>
                    {state.sortedBy === "size" ? (state.sortedAscending ?
                        <i className={"bi bi-arrow-down"}/> :
                        <i className={"bi bi-arrow-up"}/>) : <div>&nbsp;</div>}
                </Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortDropDown