import React, {useEffect, useState} from 'react';
import {Button, ButtonGroup} from "react-bootstrap";
import {Page, VehicleCategory} from "../admin/vehicleCategories/model";

type Properties = {
    page: Page,
    initialPage: number,
    onPaging: (pageNumber: number) => void,
    fetching: boolean,
}

const Paging = ({page, initialPage, onPaging, fetching}: Properties) => {

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [busy, setBusy] = useState<boolean>(fetching);

    useEffect(() => {
        setBusy(fetching);
    }, [fetching]);

    const gotoFirstPage = () => {
        setBusy(true);
        setCurrentPage(0);
        onPaging(0);
    }

    const gotoPreviousPage = () => {
        setBusy(true);
        const newPageNumber = currentPage - 1;
        setCurrentPage(newPageNumber)
        onPaging(newPageNumber);
    }

    const gotoNextPage = () => {
        setBusy(true);
        const newPageNumber = currentPage + 1;
        setCurrentPage(newPageNumber);
        onPaging(newPageNumber);
    }

    const gotoLastPage = () => {
        setBusy(true);
        const newPageNumber = page.totalPages - 1;
        setCurrentPage(newPageNumber);
        onPaging(newPageNumber);
    }

    const canNavigateBack = () => {
        return page.totalPages > 0 && page.number !== 0
    }

    const canNavigateForward = () => {
        return page.totalPages > 0 && page.number < page.totalPages - 1;
    }

    return (

        <ButtonGroup aria-label="Paging Buttons" size={"sm"} className={page.totalPages > 1 ? "visible" : "invisible"}>
            <Button disabled={busy || !canNavigateBack()}
                    onClick={() => gotoFirstPage()}
                    title={"Go to First Page"}>
                <i className="bi bi-chevron-double-left"></i>
            </Button>
            <Button disabled={busy || !canNavigateBack()}
                    onClick={() => gotoPreviousPage()}
                    title={"Go to Previous Page"}>
                <i className="bi bi-chevron-left"></i>
            </Button>
            <Button disabled={busy || !canNavigateForward()}
                    onClick={() => gotoNextPage()}
                    title={"Go to Next Page"}>
                <i className="bi bi-chevron-right"></i>
            </Button>
            <Button disabled={busy || !canNavigateForward()}
                    onClick={() => gotoLastPage()}
                    title={"Go to Last Page"}>
                <i className="bi bi-chevron-double-right"></i>
            </Button>
        </ButtonGroup>
    )
}

export default Paging
