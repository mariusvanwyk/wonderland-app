import {Page} from "./Page";

export interface ListPage<T> {
    items: T[]
    page: Page
}