import React from 'react';
import {Button} from "react-bootstrap";
import UserService from "./services/UserService";

function Home() {
    return (
        <div className={"mt-5"}>
            <div className={"d-flex justify-content-center"}>Peter Pan | Management &gt; Home</div>
            <div className={"d-flex justify-content-center mt-5"}>
                {/*<button className="btn btn-lg btn-warning" onClick={() => UserService.doLogin()}>Login</button>*/}
                {!UserService.isLoggedIn() && <Button onClick={() => UserService.doLogin()}>Login</Button>}
                {UserService.isLoggedIn() && <Button variant={"info"} onClick={() => UserService.doLogout()}>Logout </Button>}
            </div>
        </div>
    );
}

export default Home;
