import React, {Fragment, useEffect, useState} from "react";
import VehicleCategoryForm from "./VehicleCategoryForm";
import {ItemType} from "../../model/base/BaseItem";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesSelectionState, isMobile} from "../../../redux/SelectionSlice";
import VehicleCategoriesLarge from "./VehicleCategoriesLarge";
import VehicleCategoriesSmall from "./VehicleCategoriesSmall";

const converter: VehicleCategoryManager = new VehicleCategoryManager();
const category: ItemType = "category";

type Properties = {
    initialServices?: VehicleCategoriesServices
}

const VehicleCategories = ({initialServices}: Properties) => {
    const [services, setServices] = useState<VehicleCategoriesServices | undefined>();
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCategoriesSelectionState);

    useEffect(() => {
        if (initialServices) {
            setServices(initialServices);
        } else {
            setServices(VehicleCategoriesServices.getInstance());
        }
    },[initialServices])

    const categoryForm = () => {
        return (
            <VehicleCategoryForm state={state} itemType={category}/>
        )
    };

    return (
        <Fragment>
            {!mobile && services && <VehicleCategoriesLarge form={categoryForm()}
                                                            services={services}
                                                            converter={converter}
                                                            itemType={category}/>}
            {mobile && services && <VehicleCategoriesSmall form={categoryForm()}
                                                           services={services}
                                                           converter={converter}
                                                           itemType={category}/>}
        </Fragment>
    )
}

export default VehicleCategories;
