import {EditableProperty, ItemManager, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {CustomerRoute} from "../model/CustomerRoute";
import {EmbeddedCustomerRoutes} from "../model/embedded/EmbeddedCustomerRoutes";

export class CustomerRouteManager extends ItemManager<EmbeddedCustomerRoutes, CustomerRoute> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", property: "customer.name", label: "Customer"},
            {type: "string", property: "disabled", label: "Disabled"},
        ];
    }

    validate(item: CustomerRoute): string[] {
        let errors: string[] = super.validate(item);
        if (item.startLocationId === item.endLocationId) {
            errors = [...errors, "Start and End location cannot be the same"];
        }
        return errors;
    }

    convert(resultPage: ResultPage<EmbeddedCustomerRoutes>): ListPage<CustomerRoute> {
        return {
            items: resultPage._embedded.customerRoutes,
            page: resultPage.page
        };
    }

    newItem(): CustomerRoute {
        return {
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: "",
            disabled: false,
            id: undefined,
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined,
        };
    }

    from(original: CustomerRoute): CustomerRoute {
        return _.cloneDeep(original);
    }

    getListColumn(item: CustomerRoute): string {
        return this.getDisplayName(item) + (item.disabled ? " (Disabled)" : "");
    }

    private getDisplayName(item: CustomerRoute): string {
        return (item.customerName ? item.customerName : "...") +
            ": " +
            (item.startLocationName ? item.startLocationName : "...") +
            " > " +
            (item.endLocationName ? item.endLocationName : "...")
    }

    getHeading(item: CustomerRoute): string {
        return this.getDisplayName(item);
    }

    getEditableProperties(): EditableProperty[] {
        return [
            {type: "text", property: "description", label: "Description", required: false},
            {type: "number", property: "distance", label: "Distance", required: true},
            {type: "boolean", property: "disabled", label: "Disabled", required: true},
            {type: "number", property: "customerId", label: "Customer", required: true, hidden: true},
            {type: "number", property: "startLocationId", label: "Start Location", required: true, hidden: true},
            {type: "number", property: "endLocationId", label: "End Location", required: true, hidden: true},
        ];
    }

}
