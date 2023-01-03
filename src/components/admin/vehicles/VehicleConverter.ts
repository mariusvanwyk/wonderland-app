import {Converter} from "../Converter";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {EmbeddedVehicleCategories} from "../model/EmbeddedVehicleCategories";
import {EmbeddedVehicles} from "../model/EmbeddedVehicles";
import {Vehicle} from "../model/Vehicle";
import _ from "lodash";

export class VehicleConverter implements Converter<EmbeddedVehicles, Vehicle> {
    convert(resultPage: ResultPage<EmbeddedVehicles>): ListPage<Vehicle> {
        return {
            items: resultPage._embedded.vehicles,
            page: resultPage.page
        };
    }

    newItem(): Vehicle {
        return {
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: "",
            disabled: false,
            fuelConsumption: 0,
            id: 0,
            instalment: 0,
            motDate: null,
            purchasedOn: null,
            registrationNumber: "",
            roadTaxDueDate: null,
            updatedAt: "",
            updatedBy: ""
        };
    }

    from(original: Vehicle): Vehicle {
        return _.cloneDeep(original);
    }

    validate(item: Vehicle): string[] {
        return [];
    }

    getListColumn(item: Vehicle): string {
        return item.registrationNumber;
    }

    getListExtraColumn(item: Vehicle): string {
        return "";
    }

}