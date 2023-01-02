import {Button, Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent} from "react";
import {ObjectType} from "../model/BaseModelObject";
import {clearSearchItemsText, refreshItems, SelectionState, setSearchItemsText} from "../redux/SelectionSlice";
import {useAppDispatch} from "../redux/hooks";

type Properties = {
    objectType: ObjectType,
    state: SelectionState<any>
}
const SearchPanel = ({objectType, state}:Properties) => {
    const dispatch = useAppDispatch();

    const search = () => {
        dispatch(refreshItems({objectType: objectType}));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const clearSearch = () => {
        dispatch(clearSearchItemsText({objectType: objectType}));
        search();
    }

    return (
        <InputGroup className="mb-3" size={"sm"}>
            <Form.Control
                value={state.searchText}
                placeholder={"Search here..."}
                aria-label="Search Vehicle Categories input"
                aria-describedby="search-button"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    dispatch(setSearchItemsText(
                        {objectType: objectType, searchText: e.target.value}))}
            />
            <Button variant="outline-secondary" id="search-button"
                    onClick={() => search()}>
                <i className={"bi bi-search"}/>
            </Button>
            <Button variant="outline-secondary" id="search-button"
                    onClick={() => clearSearch()}>
                <i className={"bi bi-x"}/>
            </Button>
        </InputGroup>
    )
}

export default SearchPanel