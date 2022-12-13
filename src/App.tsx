import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-icons/font/bootstrap-icons.css";
import NavigationBar from "./NavigationBar";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Error from "./Error";
import VehicleCategories from "./admin/VehicleCategories";


const router = createBrowserRouter([
    {path: "/", element: <Home/>, errorElement: <Error />,},
    {path: "/home", element: <Home/>},
    {path: "/about", element: <About/>},
    {path: "/vehicle-categories", element: <VehicleCategories/>},
]);

function App() {
    return (
        <>
            <NavigationBar/>
            <div className={"mt-2"}>
                <RouterProvider router={router}/>
            </div>
        </>
    );
}

export default App;
