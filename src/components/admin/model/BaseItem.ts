export type ItemType = "CATEGORY" | "VEHICLE" | "CUSTOMER"

export interface BaseItem {
    id: number | undefined;
    currentVersion: number;
    createdBy: string;
    createdAt: string;
    updatedBy: Date | undefined;
    updatedAt: Date | undefined;

}
