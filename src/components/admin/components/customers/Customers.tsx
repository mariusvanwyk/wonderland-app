import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getCustomersState, isMobile} from "../../features/AdminSlice";
import {CustomerServices} from "../../services/CustomerServices";
import {CustomerManager} from "../../managers/CustomerManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";

const services: CustomerServices = new CustomerServices();
const manager: CustomerManager = new CustomerManager();
const customer: ItemType = "customer";
const label: string = "Customers";

const Customers = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCustomersState);

    return (
        <Fragment>
            {!mobile && <LargePage services={services}
                                   manager={manager}
                                   itemType={customer}
                                   label={label}
                                   state={state}/>}
            {mobile && <SmallPage services={services}
                                  manager={manager}
                                  itemType={customer}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default Customers;
