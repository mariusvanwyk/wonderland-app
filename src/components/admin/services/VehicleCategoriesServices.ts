import HttpService from "../../../services/HttpService";
import {AxiosResponse} from "axios";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/base/ResultPage";
import {EmbeddedVehicleCategories} from "../model/embedded/EmbeddedVehicleCategories";
import {AbstractServices} from "./AbstractServices";

export class VehicleCategoriesServices extends AbstractServices<EmbeddedVehicleCategories, VehicleCategory> {

    private static instance: VehicleCategoriesServices;

    public static getInstance(): VehicleCategoriesServices {
        if (!VehicleCategoriesServices.instance) {
            VehicleCategoriesServices.instance = new VehicleCategoriesServices();
        }
        return VehicleCategoriesServices.instance;
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText?: string | undefined, sortedBy?: string | undefined, sortedAscending?: boolean): Promise<AxiosResponse<ResultPage<EmbeddedVehicleCategories>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.debug("Filtering Vehicle Categories with name and page arguments", searchText, pageArguments)
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
