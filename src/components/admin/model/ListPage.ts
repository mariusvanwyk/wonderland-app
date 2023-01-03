import {Page} from "./Page";
import {BaseItem} from "./BaseItem";

export interface ListPage<T extends BaseItem> {
    items: T[]
    page: Page
}