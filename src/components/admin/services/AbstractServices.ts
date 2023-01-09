import {AxiosRequestConfig, AxiosResponse} from "axios";
import {ResultPage} from "../model/base/ResultPage";
import HttpService from "../../../services/HttpService";
import {BaseItem} from "../model/base/BaseItem";
import {Services} from "./Services";

export abstract class AbstractServices<E, T extends BaseItem> implements Services<E, T> {
    abstract getItems(currentPage: number | undefined,
                      pageSize: number | undefined,
                      searchText: string | undefined,
                      sortedBy: string | undefined,
                      sortedAscending: boolean): Promise<AxiosResponse<ResultPage<E>>>;

    abstract getBaseUrl(): string;

    abstract getItemName(): string;

    getItem(id: number | undefined): Promise<AxiosResponse<T>> {
        console.debug(`Getting ${this.getItemName()} - id: ` + id)
        return HttpService.getAxiosClient().get<T>(`${this.getBaseUrl()}/${id}`);
    }

    saveItem(item: T): Promise<AxiosResponse<T>> {
        console.debug(`Saving ${this.getItemName()}`, item)
        const config: AxiosRequestConfig<T> = {
            headers: {
                "If-Match": item.currentVersion
            }
        };
        return HttpService.getAxiosClient().put<T>(`${this.getBaseUrl()}/${item.id}`, item, config);
    }

    deleteItem(item: T): Promise<AxiosResponse<T>> {
        console.debug(`Deleting ${this.getItemName()} - id: ` + item.id);
        return HttpService.getAxiosClient().delete(`${this.getBaseUrl()}/${item.id}`);
    }

    addItem(item: T): Promise<AxiosResponse<T>> {
        console.debug(`Adding ${this.getItemName()} - id: `, item);
        return HttpService.getAxiosClient().post<T>(`${this.getBaseUrl()}`, item);
    }

    protected _getPageArguments(currentPage: number | undefined, pageSize: number | undefined, sortedBy?: string | undefined, sortedAscending?: boolean) {
        const direction = sortedAscending ? "asc" : "desc";
        return `page=${currentPage ? currentPage : 0}&size=${pageSize ? pageSize : 5}` + (sortedBy ? `&sort=${sortedBy},${direction}` : ``);
    }

    // getAssociations(item: T): Promise<AxiosResponse<T>>[] {
    //     const promises: Promise<AxiosResponse<T>>[] = [];
    //     const config: AxiosRequestConfig<T> = {
    //         headers: {
    //             "Content-Type": "text/uri-list"
    //         }
    //     };
    //     // promises.push(HttpService.getAxiosClient().put<T>(url, newCategory._links?.self.href, config))
    //     throw new Error("Method not implemented.");
    // }
}

