export type ObjectType = "CATEGORY" | "VEHICLE"

export class BaseModelObject {
    id: number;
    currentVersion: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

    constructor() {
        this.id = -1;
        this.currentVersion = 0;
        this.createdBy = "";
        this.createdAt = "";
        this.updatedBy = "";
        this.updatedAt = "";
    }
}