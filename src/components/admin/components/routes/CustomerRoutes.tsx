import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getRoutesState, isMobile} from "../../features/AdminSlice";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";
import {CustomerRoutesServices} from "../../services/CustomerRoutesServices";
import {CustomerRouteManager} from "../../managers/CustomerRouteManager";
import CustomerRoutesForm from "./CustomerRoutesForm";

const services: CustomerRoutesServices = new CustomerRoutesServices();
const manager: CustomerRouteManager = new CustomerRouteManager();
const route: ItemType = "route";
const label: string = "Routes";

const CustomerRoutes = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getRoutesState);

    const routesForm = () => {
        return (
            <CustomerRoutesForm state={state} itemType={route}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <LargePage itemForm={routesForm()}
                                   services={services}
                                   manager={manager}
                                   itemType={route}
                                   label={label}
                                   state={state}/>}
            {mobile && <SmallPage itemForm={routesForm()}
                                  services={services}
                                  manager={manager}
                                  itemType={route}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default CustomerRoutes;
