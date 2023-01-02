import HttpService from "../../../services/HttpService";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {VehicleCategory} from "../../model/VehicleCategory";
import {VehicleCategoriesPage} from "../../model/VehicleCategoriesPage";


export class VehicleCategoriesServices {
    getVehicleCategories(currentPage: number | undefined, pageSize: number | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<VehicleCategoriesPage>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Getting Vehicle Categories with page arguments", pageArguments)
        return HttpService.getAxiosClient().get<VehicleCategoriesPage>(
            `/api/v1/vehicleCategories?${pageArguments}`
        );
    }

    getVehicleCategoriesByName(currentPage: number | undefined, pageSize: number | undefined, name: string, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<VehicleCategoriesPage>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Vehicle Categories with name and page arguments", name, pageArguments)
        return HttpService.getAxiosClient().get<VehicleCategoriesPage>(
            `/api/v1/vehicleCategories/search/findByNameContaining?name=${name}&${pageArguments}`
        );
    }

    _getPageArguments(currentPage: number | undefined, pageSize: number | undefined, sortedBy: string | undefined, sortedAscending: boolean) {
        const direction = sortedAscending ? "asc" : "desc";
        return `page=${currentPage ? currentPage : 0}&size=${pageSize ? pageSize : 5}&sort=${sortedBy},${direction}`;
    }

    getVehicleCategory(id: number | undefined): Promise<AxiosResponse<VehicleCategory>> {
        console.log("getting Vehicle Category - id: " + id)
        return HttpService.getAxiosClient().get<VehicleCategory>(`/api/v1/vehicleCategories/${id}`);
    }

    saveVehicleCategory(category: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        const config: AxiosRequestConfig<VehicleCategory> = {
            headers: {
                "If-Match": category.currentVersion
            }
        };
        return HttpService.getAxiosClient().put<VehicleCategory>(`/api/v1/vehicleCategories/${category.id}`, category, config);
    }


    deleteVehicleCategory(id: number): Promise<AxiosResponse<VehicleCategory>> {
        return HttpService.getAxiosClient().delete(`/api/v1/vehicleCategories/${id}`);
    }

    addVehicleCategory(category: VehicleCategory): Promise<AxiosResponse<VehicleCategory>> {
        return HttpService.getAxiosClient().post<VehicleCategory>('/api/v1/vehicleCategories', category);
    }

}
