import {Page} from "./Page";

export interface ResultPage<T> {
    _embedded: T
    // _links: PageLinks
    page: Page
}