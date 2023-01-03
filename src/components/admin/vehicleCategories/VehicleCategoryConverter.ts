import {Converter} from "../Converter";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {EmbeddedVehicleCategories} from "../model/EmbeddedVehicleCategories";
import _ from "lodash";

export class VehicleCategoryConverter implements Converter<EmbeddedVehicleCategories, VehicleCategory> {
    convert(resultPage: ResultPage<EmbeddedVehicleCategories>): ListPage<VehicleCategory> {
        return {
            items: resultPage._embedded.vehicleCategories,
            page: resultPage.page
        };
    }

    newItem(): VehicleCategory {
        return {
            color: "#ffffff",
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: "",
            enabled: false,
            extraCost: 0,
            fuelConsumption: 0,
            id: 0,
            insuranceCost: 0,
            name: "",
            overtimeRate: 0,
            roadTaxCost: 0,
            serviceRate: 0,
            size: 0,
            tireRate: 0,
            trackerCost: 0,
            updatedAt: "",
            updatedBy: ""
        };
    }

    from(original: VehicleCategory): VehicleCategory {
        return _.cloneDeep(original);
    }

    validate(item: VehicleCategory): string[] {
        let errors: string[] = [];
        if (item.name === undefined || item.name.trim() === "") {
            errors = [...errors, "Name is required"];
        }
        if (item.color === undefined || item.color.trim() === "") {
            errors = [...errors, "Color is required"];
        }
        if (item.size === undefined || item.size <= 0) {
            errors = [...errors, "Size must be greater than 0"];
        }
        return errors;
    }

    getListColumn(item: VehicleCategory): string {
        return item.name;
    }

    getListExtraColumn(item: VehicleCategory): string {
        return "(" + item.size + " ton)";
    }

}