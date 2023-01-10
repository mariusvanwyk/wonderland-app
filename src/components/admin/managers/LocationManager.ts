import {EditableProperty, ItemManager, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {EmbeddedLocations} from "../model/embedded/EmbeddedLocations";
import {Location} from "../model/Location";

export class LocationManager extends ItemManager<EmbeddedLocations, Location> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
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

    getEditableProperties(): EditableProperty[] {
        return [
            {type: "string", property: "name", label: "Name", required: true},
            {type: "text", property: "description", label: "Description", required: false},
            {type: "string", property: "address1", label: "Address 1", required: true},
            {type: "string", property: "address2", label: "Address 2", required: false},
            {type: "string", property: "city", label: "City", required: true},
            {type: "string", property: "zipCode", label: "Zip/Postal Code", required: false},
            {type: "string", property: "country", label: "Country Code", required: true},
            {type: "string", property: "coordinates", label: "Coordinates", required: false},
        ];
    }

}
