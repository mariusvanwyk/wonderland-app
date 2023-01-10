import {EditableProperty, ItemManager, SortProperty} from "./ItemManager";
import {VehicleCategory} from "../model/VehicleCategory";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import {EmbeddedVehicleCategories} from "../model/embedded/EmbeddedVehicleCategories";
import _ from "lodash";

export class VehicleCategoryManager extends ItemManager<EmbeddedVehicleCategories, VehicleCategory> {
    getSortProperties(): SortProperty[] {
        return [
            {type: "string", property: "name"},
            {type: "number", property: "size"}
        ];
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

    getEditableProperties(): EditableProperty[] {
        return [
            {type: "string", property: "name", label: "Name", required: true},
            {type: "color", property: "color", label: "Color", required: true},
            {type: "number", property: "size", label: "Size", required: false},
            {type: "text", property: "description", label: "Description", required: false},
            {type: "number", property: "roadTaxCost", label: "Road Tax", required: true},
            {type: "number", property: "insuranceCost", label: "Insurance", required: true},
            {type: "number", property: "trackerCost", label: "Tracker", required: true},
            {type: "number", property: "extraCost", label: "Extra", required: true},
            {type: "number", property: "tireRate", label: "Tire Rate", required: true},
            {type: "number", property: "serviceRate", label: "Service Rate", required: true},
            {type: "number", property: "overtimeRate", label: "Overtime Rate", required: true},
            {type: "number", property: "fuelConsumption", label: "Fuel Consumption", required: true},
        ];
    }

    getHeading(item: VehicleCategory): string {
        return item.name;
    }

}
