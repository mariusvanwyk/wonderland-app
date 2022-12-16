import React from "react";
import UserService from "../services/UserService";

type Properties = {
    children: React.ReactNode[]
}
const RenderOnAuthenticated = ({children}: Properties) => (UserService.isLoggedIn()) ? children : null;

export default RenderOnAuthenticated
