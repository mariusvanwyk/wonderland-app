export type ItemType = "CATEGORY" | "VEHICLE"

export class BaseItem {
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

    /**
     * Override this is you need to do validation
     */
    validate(): string[] {
        return [];
    }
}