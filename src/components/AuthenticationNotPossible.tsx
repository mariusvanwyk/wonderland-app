import React from "react";
import NavigationBar from "./common/NavigationBar";

const AuthenticationNotPossible = () => {
    return (<>
            <NavigationBar/>
            <div className={"mt-5 d-flex justify-content-center"}>
                Authentication System Error
            </div>
        </>
    )
}

export default AuthenticationNotPossible
