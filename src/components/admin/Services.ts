import {AxiosRequestConfig, AxiosResponse} from "axios";
import {ResultPage} from "./model/ResultPage";
import HttpService from "../../services/HttpService";
import {BaseItem} from "./model/BaseItem";

export abstract class Services<E, T extends BaseItem> {
    abstract getItems(currentPage: number | undefined,
                      pageSize: number | undefined,
                      searchText: string | undefined,
                      sortedBy: string | undefined,
                      sortedAscending: boolean): Promise<AxiosResponse<ResultPage<E>>>;

    getItem(id: number | undefined): Promise<AxiosResponse<T>> {
        console.log(`Getting ${this.getItemName()} - id: ` + id)
        return HttpService.getAxiosClient().get<T>(`${this.getBaseUrl()}/${id}`);
    }

    getAssociations(item: T): Promise<AxiosResponse<T>>[] {
        const promises: Promise<AxiosResponse<T>>[] = [];
        const config: AxiosRequestConfig<T> = {
            headers: {
                "Content-Type": "text/uri-list"
            }
        };
        // promises.push(HttpService.getAxiosClient().put<T>(url, newCategory._links?.self.href, config))
        throw new Error("Method not implemented.");
    }

    saveItem(item: T): Promise<AxiosResponse<T>> {
        console.log(`Saving ${this.getItemName()}`, item)
        const config: AxiosRequestConfig<T> = {
            headers: {
                "If-Match": item.currentVersion
            }
        };
        return HttpService.getAxiosClient().put<T>(`${this.getBaseUrl()}/${item.id}`, item, config);
    }

    deleteItem(item: T): Promise<AxiosResponse<T>> {
        console.log(`Deleting ${this.getItemName()} - id: ` + item.id);
        return HttpService.getAxiosClient().delete(`${this.getBaseUrl()}/${item.id}`);
    }

    addItem(item: T): Promise<AxiosResponse<T>> {
        console.log(`Adding ${this.getItemName()} - id: `, item);
        return HttpService.getAxiosClient().post<T>(`${this.getBaseUrl()}`, item);
    }

    _getPageArguments(currentPage: number | undefined, pageSize: number | undefined, sortedBy: string | undefined, sortedAscending: boolean) {
        const direction = sortedAscending ? "asc" : "desc";
        return `page=${currentPage ? currentPage : 0}&size=${pageSize ? pageSize : 5}&sort=${sortedBy},${direction}`;
    }

    abstract getBaseUrl(): string;

    abstract getItemName(): string;
}

