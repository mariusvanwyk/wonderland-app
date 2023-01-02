import {AxiosResponse} from "axios/index";
import {ResultPage} from "./model/ResultPage";
import {ListPage} from "./model/ListPage";

export interface Services<E, T> {
    getItems(currentPage: number | undefined,
             pageSize: number | undefined,
             searchText: string | undefined,
             sortedBy: string | undefined,
             sortedAscending: boolean): Promise<AxiosResponse<ResultPage<E>>>;

    getItem(id: number | undefined): Promise<AxiosResponse<T>>;

    saveItem(item: T): Promise<AxiosResponse<T>>;

    deleteItem(id: number): Promise<AxiosResponse<T>>;

    addItem(item: T): Promise<AxiosResponse<T>>
}

