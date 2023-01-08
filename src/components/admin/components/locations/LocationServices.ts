import HttpService from "../../../../services/HttpService";
import {AxiosResponse} from "axios";
import {ResultPage} from "../../model/ResultPage";
import {Services} from "../../Services";
import {EmbeddedLocations} from "../../model/embedded/EmbeddedLocations";
import {Location} from "../../model/Location";

export class LocationServices extends Services<EmbeddedLocations, Location> {
    getBaseUrl(): string {
        return "/api/v1/locations";
    }

    getItems(currentPage: number | undefined, pageSize: number | undefined, searchText: string | undefined, sortedBy: string | undefined, sortedAscending: boolean): Promise<AxiosResponse<ResultPage<EmbeddedLocations>>> {
        const pageArguments = this._getPageArguments(currentPage, pageSize, sortedBy, sortedAscending);
        console.log("Filtering Locations with name and page arguments", searchText, pageArguments)
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
