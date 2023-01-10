export type ItemType = "category" | "vehicle" | "customer" | "location" | "driver" | "route"

export interface BaseItem {
    id: number | undefined;
    currentVersion: number;
    createdBy: string;
    createdAt: string;
    updatedBy: Date | undefined;
    updatedAt: Date | undefined;
}
