import React, {useEffect, useState} from 'react';
import {Page} from "../model/Page";

type Properties = {
    page: Page,
    recordCount: number,
    initialPage: number,
    onPaging: (pageNumber: number) => void,
    fetching: boolean,
}

const Paging = ({page, recordCount, initialPage, onPaging, fetching}: Properties) => {

    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [busy, setBusy] = useState<boolean>(fetching);

    useEffect(() => {
        setCurrentPage(initialPage);
    }, [initialPage]);

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

    const getElementsLabel = () => {
        // return recordCount + " / " + page.totalPages + " / " + page.totalElements + " / " + page.number + " / " + page.size
        if (page.totalPages > 1) {
            // First Page
            if (page.number === 0) {
                return "1 to " + page.size + " of " + page.totalElements + " records"
            }
            if (page.number + 1 === page.totalPages) {
                return ((page.number * page.size) + 1) +
                    " to " + ((page.number * page.size) + recordCount) +
                    " of " + page.totalElements + " records";
            }
            return ((page.number * page.size) + 1) +
                " to " + ((page.number * page.size) + page.size) +
                " of " + page.totalElements + " records"
        } else {
            if (page.totalElements === 0) {
                return "No records"
            } else {
                return recordCount + (page.totalElements > 1 ? " records" : " record")
            }
        }
    }

    return (
        <> {recordCount > 0 &&
            <div className={"d-flex align-items-center"}>
                <div className={"me-2"}>
                    {getElementsLabel()}
                </div>
                <nav aria-label={"pagination"}>
                    <ul className={"pagination pagination-sm mb-0"}>
                        <PageItem disabled={busy || !canNavigateBack()}
                                  iconClass={"bi-chevron-double-left"}
                                  onClick={() => gotoFirstPage()}
                                  title={"Go to First Page"}/>

                        <PageItem disabled={busy || !canNavigateBack()}
                                  iconClass={"bi-chevron-left"}
                                  onClick={() => gotoPreviousPage()}
                                  title={"Go to Previous Page"}/>

                        <PageItem disabled={busy || !canNavigateForward()}
                                  iconClass={"bi-chevron-right"}
                                  onClick={() => gotoNextPage()}
                                  title={"Go to Next Page"}/>

                        <PageItem disabled={busy || !canNavigateForward()}
                                  iconClass={"bi-chevron-double-right"}
                                  onClick={() => gotoLastPage()}
                                  title={"Go to Last Page"}/>
                    </ul>
                </nav>
            </div>
        }
        </>
    )
}


type PageItemProperties = {
    disabled: boolean
    onClick: () => void
    iconClass: string
    title: string
}
const PageItem = ({disabled, onClick, iconClass, title}: PageItemProperties) => {
    return (
        <li className={"page-item" + (disabled ? " disabled" : "")}>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a className={"page-link"} href="#" tabIndex={disabled ? -1 : 0}
               onClick={() => onClick()} title={title}>
                <i className={"bi " + iconClass}></i>
            </a>
        </li>
    )
}

export default Paging
