import {BaseItem} from "./BaseItem";

export class Vehicle extends BaseItem {

    instalment: number;
    registrationNumber: string;
    fuelConsumption: number;
    purchasedOn: Date | null;
    roadTaxDueDate: Date | null;
    motDate: Date | null;
    disabled: boolean;

    static from(original: Vehicle) {
        const copied: Vehicle = new Vehicle();
        copied.instalment = original.instalment;
        copied.registrationNumber = original.registrationNumber;
        copied.fuelConsumption = original.fuelConsumption;
        copied.purchasedOn = original.purchasedOn;
        copied.roadTaxDueDate = original.roadTaxDueDate;
        copied.motDate = original.motDate;
        copied.disabled = original.disabled;
        return copied;
    }

    constructor() {
        super();
        this.instalment = 0;
        this.registrationNumber = "";
        this.fuelConsumption = 0;
        this.purchasedOn = null;
        this.roadTaxDueDate = null;
        this.motDate = null;
        this.disabled = false;
    }
}