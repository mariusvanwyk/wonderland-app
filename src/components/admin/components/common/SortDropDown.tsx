import {Dropdown} from "react-bootstrap";
import {AdminState, setSortItemsBy} from "../../features/AdminSlice";
import React from "react";
import {useAppDispatch} from "../../../redux/hooks";
import {ItemType} from "../../model/base/BaseItem";
import {SortProperty} from "../../managers/ItemManager";

type Properties = {
    itemType: ItemType,
    state: AdminState<any>,
    sortProperties: SortProperty[],
}


const SortDropDown = ({itemType, state, sortProperties}: Properties) => {

    const dispatch = useAppDispatch();

    return (
        <Dropdown>
            <Dropdown.Toggle id="dropdown-basic" variant={"outline-secondary"} size={"sm"}>
                {state.sortedBy && (state.sortedAscending ?
                    <i className={"bi bi-sort-down"}/> :
                    <i className={"bi bi-sort-up"}/>)}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {sortProperties.map((sort, index) => {
                    return (
                        <Dropdown.Item key={index} className={"d-flex justify-content-between"}
                                       onClick={() => dispatch(setSortItemsBy({
                                           itemType: itemType,
                                           sortBy: sort.property
                                       }))}>
                            <div className={"d-flex"}>
                                <i className={"bi bi-check " + (state.sortedBy === sort.property ? "visible" : "invisible")}/>
                                <div className={"ms-1"}>By {sort.label ? sort.label : sort.property}</div>
                            </div>

                            {state.sortedBy === sort.property ? (state.sortedAscending ?
                                <i className={"bi bi-arrow-down"}/> :
                                <i className={"bi bi-arrow-up"}/>) : <div>&nbsp;</div>}
                        </Dropdown.Item>
                    )
                })}
            </Dropdown.Menu>
        </Dropdown>
    )
}

export default SortDropDown
