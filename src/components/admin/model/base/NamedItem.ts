import {BaseItem} from "./BaseItem";

export interface NamedItem extends BaseItem{
    name: string;
    description?: string;
}