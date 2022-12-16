import React from "react";
import UserService from "../services/UserService";

type Properties = {
    children: React.ReactNode[]
}
const RenderOnAnonymous = ({children}: Properties) => (!UserService.isLoggedIn()) ? children : null;

export default RenderOnAnonymous
