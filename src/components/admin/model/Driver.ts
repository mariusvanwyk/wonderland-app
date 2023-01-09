import {NamedItem} from "./base/NamedItem";
import {Link} from "./base/Link";

export interface Driver extends NamedItem {

    idNumber?: string,
    licenceNumber?: string,
    phoneNumber?: string,
    salary?: number,
    licenceExpiryDate?: Date,
    disabled: boolean;
    _links?: DriverLinks
}

export interface DriverLinks {
    self: Link;
    driver: Link;
}
