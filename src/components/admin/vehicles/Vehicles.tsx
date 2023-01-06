import React, {Fragment} from "react";
import {ItemType} from "../model/BaseItem";
import {useAppSelector} from "../../redux/hooks";
import {getVehicleSelectionState, isMobile} from "../../redux/SelectionSlice";
import {VehicleServices} from "./VehicleServices";
import {VehicleManager} from "../managers/VehicleManager";
import VehicleForm from "./VehicleForm";
import VehiclesLarge from "./VehiclesLarge";
import VehiclesSmall from "./VehiclesSmall";

const services: VehicleServices = new VehicleServices();
const converter: VehicleManager = new VehicleManager();
const VEHICLE: ItemType = "VEHICLE";

const Vehicles = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getVehicleSelectionState);

    const vehicleForm = () => {
        return (
            <VehicleForm state={state} itemType={VEHICLE}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <VehiclesLarge form={vehicleForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={VEHICLE}/>}
            {mobile && <VehiclesSmall form={vehicleForm()}
                                      services={services}
                                      converter={converter}
                                      itemType={VEHICLE}/>}
        </Fragment>
    )
}

export default Vehicles;
