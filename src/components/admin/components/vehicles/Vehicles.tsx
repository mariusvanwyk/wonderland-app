import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getVehicleSelectionState, isMobile} from "../../../redux/SelectionSlice";
import {VehicleServices} from "../../services/VehicleServices";
import {VehicleManager} from "../../managers/VehicleManager";
import VehicleForm from "./VehicleForm";
import VehiclesLarge from "./VehiclesLarge";
import VehiclesSmall from "./VehiclesSmall";

const services: VehicleServices = new VehicleServices();
const converter: VehicleManager = new VehicleManager();
const vehicle: ItemType = "vehicle";

const Vehicles = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getVehicleSelectionState);

    const vehicleForm = () => {
        return (
            <VehicleForm state={state} itemType={vehicle}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <VehiclesLarge form={vehicleForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={vehicle}/>}
            {mobile && <VehiclesSmall form={vehicleForm()}
                                      services={services}
                                      converter={converter}
                                      itemType={vehicle}/>}
        </Fragment>
    )
}

export default Vehicles;
