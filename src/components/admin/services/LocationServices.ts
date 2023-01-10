import HttpService from "../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../model/base/ResultPage";
import {EmbeddedLocations} from "../model/embedded/EmbeddedLocations";
import {Location} from "../model/Location";
import {AbstractServices} from "./AbstractServices";

export class LocationServices extends AbstractServices<EmbeddedLocations, Location> {

    private static instance: LocationServices;

    public static getInstance(): LocationServices {
        if (!LocationServices.instance) {
            LocationServices.instance = new LocationServices();
        }
        return LocationServices.instance;
    }

    getBaseUrl(): string {
        return "/api/v1/locations";
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText?: string | undefined, sortedBy?: string | undefined, sortedAscending?: boolean): Promise<AxiosResponse<ResultPage<EmbeddedLocations>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.debug("Filtering Locations with name and page arguments", searchText, pageArguments)
        if (!searchText || searchText.trim() === "") {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedLocations>>(
                `${this.getBaseUrl()}?${pageArguments}`
            );
        } else {
            return HttpService.getAxiosClient().get<ResultPage<EmbeddedLocations>>(
                `${this.getBaseUrl()}/search/findByNameContaining?name=${searchText}&${pageArguments}`
            );
        }
    }

    getItemName(): string {
        return "Location";
    }

}
