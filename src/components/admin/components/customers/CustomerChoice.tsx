import {Form} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {Customer} from "../../model/Customer";
import {CustomerServices} from "../../services/CustomerServices";

type Properties = {
    customerId: number | undefined,
    onChange: (customer: Customer | undefined) => void;
}
const CustomerChoice = ({customerId, onChange}: Properties) => {
    const [customers, setCustomers] = useState<Customer[]>();
    const [fetching, setFetching] = useState<boolean>(true);

    useEffect(() => {
        CustomerServices.getInstance().getItems(0, Number.MAX_SAFE_INTEGER)
            .then((response) => {
                setCustomers(response.data._embedded.customers);
            })
            .catch((error) => {
                console.debug("Error", error);
            })
            .finally(() => {
                setFetching(false);
            });
    }, []);

    const customerChanged = (id: number) => {
        if (customers) {
            for (let i = 0; i < customers?.length; i++) {
                if (customers[i].id === id) {
                    onChange(customers[i]);
                    break;
                }
            }
        }
    }

    return (
        <Form.Group className="mb-3" controlId="customer-choice">
            <Form.Label>Customer</Form.Label>
            <Form.Select required={true} aria-label="Default select example" value={customerId ? customerId : ""}
                         disabled={fetching}
                         isInvalid={customerId === undefined || customerId <= 0}
                         onChange={(e) => {
                             customerChanged(Number(e.target.value));
                         }}>
                <option>{"Choose a Customer"}</option>
                {customers && customers.map((customer, index) => {
                    return (<option key={index} value={customer.id}>{customer.name}</option>)
                })}
            </Form.Select>
        </Form.Group>
    )
}

export default CustomerChoice
