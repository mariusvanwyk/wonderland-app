import HttpService from "../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../model/base/ResultPage";
import {AbstractServices} from "./AbstractServices";
import {EmbeddedCustomerRoutes} from "../model/embedded/EmbeddedCustomerRoutes";
import {CustomerRoute} from "../model/CustomerRoute";

export class CustomerRoutesServices extends AbstractServices<EmbeddedCustomerRoutes, CustomerRoute> {
    getBaseUrl(): string {
        return "/api/v1/customerRoutes";
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedCustomerRoutes>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.debug("Filtering Customer Routes with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedCustomerRoutes>>(
                `${this.getBaseUrl()}?${pageArguments}`
            );
        } else {
            // TODO: Searching should be able to be done by Customer or Start/End Routes
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedCustomerRoutes>>(
                `${this.getBaseUrl()}/search/findByNameContaining?name=${searchText}&${pageArguments}`
            );
        }
    }

    getItemName(): string {
        return "Routes";
    }

}
