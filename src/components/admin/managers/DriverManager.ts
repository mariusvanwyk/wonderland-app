import {ItemManager, RequiredProperty, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {EmbeddedDrivers} from "../model/embedded/EmbeddedDrivers";
import {Driver} from "../model/Driver";

export class DriverManager extends ItemManager<EmbeddedDrivers, Driver> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", name: "name", label: "Name"},
            {type: "string", name: "disabled", label: "Disabled"},
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

    getRequiredProperties(): RequiredProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
        ];
    }

}
