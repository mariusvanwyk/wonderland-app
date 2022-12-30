import HttpService from "../../../services/HttpService";
import {VehicleCategoriesPage} from "./model";
import {AxiosResponse} from "axios";

export interface CategoriesServices<T> {
    getVehicleCategories: (currentPage: number, size: number) => Promise<T>
}

export class VehicleCategoriesServices implements CategoriesServices<AxiosResponse<VehicleCategoriesPage>> {
    getVehicleCategories(currentPage: number, size: number): Promise<AxiosResponse<VehicleCategoriesPage>> {
        return HttpService.getAxiosClient().get(
            `/api/v1/vehicleCategories?page=${currentPage}&size=${size}&sort=id,asc`
        );
    }

}
