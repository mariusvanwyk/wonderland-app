import React, {Fragment} from "react";
import {ItemType} from "../../model/BaseItem";
import {useAppSelector} from "../../../redux/hooks";
import {getLocationSelectionState, isMobile} from "../../../redux/SelectionSlice";
import LocationsForm from "./LocationsForm";
import {LocationServices} from "./LocationServices";
import {LocationManager} from "../../managers/LocationManager";
import LocationsLarge from "./LocationsLarge";
import LocationsSmall from "./LocationsSmall";

const services: LocationServices = new LocationServices();
const converter: LocationManager = new LocationManager();
const LOCATION: ItemType = "LOCATION";

const Locations = () => {
    const mobile = useAppSelector(isMobile);
    const state = useAppSelector(getLocationSelectionState);

    const locationForm = () => {
        return (
            <LocationsForm state={state} itemType={LOCATION}/>
        )
    };

    return (
        <Fragment>
            {!mobile && <LocationsLarge form={locationForm()}
                                        services={services}
                                        converter={converter}
                                        itemType={LOCATION}/>}
            {mobile && <LocationsSmall form={locationForm()}
                                       services={services}
                                       converter={converter}
                                       itemType={LOCATION}/>}
        </Fragment>
    )
}

export default Locations;
