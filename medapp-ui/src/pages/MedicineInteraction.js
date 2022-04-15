// Page for compatibilty check
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