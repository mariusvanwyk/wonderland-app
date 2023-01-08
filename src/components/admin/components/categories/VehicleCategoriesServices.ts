import HttpService from "../../../../services/HttpService";
import {AxiosResponse} from "axios";
import {VehicleCategory} from "../../model/VehicleCategory";
import {ResultPage} from "../../model/ResultPage";
import {Services} from "../../Services";
import {EmbeddedVehicleCategories} from "../../model/embedded/EmbeddedVehicleCategories";

export class VehicleCategoriesServices extends Services<EmbeddedVehicleCategories, VehicleCategory> {

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedVehicleCategories>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Vehicle Categories with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicleCategories>>(
                `${this.getBaseUrl()}?${pageArguments}`
            );
        } else {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicleCategories>>(
                `${this.getBaseUrl()}/search/findByNameContaining?name=${searchText}&${pageArguments}`
            );
        }
    }

    getBaseUrl(): string {
        return "/api/v1/vehicleCategories";
    }

    getItemName(): string {
        return "Vehicle Category";
    }

}
