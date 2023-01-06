import {ItemManager, RequiredProperty, SortProperty} from "./ItemManager";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {EmbeddedVehicleCategories} from "../model/EmbeddedVehicleCategories";
import _ from "lodash";

export class VehicleCategoryManager extends ItemManager<EmbeddedVehicleCategories, VehicleCategory> {
    getSortProperties(): SortProperty[] {
        return [{type: "string", name: "name"}, {type: "number", name: "size"}];
    }

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
            id: undefined,
            insuranceCost: 0,
            name: "",
            overtimeRate: 0,
            roadTaxCost: 0,
            serviceRate: 0,
            size: 0,
            tireRate: 0,
            trackerCost: 0,
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined
        };
    }

    from(original: VehicleCategory): VehicleCategory {
        return _.cloneDeep(original);
    }

    getListColumn(item: VehicleCategory): string {
        return item.name;
    }

    getListExtraColumn(item: VehicleCategory): string {
        return "(" + item.size + " ton)";
    }

    getRequiredProperties(): RequiredProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
            {type: "string", property: "color", label: "Color"},
            {type: "number", property: "size", label: "Size"},
            {type: "number", property: "roadTaxCost", label: "Road Tax"},
            {type: "number", property: "insuranceCost", label: "Insurance"},
            {type: "number", property: "trackerCost", label: "Tracker"},
            {type: "number", property: "extraCost", label: "Extra"},
            {type: "number", property: "tireRate", label: "Tire Rate"},
            {type: "number", property: "serviceRate", label: "Service Rate"},
            {type: "number", property: "overtimeRate", label: "Overtime Rate"},
            {type: "number", property: "fuelConsumption", label: "Fuel Consumption"},
        ];
    }

    getHeading(item: VehicleCategory): string {
        return item.name;
    }

}
