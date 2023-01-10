import React, {Fragment, useEffect, useState} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getCategoriesState, isMobile} from "../../features/AdminSlice";
import {VehicleCategoriesServices} from "../../services/VehicleCategoriesServices";
import {VehicleCategoryManager} from "../../managers/VehicleCategoryManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";
import {ItemTab} from "../common/ItemDetails";
import VehiclesListForCategory from "../vehicles/VehiclesListForCategory";

const manager: VehicleCategoryManager = new VehicleCategoryManager();
const category: ItemType = "category";
const label: string = "Categories";

type Properties = {
    initialServices?: VehicleCategoriesServices
}
const VehicleCategories = ({initialServices}: Properties) => {
    const [services, setServices] = useState<VehicleCategoriesServices | undefined>();
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getCategoriesState);
    const itemTabs: ItemTab[] = [
        {
            label:"Vehicles",
            component: <VehiclesListForCategory/>
        }
    ];

    useEffect(() => {
        if (initialServices) {
            setServices(initialServices);
        } else {
            setServices(VehicleCategoriesServices.getInstance());
        }
    }, [initialServices])

    return (
        <Fragment>
            {!mobile && services && <LargePage services={services}
                                               manager={manager}
                                               itemType={category}
                                               label={label}
                                               state={state} itemTabs={itemTabs}/>}
            {mobile && services && <SmallPage services={services}
                                              manager={manager}
                                              itemType={category}
                                              label={label}
                                              state={state}
                                              itemTabs={itemTabs}/>}
        </Fragment>
    )
}

export default VehicleCategories;
