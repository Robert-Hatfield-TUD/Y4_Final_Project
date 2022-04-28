/*
This page acts as routing for the project so that each page display its respective elements.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/

import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Navbar from "./Navbar.js";
import Errorp from "../pages/ErrorP.js";
import Home from "../pages/Home.js";
import Login from "../pages/Login.js";
import MedicineInteraction from "../pages/MedicineInteraction.js";
import MedicinePage from "../pages/MedicinePage.js";
import Register from "../pages/Register.js";
import Search from "../pages/Search.js";
import UserPage from "../pages/UserPage.js";
import Filter from "../pages/Filter.js";

export default function RoutesFor() {

    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/medicineinteraction" element={<MedicineInteraction />}/>
                <Route path="/medicinepage/:id" element={<MedicinePage />}/>
                <Route path="/register" element={<Register />}/>
                <Route path="/search" element={<Search />}/>
                <Route path="/userpage" element={<UserPage />}/>
                <Route path="/filter" element={<Filter />}/>
                <Route path="*" element={<Errorp />}/>
            </Routes>
        </Router>
    )
}