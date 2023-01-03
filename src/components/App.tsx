import React, {Fragment, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import "./style/style.css";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Welcome from "./Welcome";
import Home from "./Home";
import NavigationBar from "./common/NavigationBar";
import Error from "../Error";
import About from "../About";
import VehicleCategoriesLarge from "./admin/vehicleCategories/VehicleCategoriesLarge";
import Me from "./Me";
import UserService from "../services/UserService";
import _debounce from 'lodash.debounce'
import VehicleCategoriesSmall from "./admin/vehicleCategories/VehicleCategoriesSmall";
import {store} from './redux/store'
import {Provider} from 'react-redux'
import VehiclesSmall from "./admin/vehicles/VehiclesSmall";
import VehiclesLarge from "./admin/vehicles/VehiclesLarge";

const largeRouter = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error/>,},
    {path: "/me", element: <Me/>},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/vehicle-categories", element: <VehicleCategoriesLarge/>},
    {path: "/vehicles", element: <VehiclesLarge/>},
]);

const smallRouter = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error/>,},
    {path: "/me", element: <Me/>},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/vehicle-categories", element: <VehicleCategoriesSmall/>},
    {path: "/vehicles", element: <VehiclesSmall/>},
]);

const App = () => {

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const handleResize = _debounce(() => setWidth(window.innerWidth), 100)
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        }
    }, [])

    const isMobile = () => width <= 768;

    return (
        <Provider store={store}>
            <Fragment>
                <NavigationBar/>
                <div className={"mt-2 h-100 content"}>
                    {!UserService.isLoggedIn() && <Welcome/>}
                    {UserService.isLoggedIn() && !isMobile() && <RouterProvider router={largeRouter}/>}
                    {UserService.isLoggedIn() && isMobile() && <RouterProvider router={smallRouter}/>}
                </div>
            </Fragment>
        </Provider>)
};

export default App;
