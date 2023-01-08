import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getCustomerSelectionState, isMobile} from "../../../redux/SelectionSlice";
import CustomersForm from "./CustomersForm";
import {CustomerServices} from "../../services/CustomerServices";
import {CustomerManager} from "../../managers/CustomerManager";
import CustomersLarge from "./CustomersLarge";
import CustomersSmall from "./CustomersSmall";

const services: CustomerServices = new CustomerServices();
const converter: CustomerManager = new CustomerManager();
const customer: ItemType = "customer";

const Customers = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCustomerSelectionState);

    const customerForm = () => {
        return (
            <CustomersForm state={state} itemType={customer}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <CustomersLarge form={customerForm()}
                                        services={services}
                                        converter={converter}
                                        itemType={customer}/>}
            {mobile && <CustomersSmall form={customerForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={customer}/>}
        </Fragment>
    )
}

export default Customers;
