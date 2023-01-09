import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getVehiclesState, isMobile} from "../../features/AdminSlice";
import VehiclesForm from "./VehiclesForm";
import {VehicleServices} from "../../services/VehicleServices";
import {VehicleManager} from "../../managers/VehicleManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";

const services: VehicleServices = new VehicleServices();
const manager: VehicleManager = new VehicleManager();
const vehicle: ItemType = "vehicle";
const label: string = "Vehicles";

const Vehicles = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getVehiclesState);

    const vehicleForm = () => {
        return (
            <VehiclesForm state={state} itemType={vehicle}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <LargePage form={vehicleForm()}
                                   services={services}
                                   manager={manager}
                                   itemType={vehicle}
                                   label={label}
                                   state={state}/>}
            {mobile && <SmallPage form={vehicleForm()}
                                  services={services}
                                  manager={manager}
                                  itemType={vehicle}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default Vehicles;
