export type ItemType = "CATEGORY" | "VEHICLE"

export interface BaseItem {
    id: number;
    currentVersion: number;
    createdBy: string;
    createdAt: string;
    updatedBy: string;
    updatedAt: string;

}