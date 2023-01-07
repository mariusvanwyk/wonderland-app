import {BaseItem} from "./BaseItem";
import {Link} from "./Link";


export interface VehicleCategory extends BaseItem {
    name: string;
    size: number;
    color: string;
    description: string;
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


