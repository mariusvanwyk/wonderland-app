import HttpService from "../../../services/HttpService";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import {VehicleCategory} from "../../model/VehicleCategory";
import {VehicleCategoriesPage} from "../../model/VehicleCategoriesPage";

export interface CategoriesServices {
    getVehicleCategories: (currentPage: number, size: number) => Promise<AxiosResponse<VehicleCategoriesPage>>;
    getVehicleCategoriesByName: (currentPage: number, size: number, name: string) => Promise<AxiosResponse<VehicleCategoriesPage>>;
    saveVehicleCategory: (category: VehicleCategory) => Promise<AxiosResponse<VehicleCategory>>;
    getVehicleCategory: (id: number) => Promise<AxiosResponse<VehicleCategory>>;
    deleteVehicleCategory: (id: number) => Promise<AxiosResponse<VehicleCategory>>;
    addVehicleCategory: (category: VehicleCategory) => Promise<AxiosResponse<VehicleCategory>>;
}

export class VehicleCategoriesServices implements CategoriesServices {
    getVehicleCategories(currentPage: number, size: number): Promise<AxiosResponse<VehicleCategoriesPage>> {
        console.log("Getting Vehicle Categories - current page: " + currentPage + ", size: " + size)
        return HttpService.getAxiosClient().get<VehicleCategoriesPage>(
            `/api/v1/vehicleCategories?page=${currentPage}&size=${size}&sort=id,asc`
        );
    }

    getVehicleCategoriesByName(currentPage: number, size: number, name: string): Promise<AxiosResponse<VehicleCategoriesPage>> {
        console.log("getting Vehicle Categories by name - current page: "
            + currentPage + ", size: " + size + ", name: '" + name + "'")
        return HttpService.getAxiosClient().get<VehicleCategoriesPage>(
            `/api/v1/vehicleCategories/search/findByNameContaining?name=${name}&page=${currentPage}&size=${size}&sort=id,asc`
        );
    }

    getVehicleCategory(id: number): Promise<AxiosResponse<VehicleCategory>> {
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
