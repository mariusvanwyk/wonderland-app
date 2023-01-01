import {size} from "lodash";

export class VehicleCategory {
    id: number;
    currentVersion: number;
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
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

    static from(original: VehicleCategory) {
        const copied: VehicleCategory = new VehicleCategory();
        copied.id = original.id;
        copied.currentVersion = original.currentVersion;
        copied.name = original.name;
        copied.size = original.size;
        copied.color = original.color;
        copied.description = original.description;
        copied.enabled = original.enabled;
        copied.roadTaxCost = original.roadTaxCost;
        copied.insuranceCost = original.insuranceCost;
        copied.trackerCost = original.trackerCost;
        copied.extraCost = original.extraCost;
        copied.tireRate = original.tireRate;
        copied.serviceRate = original.serviceRate;
        copied.overtimeRate = original.overtimeRate;
        copied.fuelConsumption = original.fuelConsumption;
        copied.createdBy = original.createdBy;
        copied.createdAt = original.createdAt;
        copied.updatedBy = original.updatedBy;
        copied.updatedAt = original.updatedAt;
        return copied;
    }

    constructor() {
        this.id = -1;
        this.currentVersion = 0;
        this.name = "";
        this.size = 0;
        this.color = "#ffffff";
        this.description = "";
        this.enabled = true;
        this.roadTaxCost = 0;
        this.insuranceCost = 0;
        this.trackerCost = 0;
        this.extraCost = 0;
        this.tireRate = 0;
        this.serviceRate = 0;
        this.overtimeRate = 0;
        this.fuelConsumption = 0;
        this.createdBy = "";
        this.createdAt = "";
        this.updatedBy = "";
        this.updatedAt = "";
    }

    validate() {
        let errors: any[] = [];
        if (this.name === undefined || this.name.trim() === "") {
            errors = [...errors, "Name is required"];
        }
        if (this.color === undefined || this.color.trim() === "") {
            errors = [...errors, "Color is required"];
        }
        if (this.size === undefined || this.size <= 0) {
            errors = [...errors, "Size must be greater than 0"];
        }
        return errors;
    }

    getBasicSummary() {
        return this.size + " ton";
    }

}