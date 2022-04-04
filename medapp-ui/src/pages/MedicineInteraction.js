// Page for compatibilty check
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function MedicineInteractions() {

    const nav = useNavigate();

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        const item = JSON.parse(loggedInUser);
        const now = new Date();


        //console.log(loggedInUser);
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

    return(<>
    <p>Hello this poage is medication interactions</p>
    </>);
}