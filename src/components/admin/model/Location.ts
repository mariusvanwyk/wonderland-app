import {NamedItem} from "./NamedItem";
import {Link} from "./Link";

export interface Location extends NamedItem {
    address1: string,
    address2?: string,
    city: string,
    zipCode?: string,
    country: string,
    coordinates?: string,
    _links?: LocationLinks
}

export interface LocationLinks {
    self: Link;
    location: Link;
}