import {Button, Form, InputGroup} from "react-bootstrap";
import React, {ChangeEvent, memo, useEffect, useState} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {clearSearchItemsText, refreshItems, setSearchItemsText} from "../../../redux/SelectionSlice";
import {useAppDispatch} from "../../../redux/hooks";

type Properties = {
    itemType: ItemType,
    searchText: string,
}

const SearchPanel = memo(function SearchPanel({ itemType, searchText }: Properties) {
    const dispatch = useAppDispatch();
    const [text, setText] = useState<string>(searchText);

    useEffect(()=>{
        setText(searchText);
    }, [searchText])

    const search = () => {
        dispatch(setSearchItemsText({itemType: itemType, searchText: text}))
        dispatch(refreshItems({itemType: itemType}));
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter') {
            search();
        }
    }

    const clearSearch = () => {
        setText("");
        dispatch(clearSearchItemsText({itemType: itemType}));
        dispatch(refreshItems({itemType: itemType}));
    }
    return ((
        <InputGroup className="mb-3" size={"sm"}>
            <Form.Control
                value={text}
                placeholder={"Search here..."}
                aria-label="Search Vehicle Categories input"
                aria-describedby="search-button"
                onKeyDown={(e) => handleKeyDown(e)}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
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
    ))
});
// const SearchPanelOld = ({itemType, searchText}: Properties) => {
//     const dispatch = useAppDispatch();
//     const [text, setText] = useState<string>(searchText);
//
//     useEffect(()=>{
//         setText(searchText);
//     }, [searchText])
//
//     const search = () => {
//         dispatch(setSearchItemsText({itemType: itemType, searchText: text}))
//         dispatch(refreshItems({itemType: itemType}));
//     }
//
//     const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
//         if (event.key === 'Enter') {
//             search();
//         }
//     }
//
//     const clearSearch = () => {
//         setText("");
//         dispatch(clearSearchItemsText({itemType: itemType}));
//         dispatch(refreshItems({itemType: itemType}));
//     }
//
//     return (
//         <InputGroup className="mb-3" size={"sm"}>
//             <Form.Control
//                 value={text}
//                 placeholder={"Search here..."}
//                 aria-label="Search Vehicle Categories input"
//                 aria-describedby="search-button"
//                 onKeyDown={(e) => handleKeyDown(e)}
//                 onChange={(e: ChangeEvent<HTMLInputElement>) => setText(e.target.value)}
//             />
//             <Button variant="outline-secondary" id="search-button"
//                     onClick={() => search()}>
//                 <i className={"bi bi-search"}/>
//             </Button>
//             <Button variant="outline-secondary" id="search-button"
//                     onClick={() => clearSearch()}>
//                 <i className={"bi bi-x"}/>
//             </Button>
//         </InputGroup>
//     )
// }

export default SearchPanel
