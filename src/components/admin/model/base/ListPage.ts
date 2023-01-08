import {BaseItem} from "./BaseItem";
import {NamedItem} from "./NamedItem";
import {Page} from "./Page";

export interface ListPage<T extends BaseItem | NamedItem> {
    items: T[]
    page: Page
}