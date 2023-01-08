import {AxiosResponse} from "axios";
import {ResultPage} from "../model/base/ResultPage";
import {BaseItem} from "../model/base/BaseItem";

export interface Services<E, T extends BaseItem> {
    getItems(currentPage: number | undefined,
                      pageSize: number | undefined,
                      searchText: string | undefined,
                      sortedBy: string | undefined,
                      sortedAscending: boolean): Promise<AxiosResponse<ResultPage<E>>>;

    getItem(id: number | undefined): Promise<AxiosResponse<T>>;

    saveItem(item: T): Promise<AxiosResponse<T>>;

    deleteItem(item: T): Promise<AxiosResponse<T>>;

    addItem(item: T): Promise<AxiosResponse<T>>;
}

