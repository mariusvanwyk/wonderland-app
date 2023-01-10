import {EditableProperty, ItemManager, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {EmbeddedDrivers} from "../model/embedded/EmbeddedDrivers";
import {Driver} from "../model/Driver";

export class DriverManager extends ItemManager<EmbeddedDrivers, Driver> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
            {type: "string", property: "disabled", label: "Disabled"},
        ];
    }

    convert(resultPage: ResultPage<EmbeddedDrivers>): ListPage<Driver> {
        return {
            items: resultPage._embedded.drivers,
            page: resultPage.page
        };
    }

    newItem(): Driver {
        return {
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: "",
            id: undefined,
            name: "",
            disabled: false,
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined,
        };
    }

    from(original: Driver): Driver {
        return _.cloneDeep(original);
    }

    getListColumn(item: Driver): string {
        return item.name + (item.disabled ? " (Disabled)" : "");
    }

    getHeading(item: Driver): string {
        return item.name;
    }

    getEditableProperties(): EditableProperty[] {
        return [
            {type: "string", property: "name", label: "Name", required: true},
            {type: "boolean", property: "disabled", label: "Disabled", required: true},
            {type: "text", property: "description", label: "Description", required: false},
            {type: "string", property: "idNumber", label: "Id Number", required: true},
            {type: "string", property: "licenceNumber", label: "Licence Number", required: true},
            {type: "string", property: "phoneNumber", label: "Phone Number", required: true},
            {type: "number", property: "salary", label: "Salary", required: true},
            {type: "date", property: "licenceExpiryDate", label: "Licence Expiry Date", required: true},
        ];
    }

}
