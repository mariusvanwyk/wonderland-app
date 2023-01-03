import {AxiosResponse} from "axios";
import {ResultPage} from "./model/ResultPage";

export abstract class Services<E, T> {
    abstract getItems(currentPage: number | undefined,
                      pageSize: number | undefined,
                      searchText: string | undefined,
                      sortedBy: string | undefined,
                      sortedAscending: boolean): Promise<AxiosResponse<ResultPage<E>>>;

    abstract getItem(id: number | undefined): Promise<AxiosResponse<T>>;

    abstract saveItem(item: T): Promise<AxiosResponse<T>>;

    abstract deleteItem(id: number): Promise<AxiosResponse<T>>;

    abstract addItem(item: T): Promise<AxiosResponse<T>>;

    _getPageArguments(currentPage: number | undefined, pageSize: number | undefined, sortedBy: string | undefined, sortedAscending: boolean) {
        const direction = sortedAscending ? "asc" : "desc";
        return `page=${currentPage ? currentPage : 0}&size=${pageSize ? pageSize : 5}&sort=${sortedBy},${direction}`;
    }
}

