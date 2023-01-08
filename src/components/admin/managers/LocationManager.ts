import {ItemManager, RequiredProperty, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {EmbeddedLocations} from "../model/embedded/EmbeddedLocations";
import {Location} from "../model/Location";

export class LocationManager extends ItemManager<EmbeddedLocations, Location> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", name: "name", label: "Name"},
        ];
    }

    convert(resultPage: ResultPage<EmbeddedLocations>): ListPage<Location> {
        return {
            items: resultPage._embedded.locations,
            page: resultPage.page
        };
    }

    newItem(): Location {
        return {
            address1: "",
            address2: "",
            city: "",
            coordinates: "",
            country: "",
            zipCode: "",
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: undefined,
            id: undefined,
            name: "",
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined
        };
    }

    from(original: Location): Location {
        return _.cloneDeep(original);
    }

    getListColumn(item: Location): string {
        return item.name;
    }

    getHeading(item: Location): string {
        return item.name;
    }

    getRequiredProperties(): RequiredProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
            {type: "string", property: "address1", label: "Address Line 1"},
            {type: "string", property: "city", label: "City"},
            {type: "string", property: "country", label: "Country"},
        ];
    }

}
