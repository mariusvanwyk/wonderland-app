export type ItemType = "CATEGORY" | "VEHICLE"

export interface BaseItem {
    id: number | undefined;
    currentVersion: number;
    createdBy: string;
    createdAt: string;
    updatedBy: Date | undefined;
    updatedAt: Date | undefined;

}
