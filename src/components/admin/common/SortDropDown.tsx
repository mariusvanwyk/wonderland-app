import {Dropdown} from "react-bootstrap";
import {SelectionState, setSortItemsBy} from "../../redux/SelectionSlice";
import React from "react";
import {useAppDispatch} from "../../redux/hooks";
import {ItemType} from "../model/BaseItem";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>
}
const SortDropDown = ({itemType, state}:Properties) => {
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
                                   itemType: itemType,
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
                                   itemType: itemType,
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