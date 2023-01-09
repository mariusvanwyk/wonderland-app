import React, {Fragment, useEffect, useState} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesState, isMobile} from "../../features/AdminSlice";
import VehicleCategoriesForm from "./VehicleCategoriesForm";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const manager: VehicleCategoryManager = new VehicleCategoryManager();
const category: ItemType = "category";
const label: string = "Vehicle Categories";

type Properties = {
    initialServices?: VehicleCategoriesServices
}
const VehicleCategories = ({initialServices}: Properties) => {
    const [services, setServices] = useState<VehicleCategoriesServices | undefined>();
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCategoriesState);

    useEffect(() => {
        if (initialServices) {
            setServices(initialServices);
        } else {
            setServices(VehicleCategoriesServices.getInstance());
        }
    }, [initialServices])

    const vehicleCategoryForm = () => {
        return (
            <VehicleCategoriesForm state={state} itemType={category}/>
        )
    };

    return (
        <Fragment>
            {!mobile && services && <LargePage form={vehicleCategoryForm()}
                                   services={services}
                                   manager={manager}
                                   itemType={category}
                                   label={label}
                                   state={state}/>}
            {mobile && services && <SmallPage form={vehicleCategoryForm()}
                                  services={services}
                                  manager={manager}
                                  itemType={category}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default VehicleCategories;
