import {BaseItem} from "./BaseItem";

export interface Vehicle extends BaseItem {

    instalment: number;
    registrationNumber: string;
    fuelConsumption: number;
    purchasedOn: Date | null;
    roadTaxDueDate: Date | null;
    motDate: Date | null;
    disabled: boolean;
    description: string;

}