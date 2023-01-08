import HttpService from "../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../model/base/ResultPage";
import {Services} from "./Services";
import {EmbeddedVehicles} from "../model/embedded/EmbeddedVehicles";
import {Vehicle} from "../model/Vehicle";
import {AbstractServices} from "./AbstractServices";

export class VehicleServices extends AbstractServices<EmbeddedVehicles, Vehicle> {

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedVehicles>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.debug("Filtering Vehicles with name and page arguments", searchText, pageArguments)
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
