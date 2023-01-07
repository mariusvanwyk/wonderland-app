import React, {Fragment} from "react";
import {ItemType} from "../model/BaseItem";
import {useAppSelector} from "../../redux/hooks";
import {getCustomerSelectionState, isMobile} from "../../redux/SelectionSlice";
import CustomersForm from "./CustomersForm";
import {CustomerServices} from "./CustomerServices";
import {CustomerManager} from "../managers/CustomerManager";
import CustomersLarge from "./CustomersLarge";
import CustomersSmall from "./CustomersSmall";

const services: CustomerServices = new CustomerServices();
const converter: CustomerManager = new CustomerManager();
const CUSTOMER: ItemType = "CUSTOMER";

const Customers = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCustomerSelectionState);

    const customerForm = () => {
        return (
            <CustomersForm state={state} itemType={CUSTOMER}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <CustomersLarge form={customerForm()}
                                        services={services}
                                        converter={converter}
                                        itemType={CUSTOMER}/>}
            {mobile && <CustomersSmall form={customerForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={CUSTOMER}/>}
        </Fragment>
    )
}

export default Customers;
