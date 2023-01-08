import {BaseItem} from "./BaseItem";
import {Link} from "./Link";
import {NamedItem} from "./NamedItem";

export interface Customer extends NamedItem {

    disabled: boolean;
    _links: CustomerLinks | undefined;
}

export interface CustomerLinks {
    self: Link;
    customer: Link;
}
