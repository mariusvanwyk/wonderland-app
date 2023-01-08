import {ItemManager, RequiredProperty, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/ResultPage";
import {ListPage} from "../model/ListPage";
import {EmbeddedVehicles} from "../model/embedded/EmbeddedVehicles";
import {Vehicle} from "../model/Vehicle";
import _ from "lodash";

export class VehicleManager extends ItemManager<EmbeddedVehicles, Vehicle> {

    getSortProperties(): SortProperty[] {
        return [{type: "string", name: "registrationNumber", label: "Registration Number"}];
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

    getRequiredProperties(): RequiredProperty[] {
        return [
            {type: "string", property: "registrationNumber", label: "Registration Number"},
            {type: "number", property: "categoryId", label: "Category"},
            {type: "number", property: "fuelConsumption", label: "Fuel Consumption"},
            {type: "date", property: "purchasedOn", label: "Purchased On"},
            {type: "date", property: "roadTaxDueDate", label: "Road Tax Due Date"},
            {type: "date", property: "motDate", label: "MOT Due Date"},
            {type: "number", property: "instalment", label: "Instalment"},
        ];
    }

}
