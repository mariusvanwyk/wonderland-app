import React, {Fragment} from "react";
import {ItemType} from "../../model/base/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getLocationSelectionState, isMobile} from "../../../redux/SelectionSlice";
import LocationsForm from "./LocationsForm";
import {LocationServices} from "../../services/LocationServices";
import {LocationManager} from "../../managers/LocationManager";
import LocationsLarge from "./LocationsLarge";
import LocationsSmall from "./LocationsSmall";

const services: LocationServices = new LocationServices();
const converter: LocationManager = new LocationManager();
const location: ItemType = "location";

const Locations = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getLocationSelectionState);

    const locationForm = () => {
        return (
            <LocationsForm state={state} itemType={location}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <LocationsLarge form={locationForm()}
                                        services={services}
                                        converter={converter}
                                        itemType={location}/>}
            {mobile && <LocationsSmall form={locationForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={location}/>}
        </Fragment>
    )
}

export default Locations;
