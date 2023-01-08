import {BaseItem} from "./base/BaseItem";
import {Link} from "./base/Link";
import {NamedItem} from "./base/NamedItem";

export interface Customer extends NamedItem {

    disabled: boolean;
    _links: CustomerLinks | undefined;
}

export interface CustomerLinks {
    self: Link;
    customer: Link;
}
