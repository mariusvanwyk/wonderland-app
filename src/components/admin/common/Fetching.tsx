import React, {Fragment} from "react";
import {Spinner} from "react-bootstrap";

type Properties = {
    visible: boolean
}

const Fetching = ({visible}: Properties) => {
    return (
        <Fragment>
            {visible &&
                <div className={"d-flex justify-content-center mt-5"}>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Fetching...</span>
                    </Spinner>
                </div>
            }
        </Fragment>

    )
}

export default Fetching
