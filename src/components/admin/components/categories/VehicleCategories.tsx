import React, {Fragment, useEffect, useState} from "react";
import VehicleCategoryForm from "./VehicleCategoryForm";
import {ItemType} from "../../model/base/BaseItem";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesSelectionState, isMobile} from "../../../redux/SelectionSlice";
import VehicleCategoriesLarge from "./VehicleCategoriesLarge";
import VehicleCategoriesSmall from "./VehicleCategoriesSmall";

// const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const converter: VehicleCategoryManager = new VehicleCategoryManager();
const category: ItemType = "category";

type Properties = {
    services: VehicleCategoriesServices
}

const VehicleCategories = ({services}: Properties) => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCategoriesSelectionState);
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
