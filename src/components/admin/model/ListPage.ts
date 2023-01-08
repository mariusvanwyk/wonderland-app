import {Page} from "./Page";
import {BaseItem} from "./BaseItem";
import {NamedItem} from "./NamedItem";

export interface ListPage<T extends BaseItem | NamedItem> {
    items: T[]
    page: Page
}