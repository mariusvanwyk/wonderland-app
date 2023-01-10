import React, {Fragment} from 'react';
import {Col} from "react-bootstrap";
import {ItemType} from "../../model/base/BaseItem";
import {AdminState, setItem} from "../../features/AdminSlice";
import {useAppDispatch} from "../../../redux/hooks";
import _ from "lodash";
import CustomerChoice from "../customers/CustomerChoice";
import {Customer} from "../../model/Customer";
import {Location} from "../../model/Location";
import LocationChoice from "../locations/LocationChoice";

type Properties = {
    itemType: ItemType,
    state: AdminState<any>,
}

const CustomerRoutesForm = ({itemType, state}: Properties) => {
    const dispatch = useAppDispatch();

    const onCustomerChange = (customer: Customer | undefined) => {
        let customerRoute = _.cloneDeep(state.selectedItem);
        customerRoute.customerId = customer?.id;
        customerRoute.customerName = customer?.name;
        dispatch(setItem({itemType: itemType, item: customerRoute}));
    }

    const onStartLocationChange = (location: Location | undefined) => {
        let customerRoute = _.cloneDeep(state.selectedItem);
        customerRoute.startLocationId = location?.id;
        customerRoute.startLocationName = location?.name;
        dispatch(setItem({itemType: itemType, item: customerRoute}));
    }

    const onEndLocationChange = (location: Location | undefined) => {
        let customerRoute = _.cloneDeep(state.selectedItem);
        customerRoute.endLocationId = location?.id;
        customerRoute.endLocationName = location?.name;
        dispatch(setItem({itemType: itemType, item: customerRoute}));
    }

    return (
        <Fragment>
            <Col sm={12}>
                <CustomerChoice customerId={state.selectedItem.customerId} onChange={onCustomerChange}/>
            </Col>
            <Col sm={12} lg={6}>
                <LocationChoice locationId={state.selectedItem.startLocationId}
                                onChange={onStartLocationChange}
                                label={"Start Location"}/>
            </Col>
            <Col sm={12} lg={6}>
                <LocationChoice locationId={state.selectedItem.endLocationId}
                                onChange={onEndLocationChange}
                                label={"End Location"}/>
            </Col>
        </Fragment>

    )
}

export default CustomerRoutesForm
