import {Page} from "./Page";

export interface ResultPage<E> {
    _embedded: E
    // _links: PageLinks
    page: Page
}