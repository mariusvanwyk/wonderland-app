import {Link} from "./base/Link";
import {BaseItem} from "./base/BaseItem";

export interface CustomerRoute extends BaseItem {
    disabled: boolean;
    distance?: number | undefined;
    customerId?: number | undefined;
    endLocationId?: number | undefined;
    startLocationId?: number | undefined;
    customerName?: string | undefined;
    startLocationName?: string | undefined;
    endLocationName?: string | undefined;
    description?: string;
    _links: CustomerRouteLinks | undefined;
}

export interface CustomerRouteLinks {
    self: Link;
    customer: Link;
    startLocation: Link;
    endLocation: Link;
}
