import HttpService from "../../../services/HttpService";
import {AxiosRequestConfig, AxiosResponse} from "axios";
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

    getItem(id: number | undefined): Promise<AxiosResponse<Vehicle>> {
        console.log("Getting Vehicle  - id: " + id)
        return HttpService.getAxiosClient().get<Vehicle>(`/api/v1/vehicles/${id}`);
    }

    saveItem(item: Vehicle): Promise<AxiosResponse<Vehicle>> {
        const config: AxiosRequestConfig<Vehicle> = {
            headers: {
                "If-Match": item.currentVersion
            }
        };
        return HttpService.getAxiosClient().put<Vehicle>(`/api/v1/vehicles/${item.id}`, item, config);
    }


    deleteItem(id: number): Promise<AxiosResponse<Vehicle>> {
        return HttpService.getAxiosClient().delete(`/api/v1/vehicles/${id}`);
    }

    addItem(item: Vehicle): Promise<AxiosResponse<Vehicle>> {
        return HttpService.getAxiosClient().post<Vehicle>('/api/v1/vehicles', item);
    }

}
