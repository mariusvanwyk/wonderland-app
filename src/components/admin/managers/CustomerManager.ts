import {ItemManager, RequiredProperty, SortProperty} from "./ItemManager";
import {ResultPage} from "../model/base/ResultPage";
import {ListPage} from "../model/base/ListPage";
import _ from "lodash";
import {EmbeddedCustomers} from "../model/embedded/EmbeddedCustomers";
import {Customer} from "../model/Customer";

export class CustomerManager extends ItemManager<EmbeddedCustomers, Customer> {

    getSortProperties(): SortProperty[] {
        return [
            {type: "string", name: "name", label: "Name"},
            {type: "string", name: "disabled", label: "Disabled"},
        ];
    }

    convert(resultPage: ResultPage<EmbeddedCustomers>): ListPage<Customer> {
        return {
            items: resultPage._embedded.customers,
            page: resultPage.page
        };
    }

    newItem(): Customer {
        return {
            createdAt: "",
            createdBy: "",
            currentVersion: 0,
            description: "",
            id: undefined,
            name: "",
            disabled: false,
            updatedAt: undefined,
            updatedBy: undefined,
            _links: undefined,
        };
    }

    from(original: Customer): Customer {
        return _.cloneDeep(original);
    }

    getListColumn(item: Customer): string {
        return item.name + (item.disabled ? " (Disabled)" : "");
    }

    getHeading(item: Customer): string {
        return item.name;
    }

    getRequiredProperties(): RequiredProperty[] {
        return [
            {type: "string", property: "name", label: "Name"},
        ];
    }

}
