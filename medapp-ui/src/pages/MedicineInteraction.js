/*
This page is to display the medication interaction section of the application which holds the interaction
checker component.

Author: Robert Hatfield(C18475892)
Date: 16/04/22
Compiler: Visual Studio Code
*/


import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";
import MedicineInteractionCheck from "../mod_components/MedicineInteractionCheck.js";
import "../style/MedicineInteraction.css";

export default function MedicineInteractions() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();

        if (loggedInUser) {
            console.log("User already logged in!")
            nav("/medicineinteraction");
        }
        else if(!loggedInUser) {
            nav("/login");
        }
        else if(now.getTime() > item.expiry) {
            localStorage.removeItem("user");
        }

    }, []);

    return(
    <>
        <MedicineInteractionCheck />
    </>
    );
}