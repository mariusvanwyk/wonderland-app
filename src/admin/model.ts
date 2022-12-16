export class VehicleCategory {
    id: number;
    name: string;
    size: number;
    color: string;
    description: string;
    enabled: boolean;

    constructor(id: number, name: string, size: number, color: string, description: string, enabled: boolean) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.color = color;
        this.description = description;
        this.enabled = enabled;
    }

    validate() {
        let errors: any[] = [];
        if (this.name.trim() === "") {
            errors = [...errors, "Name is required"];
        }
        if (this.color.trim() === "") {
            errors = [...errors, "Color is required"];
        }
        if (this.size <= 0) {
            errors = [...errors, "Size must be greater than 0"];
        }
        return errors;
    }

}

export type EmbeddedVehicleCategories = {
    vehicleCategories: VehicleCategory[];
}

export type Link = {
    href: string
}

export interface VehicleCategoriesPage {
    _embedded: EmbeddedVehicleCategories
    _links?: PageLinks
    page?: Page
}

export type Page = {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number,
}

export type PageLinks = {
    first?: Link,
    self: Link,
    next?: Link,
    last?: Link,
    profile: Link
}

