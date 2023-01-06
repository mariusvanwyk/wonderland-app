import React, {Fragment} from "react";
import VehicleCategoryForm from "./VehicleCategoryForm";
import {ItemType} from "../model/BaseItem";
import {VehicleCategoriesServices} from "./VehicleCategoriesServices";
import {VehicleCategoryManager} from "../managers/VehicleCategoryManager";
import {useAppSelector} from "../../redux/hooks";
import {getCategoriesSelectionState, isMobile} from "../../redux/SelectionSlice";
import VehicleCategoriesLarge from "./VehicleCategoriesLarge";
import VehicleCategoriesSmall from "./VehicleCategoriesSmall";

const services: VehicleCategoriesServices = new VehicleCategoriesServices();
const converter: VehicleCategoryManager = new VehicleCategoryManager();
const CATEGORY: ItemType = "CATEGORY";

const VehicleCategories = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCategoriesSelectionState);

    const categoryForm = () => {
        return (
            <VehicleCategoryForm state={state} itemType={CATEGORY}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <VehicleCategoriesLarge form={categoryForm()}
                                                services={services}
                                                converter={converter}
                                                itemType={CATEGORY}/>}
            {mobile && <VehicleCategoriesSmall form={categoryForm()}
                                               services={services}
                                               converter={converter}
                                               itemType={CATEGORY}/>}
        </Fragment>
    )
}

export default VehicleCategories;
