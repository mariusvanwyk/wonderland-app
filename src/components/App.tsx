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
import VehicleCategories from "./admin/vehicleCategories/VehicleCategories";
import {useAppDispatch} from "./redux/hooks";
import {setIsMobile} from "./redux/SelectionSlice";
import Vehicles from "./admin/vehicles/Vehicles";

const router = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error/>,},
    {path: "/me", element: <Me/>},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/vehicle-categories", element: <VehicleCategories/>},
    {path: "/vehicles", element: <Vehicles/>},
]);

const App = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleResize = _debounce(() => dispatch(setIsMobile(window.innerWidth)), 100)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [dispatch])

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
