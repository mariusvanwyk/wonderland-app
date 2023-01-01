import {VehicleCategory} from "./VehicleCategory";
import {Page} from "./Page";

export type EmbeddedVehicleCategories = {
    vehicleCategories: VehicleCategory[];
}

export interface VehicleCategoriesPage {
    _embedded: EmbeddedVehicleCategories
    // _links: PageLinks
    page: Page
}