import HttpService from "../../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../../model/ResultPage";
import {Services} from "../../Services";
import {EmbeddedCustomers} from "../../model/embedded/EmbeddedCustomers";
import {Customer} from "../../model/Customer";

export class CustomerServices extends Services<EmbeddedCustomers, Customer> {
    getBaseUrl(): string {
        return "/api/v1/customers";
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedCustomers>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Customers with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedCustomers>>(
                `${this.getBaseUrl()}?${pageArguments}`
            );
        } else {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedCustomers>>(
                `${this.getBaseUrl()}/search/findByNameContaining?name=${searchText}&${pageArguments}`
            );
        }
    }

    getItemName(): string {
        return "Customer";
    }

}
