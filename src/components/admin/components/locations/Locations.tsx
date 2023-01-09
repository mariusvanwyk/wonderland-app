import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getLocationsState, isMobile} from "../../features/AdminSlice";
import LocationsForm from "./LocationsForm";
import {LocationServices} from "../../services/LocationServices";
import {LocationManager} from "../../managers/LocationManager";
import LargePage from "../common/LargePage";
import SmallPage from "../common/SmallPage";

const services: LocationServices = new LocationServices();
const manager: LocationManager = new LocationManager();
const location: ItemType = "location";
const label: string = "Locations";

const Locations = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getLocationsState);

    const locationForm = () => {
        return (
            <LocationsForm state={state} itemType={location}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <LargePage form={locationForm()}
                                   services={services}
                                   manager={manager}
                                   itemType={location}
                                   label={label}
                                   state={state}/>}
            {mobile && <SmallPage form={locationForm()}
                                  services={services}
                                  manager={manager}
                                  itemType={location}
                                  label={label}
                                  state={state}/>}
        </Fragment>
    )
}

export default Locations;
