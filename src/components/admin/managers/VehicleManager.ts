import {EditableProperty, ItemManager, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import {EmbeddedVehicles} from "../model/embedded/EmbeddedVehicles";
import {Vehicle} from "../model/Vehicle";
import _ from "lodash";

export class VehicleManager extends ItemManager<EmbeddedVehicles, Vehicle> {

    getSortProperties(): SortProperty[] {
        return [{type: "string", property: "registrationNumber", label: "Registration Number"}];
    }

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
            id: undefined,
            categoryId: -1,
            instalment: 0,
            motDate: null,
            purchasedOn: null,
            registrationNumber: "",
            roadTaxDueDate: null,
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined,
        };
    }

    from(original: Vehicle): Vehicle {
        return _.cloneDeep(original);
    }

    getListColumn(item: Vehicle): string {
        return item.registrationNumber;
    }

    getHeading(item: Vehicle): string {
        return item.registrationNumber;
    }

    getEditableProperties(): EditableProperty[] {
        return [
            {type: "string", property: "registrationNumber", label: "Registration Number", required: true},
            {type: "text", property: "description", label: "Description", required: false},
            {type: "number", property: "categoryId", label: "Category", required: true, hidden: true},
            {type: "number", property: "fuelConsumption", label: "Fuel Consumption", required: true},
            {type: "date", property: "purchasedOn", label: "Purchased On", required: true},
            {type: "date", property: "roadTaxDueDate", label: "Road Tax Due Date", required: true},
            {type: "date", property: "motDate", label: "MOT Due Date", required: true},
            {type: "number", property: "instalment", label: "Instalment", required: true},
        ];
    }

}
