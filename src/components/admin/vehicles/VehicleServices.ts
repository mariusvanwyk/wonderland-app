import HttpService from "../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../model/ResultPage";
import {Services} from "../Services";
import {EmbeddedVehicles} from "../model/EmbeddedVehicles";
import {Vehicle} from "../model/Vehicle";

export class VehicleServices extends Services<EmbeddedVehicles, Vehicle> {

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedVehicles>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Vehicles with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicles>>(
                `/api/v1/vehicles?${pageArguments}`
            );
        } else {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicles>>(
                `/api/v1/vehicles/search/findByRegistrationNumberContaining?registrationNumber=${searchText}&${pageArguments}`
            );
        }
    }

    getBaseUrl(): string {
        return "/api/v1/vehicles";
    }

    getItemName(): string {
        return "Vehicle";
    }

}
