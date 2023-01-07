import {BaseItem} from "./BaseItem";
import {Link} from "./Link";

export interface Customer extends BaseItem {

    name: string;
    description?: string;
    disabled: boolean;
    _links: CustomerLinks | undefined;
}

export interface CustomerLinks {
    self: Link;
    customer: Link;
}
