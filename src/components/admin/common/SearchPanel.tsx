import {Button, Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, useState} from "react";
import {ItemType} from "../model/BaseItem";
import {clearSearchItemsText, refreshItems, SelectionState, setSearchItemsText} from "../../redux/SelectionSlice";
import {useAppDispatch} from "../../redux/hooks";

type Properties = {
    itemType: ItemType,
    state: SelectionState<any>
}
const SearchPanel = ({itemType, state}: Properties) => {
    const dispatch = useAppDispatch();
    const [searchText, setSearchText] = useState<string>(state.searchText);

    const search = () => {
        dispatch(setSearchItemsText({itemType: itemType, searchText: searchText}))
        dispatch(refreshItems({itemType: itemType}));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const clearSearch = () => {
        setSearchText("");
        dispatch(clearSearchItemsText({itemType: itemType}));
        dispatch(refreshItems({itemType: itemType}));
    }

    return (
        <InputGroup className="mb-3" size={"sm"}>
            <Form.Control
                value={searchText}
                placeholder={"Search here..."}
                aria-label="Search Vehicle Categories input"
                aria-describedby="search-button"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setSearchText(e.target.value)}
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
