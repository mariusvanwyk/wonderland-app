import {BaseItem} from "./BaseItem";
import {Link} from "./Link";
import {NamedItem} from "./NamedItem";


export interface VehicleCategory extends NamedItem {
    size: number;
    color: string;
    enabled: boolean;
    roadTaxCost: number;
    insuranceCost: number;
    trackerCost: number;
    extraCost: number;
    tireRate: number;
    serviceRate: number;
    overtimeRate: number;
    fuelConsumption: number;
    _links: VehicleCategoryLinks | undefined;

}

export interface VehicleCategoryLinks {
    self: Link;
    vehicleCategory: Link;
    vehicles: Link;
}


