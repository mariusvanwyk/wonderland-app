import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";

import RenderOnAnonymous from "./RenderOnAnonymous";
import RenderOnAuthenticated from "./RenderOnAuthenticated";
import Welcome from "./Welcome";
import Home from "./Home";
import NavigationBar from "./NavigationBar";
import Error from "../Error";
import About from "../About";
import VehicleCategories from "./admin/vehicleCategories/VehicleCategories";
import Me from "./Me";

const router = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error/>,},
    {path: "/me", element: <Me/>},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/vehicle-categories", element: <VehicleCategories/>},
]);

const App = () => (
    <>
        <NavigationBar/>
        <div className={"mt-2"}>
            <RenderOnAnonymous>
                <Welcome/>
            </RenderOnAnonymous>
            <RenderOnAuthenticated>
                <RouterProvider router={router}/>
            </RenderOnAuthenticated>
        </div>
    </>
);

export default App;
