import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getDriversState, isMobile} from "../../features/AdminSlice";
import {DriverServices} from "../../services/DriverServices";
import {DriverManager} from "../../managers/DriverManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";

const services: DriverServices = new DriverServices();
const manager: DriverManager = new DriverManager();
const driver: ItemType = "driver";
const label: string = "Drivers";

const Drivers = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getDriversState);

    return (
        <Fragment>
            {!mobile && <LargePage services={services}
                                   manager={manager}
                                   itemType={driver}
                                   label={label}
                                   state={state}/>}
            {mobile && <SmallPage services={services}
                                  manager={manager}
                                  itemType={driver}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default Drivers;
