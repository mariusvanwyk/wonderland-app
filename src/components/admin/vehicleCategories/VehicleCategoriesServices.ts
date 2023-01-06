import HttpService from "../../../services/HttpService";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/ResultPage";
import {Services} from "../Services";
import {EmbeddedVehicleCategories} from "../model/EmbeddedVehicleCategories";

export class VehicleCategoriesServices extends Services<EmbeddedVehicleCategories, VehicleCategory> {

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedVehicleCategories>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Vehicle Categories with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicleCategories>>(
                `/api/v1/vehicleCategories?${pageArguments}`
            );
        } else {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedVehicleCategories>>(
                `/api/v1/vehicleCategories/search/findByNameContaining?name=${searchText}&${pageArguments}`
            );
        }
    }

    _getPageArguments(currentPage: number | undefined, pageSize: number | undefined, sortedBy: string | undefined, sortedAscending: boolean) {
        const direction = sortedAscending ? "asc" : "desc";
        return `page=${currentPage ? currentPage : 0}&size=${pageSize ? pageSize : 5}&sort=${sortedBy},${direction}`;
    }

    getItem(id: number | undefined): Promise<AxiosResponse<VehicleCategory>> {
        console.log("getting Vehicle Category - id: " + id)
        return HttpService.getAxiosClient().get<VehicleCategory>(`/api/v1/vehicleCategories/${id}`);
    }

    saveItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const config: AxiosRequestConfig<VehicleCategory> = {
            headers: {
                "If-Match": item.currentVersion
            }
        };
        return HttpService.getAxiosClient().put<VehicleCategory>(`/api/v1/vehicleCategories/${item.id}`, item, config);
    }


    deleteItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        return HttpService.getAxiosClient().delete(`/api/v1/vehicleCategories/${item.id}`);
    }

    addItem(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        return HttpService.getAxiosClient().post<VehicleCategory>('/api/v1/vehicleCategories', item);
    }

    getAssociations(item: VehicleCategory): Promise<AxiosResponse<VehicleCategory>>[] {
        return [];
    }

}
