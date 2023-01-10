import React, {Fragment, useEffect} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/style.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import NavigationBar from "./common/NavigationBar";
import Error from "../Error";
import About from "../About";
import Me from "./Me";
import UserService from "../services/UserService";
import _debounce from 'lodash.debounce'
import VehicleCategories from "./admin/components/categories/VehicleCategories";
import {useAppDispatch} from "./redux/hooks";
import {setIsMobile} from "./admin/features/AdminSlice";
import Vehicles from "./admin/components/vehicles/Vehicles";
import Customers from "./admin/components/customers/Customers";
import Locations from "./admin/components/locations/Locations";
import Drivers from "./admin/components/drivers/Drivers";
import CustomerRoutes from "./admin/components/routes/CustomerRoutes";

const router = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error/>,},
    {path: "/me", element: <Me/>},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},

    {path: "/vehicle-categories", element: <VehicleCategories/>},
    {path: "/vehicles", element: <Vehicles/>},
    {path: "/customers", element: <Customers/>},
    {path: "/locations", element: <Locations/>},
    {path: "/drivers", element: <Drivers/>},
    {path: "/routes", element: <CustomerRoutes/>},
]);

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = _debounce(() => dispatch(setIsMobile(window.innerWidth)), 100)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    return (
        <Fragment>
            <NavigationBar/>
            <div className={"pt-2 h-100 content"}>
                {!UserService.isLoggedIn() && <Welcome/>}
                {UserService.isLoggedIn() && <RouterProvider router={router}/>}
            </div>
        </Fragment>
    )
};

export default App;
